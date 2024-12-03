import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogoVariants } from 'src/services/content/content.interfaces';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type ContentStoreState = Partial<Omit<LogoVariants, 'id'>>;

export const useContentStore = create<ContentStoreState>()(
  persist(() => ({}), {
    name: 'content-storage',
    storage: createJSONStorage(() => AsyncStorage),
  })
);

export const setContentStore = (data: ContentStoreState) => useContentStore.setState(data);
