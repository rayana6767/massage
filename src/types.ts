export type ServiceCategory = 'all' | 'body' | 'face';

export interface ServicePhoto {
  id: string;
  url: string;
  caption: string;
  type?: 'process' | 'result';
}

export interface ServiceItem {
  id: string;
  category: 'body' | 'face';
  categoryLabel: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  duration: string;
  price: number;
  benefits: string[];
  protocolSteps: string[];
  photos: ServicePhoto[];
  recommendedCourse?: string;
  badge?: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  institution: string;
  year: string;
  category: string;
  imageUrl: string;
  originalFilenames?: string[];
  realPhotoUrl?: string;
  description: string;
  massageName: string;
  massageSubtitle: string;
  summary: string;
  benefits: string[];
  indications: string[];
  results: string;
  courseRecommendation?: string;
  relatedServiceId?: string;
}

export interface MasterProfile {
  name: string;
  title: string;
  experienceYears: number;
  bio: string;
  principles: {
    title: string;
    description: string;
    icon: string;
  }[];
  hygieneStandards: string[];
}

export interface BookingFormData {
  name: string;
  phone: string;
  serviceId: string;
  date: string;
  timeSlot: string;
  messengerPreference: 'whatsapp' | 'telegram' | 'call';
  comment: string;
}
