import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'react-native';
import { Logo, StaticContent, WelcomeAnimation } from 'src/services/content/content.interfaces';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type ContentStoreState = Partial<StaticContent>;

export const useContentStore = create<ContentStoreState>()(
  persist(() => ({}), {
    name: 'content-storage',
    storage: createJSONStorage(() => AsyncStorage),
  })
);

export const setContentStore = (data: ContentStoreState) => useContentStore.setState(data);

export const setLogo = (logo: Logo) => useContentStore.setState(data => ({ ...data, logo }));

export const setWelcomeAnimation = (welcomeAnimation: WelcomeAnimation) => {
  Image.prefetch(welcomeAnimation.url).then((loaded) => {
    loaded && useContentStore.setState(data => ({ ...data, welcomeAnimation }));
  });
};
