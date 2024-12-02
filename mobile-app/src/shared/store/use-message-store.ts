import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const NAME_PLACEHOLDER = '<name>';
const LOCATION_PLACEHOLDER = '<location>';

// Default template that will be used before first population from Contentful
const defaultMessage = `${NAME_PLACEHOLDER}: "Siguran sam"
Lokacija: ${LOCATION_PLACEHOLDER}
Pozovite O.T.I.S: +3816102306685`;

interface MessageStoreState {
  message: string;
}

export const useMessageStore = create<MessageStoreState>()(
  persist(
    (_set) => ({
      message: defaultMessage,
    }),
    {
      name: 'message-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export const setPersistedMessage = (message: string) => useMessageStore.setState({ message });

export const getPersonalizedMessage = (message: string, fullName: string, location: string) =>
  message.replaceAll(NAME_PLACEHOLDER, fullName).replaceAll(LOCATION_PLACEHOLDER, location);
