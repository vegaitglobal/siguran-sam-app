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

export interface ContentService {
  getCategories: () => Promise<Category[]>;
  getBlogPosts: (categoryID: string) => Promise<BlogPost[]>;
}
