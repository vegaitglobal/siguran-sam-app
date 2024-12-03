export interface Category {
  id: string;
  title: string;
  description: string;
  iconURL: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  heroImageURL: string;
  thumbnailURL: string;
  content: string;
}

export interface TermsAndConditions {
  content: string;
}

export interface ContactDetails {
  phoneNumber: string;
  website: string;
  email: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
}

export interface EmergencyMessage {
  content: string;
}

export interface Logo {
  url: string;
  isSVG: boolean;
}

export interface StaticContent {
  logoWithText: Logo;
  logoWithoutText: Logo;
  logoTextOnly: Logo;
}

export interface ContentService {
  getCategories: () => Promise<Category[]>;
  getTermsAndConditions: () => Promise<TermsAndConditions | undefined>;
  getBlogPosts: (categoryID: string) => Promise<BlogPost[]>;
  getLogos: () => Promise<StaticContent | undefined>;
  getContactDetails: () => Promise<ContactDetails | undefined>;
  getEmergencyMessage: () => Promise<EmergencyMessage | undefined>;
}
