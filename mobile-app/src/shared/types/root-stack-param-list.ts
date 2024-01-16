import { BlogPost } from 'src/services/content/content.interfaces';
import { AppScreen } from '../constants';

export type RootStackParamList = {
  [AppScreen.BOTTOM_TABS]: undefined;
  [AppScreen.SPLASH]: undefined;
  [AppScreen.ONBOARDING]: undefined;
  [AppScreen.TERMS]: undefined;
  [AppScreen.WELCOME]: undefined;
  [AppScreen.BLOGPOSTLIST]: { categoryId: string };
  [AppScreen.BLOGPOST]: { blogPost: BlogPost };
  [AppScreen.MORE_OPTIONS]: undefined;
};
