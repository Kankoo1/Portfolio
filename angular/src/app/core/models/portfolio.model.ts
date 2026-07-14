export interface Education {
  id?: string;
  institution: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
  gpa?: number;
}

export interface Skill {
  id?: string;
  name: string;
  category: string;
  proficiency: number; // 0-100
  endorsements?: number;
}

export interface Experience {
  id?: string;
  title: string;
  company: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  description: string;
  responsibilities?: string[];
  skills?: string[];
  current?: boolean;
}

export interface Project {
  id?: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  url?: string;
  github?: string;
}

export interface Profile {
  id?: string;
  name: string;
  title: string;
  bio: string;
  email: string;
  phone?: string;
  location?: string;
  profileImage?: string;
  socialLinks?: SocialLink[];
  education?: Education[];
  experience?: Experience[];
  skills?: Skill[];
  projects?: Project[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: Date;
  status?: 'pending' | 'read' | 'replied';
}

export interface ChatRequest {
  message: string;
  visitorName?: string;
  visitorContact?: string;
}

export interface ChatReply {
  reply: string;
  notificationSent: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp?: Date;
}
