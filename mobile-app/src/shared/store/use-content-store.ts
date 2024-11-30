import { Logo } from 'src/services/content/content.interfaces';
import { create } from 'zustand';

type ContentStoreState = Partial<{
  logoWithText: Logo;
  logoWithoutText: Logo;
  logoOnlyText: Logo;
}>;

export const useContentStore = create<ContentStoreState>()((set) => ({
  setLogos: (state: ContentStoreState) => set(state),
}));

export const setContentStore = (data: ContentStoreState) => useContentStore.setState(data);
