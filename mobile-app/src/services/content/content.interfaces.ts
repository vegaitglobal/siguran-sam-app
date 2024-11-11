import { ReactNode } from 'react';

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

export interface ContentService {
  getCategories: () => Promise<Category[]>;
  getTermsAndConditions: () => Promise<TermsAndConditions>;
  getBlogPosts: (categoryID: string) => Promise<BlogPost[]>;
}
