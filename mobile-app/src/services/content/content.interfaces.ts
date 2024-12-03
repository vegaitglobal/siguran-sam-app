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
  id: string;
  title: string;
  content: string;
}

export interface ContactDetails {
  id: string;
  title: string;
  phoneNumber: string;
  website: string;
  email: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
}

export interface EmergencyMessage {
  id: string;
  title: string;
  content: string;
}

export interface Logo {
  url: string;
  isSVG: boolean;
}

export interface LogoVariants {
  id: string;
  logoWithText: Logo;
  logoWithoutText: Logo;
  logoTextOnly: Logo;
}

export interface ContentService {
  getCategories: () => Promise<Category[]>;
  getTermsAndConditions: () => Promise<TermsAndConditions>;
  getBlogPosts: (categoryID: string) => Promise<BlogPost[]>;
  getLogos: () => Promise<LogoVariants>;
  getContactDetails: () => Promise<ContactDetails>;
  getEmergencyMessage: () => Promise<EmergencyMessage>;
}
