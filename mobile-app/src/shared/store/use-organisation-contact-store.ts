import AsyncStorage from '@react-native-async-storage/async-storage';
import { ContactDetails } from 'src/services/content/content.interfaces';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type ContactDetailsStoreState = ContactDetails;

export const useContactDetailsStore = create<ContactDetailsStoreState>()(
  persist(
    (_set) => ({
      website: 'https://otis.org.rs',
      phoneNumber: '+38166335355',
      email: 'info@otis.org.rs',
      facebook:
        'https://www.facebook.com/people/Organizacija-za-traganje-i-spasavanje-Srbije/100090680449465/',
      instagram: 'https://www.instagram.com/otis_serbia/',
      twitter: 'https://x.com/OTIS_ORG',
      linkedin: 'https://www.linkedin.com/company/otissrbija/',
    }),
    {
      name: 'message-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export const setPersistedContactDetails = (data: ContactDetailsStoreState) =>
  useContactDetailsStore.setState(data);
