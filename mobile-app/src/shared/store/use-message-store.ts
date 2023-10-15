import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const INITIAL_TEMPLATE =
	'Ja sam <fullName>. Siguran sam. Moja lokacija: <location>';
const INITIAL_FULLNAME = 'Pera Perić';
const INITIAL_LOCATION = 'Novi Sad, Serbia - 45.2396° N, 19.8227° E';

const generateInitialMessage = (fullName: string, location?: string) =>
	INITIAL_TEMPLATE.replace('<fullName>', fullName).replace(
		'<location>',
		location || INITIAL_LOCATION
	);

interface MessageStoreState {
	message: string;
}

export const useMessageStore = create<MessageStoreState>()(
	persist(
		(_set) => ({
			message: generateInitialMessage(INITIAL_FULLNAME, INITIAL_LOCATION),
		}),
		{
			name: 'message-storage',
			storage: createJSONStorage(() => AsyncStorage),
		}
	)
);

export const setPersistedMessage = (message: string) =>
	useMessageStore.setState({ message });

export const setPersistedMessageByTemplate = (
	fullName: string,
	location?: string
) =>
	useMessageStore.setState({
		message: generateInitialMessage(fullName, location),
	});
