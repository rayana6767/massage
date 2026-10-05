import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Helper to escape HTML characters for Telegram HTML parse_mode
  const escapeHtml = (text: string) => {
    if (!text) return '';
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  };

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      hasTelegramConfig: Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID),
    });
  });

  // Booking endpoint sending notification to master via Telegram Bot
  app.post('/api/booking', async (req, res) => {
    try {
      const {
        name,
        phone,
        serviceTitle,
        price,
        duration,
        date,
        timeSlot,
        messengerPreference,
        comment,
      } = req.body;

      if (!name || !phone) {
        return res.status(400).json({
          success: false,
          error: 'Пожалуйста, укажите имя и номер телефона.',
        });
      }

      const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
      const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

      const messengerLabels: Record<string, string> = {
        whatsapp: 'WhatsApp',
        telegram: 'Telegram',
        call: 'Телефонный звонок',
      };
      const messengerLabel = messengerLabels[messengerPreference] || messengerPreference || 'Не указан';

      const now = new Date().toLocaleString('ru-RU', {
        timeZone: 'Europe/Moscow',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      const telegramMessage = [
        '🌿 <b>Новая заявка на прием в студию!</b>',
        '',
        `👤 <b>Имя клиента:</b> ${escapeHtml(name)}`,
        `📞 <b>Телефон:</b> <code>${escapeHtml(phone)}</code>`,
        `💆‍♀️ <b>Услуга:</b> ${escapeHtml(serviceTitle || 'Массаж / Уход')}`,
        price ? `💰 <b>Стоимость:</b> ${escapeHtml(String(price))} ₽ (${escapeHtml(duration || '')})` : '',
        `📅 <b>Дата:</b> ${escapeHtml(date || 'Ближайшая свободная')}`,
        `⏰ <b>Время:</b> ${escapeHtml(timeSlot || 'По согласованию')}`,
        `💬 <b>Удобный способ связи:</b> ${escapeHtml(messengerLabel)}`,
        comment ? `📝 <b>Комментарий:</b> ${escapeHtml(comment)}` : '',
        '',
        '📍 <b>Локация:</b> СПб, ул. Пейзажная, 24',
        `⏱ <i>Отправлено: ${now} (МСК)</i>`,
      ]
        .filter(Boolean)
        .join('\n');

      let deliveredToTelegram = false;
      let telegramErrorDetail: string | null = null;

      if (botToken && chatId) {
        try {
          const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              chat_id: chatId,
              text: telegramMessage,
              parse_mode: 'HTML',
              disable_web_page_preview: true,
            }),
          });

          const telegramData = await telegramResponse.json() as any;

          if (telegramResponse.ok && telegramData.ok) {
            deliveredToTelegram = true;
            console.log(`[Telegram Bot] Notification successfully delivered to chat ${chatId}`);
          } else {
            console.error('[Telegram Bot Error]', telegramData);
            telegramErrorDetail = telegramData.description || 'Ошибка Telegram API';
          }
        } catch (fetchErr: any) {
          console.error('[Telegram Network Error]', fetchErr);
          telegramErrorDetail = fetchErr.message || 'Ошибка сети при отправке в Telegram';
        }
      } else {
        console.warn('[Telegram Config] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not configured in environment variables.');
      }

      return res.json({
        success: true,
        deliveredToTelegram,
        telegramConfigured: Boolean(botToken && chatId),
        message: deliveredToTelegram
          ? 'Заявка успешно отправлена мастеру в Telegram!'
          : 'Заявка принята в системе.',
        errorDetail: telegramErrorDetail,
      });
    } catch (err: any) {
      console.error('[Booking Server Error]', err);
      return res.status(500).json({
        success: false,
        error: 'Произошла ошибка при обработке заявки. Попробуйте еще раз или напишите мастеру напрямую.',
      });
    }
  });

  // Photo upload and storage endpoint for certificates and master portrait
  app.post('/api/upload-photo', async (req, res) => {
    try {
      const { filename, base64Data, certId, target } = req.body;

      if (!filename || !base64Data) {
        return res.status(400).json({ success: false, error: 'Имя файла и данные изображения обязательны' });
      }

      // Strip potential Data URI header (e.g., "data:image/jpeg;base64,")
      const base64Clean = base64Data.replace(/^data:image\/[a-zA-Z+]+;base64,/, '');
      const buffer = Buffer.from(base64Clean, 'base64');

      const publicDir = path.join(process.cwd(), 'public');
      const certsDir = path.join(publicDir, 'certificates');
      if (!fs.existsSync(certsDir)) {
        fs.mkdirSync(certsDir, { recursive: true });
      }

      let relativeUrl = '';
      let targetFilePath = '';

      if (target === 'master') {
        const ext = path.extname(filename) || '.jpg';
        const safeName = `master_photo${ext}`;
        targetFilePath = path.join(publicDir, safeName);
        fs.writeFileSync(targetFilePath, buffer);
        
        // Also save as master_zhyidegul.jpg so existing references point to real photo
        const mainPortraitPath = path.join(publicDir, 'master_zhyidegul.jpg');
        fs.writeFileSync(mainPortraitPath, buffer);

        // Copy to dist if dist exists
        const distPublic = path.join(process.cwd(), 'dist');
        if (fs.existsSync(distPublic)) {
          fs.writeFileSync(path.join(distPublic, safeName), buffer);
          fs.writeFileSync(path.join(distPublic, 'master_zhyidegul.jpg'), buffer);
        }

        relativeUrl = `/${safeName}?v=${Date.now()}`;
      } else {
        // Certificate upload
        const safeFilename = path.basename(filename);
        targetFilePath = path.join(certsDir, safeFilename);
        fs.writeFileSync(targetFilePath, buffer);

        // Copy to dist if dist exists
        const distCerts = path.join(process.cwd(), 'dist', 'certificates');
        if (fs.existsSync(distCerts)) {
          fs.writeFileSync(path.join(distCerts, safeFilename), buffer);
        }

        relativeUrl = `/certificates/${encodeURIComponent(safeFilename)}?v=${Date.now()}`;
      }

      // Update manifest.json
      const manifestPath = path.join(certsDir, 'manifest.json');
      let manifest: Record<string, any> = {};
      if (fs.existsSync(manifestPath)) {
        try {
          manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
        } catch {
          manifest = {};
        }
      }

      if (target === 'master') {
        manifest['masterPhoto'] = relativeUrl;
      } else if (certId) {
        manifest[certId] = relativeUrl;
      }

      fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');

      // Also copy manifest to dist if exists
      const distManifest = path.join(process.cwd(), 'dist', 'certificates', 'manifest.json');
      if (fs.existsSync(path.dirname(distManifest))) {
        fs.writeFileSync(distManifest, JSON.stringify(manifest, null, 2), 'utf-8');
      }

      return res.json({
        success: true,
        url: relativeUrl,
        filename,
        certId: certId || null,
        target: target || 'certificate',
      });
    } catch (uploadErr: any) {
      console.error('[Upload Photo Error]', uploadErr);
      return res.status(500).json({ success: false, error: uploadErr.message });
    }
  });

  // Query which real photos are stored in manifest or on disk
  app.get('/api/photos-map', (req, res) => {
    try {
      const publicDir = path.join(process.cwd(), 'public');
      const certsDir = path.join(publicDir, 'certificates');
      const manifestPath = path.join(certsDir, 'manifest.json');

      let manifest: Record<string, any> = {};
      if (fs.existsSync(manifestPath)) {
        try {
          manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
        } catch {
          manifest = {};
        }
      }

      let filesInCertsDir: string[] = [];
      if (fs.existsSync(certsDir)) {
        filesInCertsDir = fs.readdirSync(certsDir);
      }

      res.json({
        success: true,
        manifest,
        filesInCertsDir,
        masterPhotoExists: fs.existsSync(path.join(publicDir, 'master_photo.jpg')),
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
