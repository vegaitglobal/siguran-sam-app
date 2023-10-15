import { AppButton } from '@/shared/components';
import { AppScreen } from '@/shared/constants';
import {
	setPersistedMessage,
	useMessageStore,
} from '@/shared/store/use-message-store';
import { BottomTabsParamList } from '@/shared/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { styles } from './message-widget.style';

interface Props {
	disabled?: boolean;
}

export const MessageWidget = ({ disabled }: Props) => {
	const { message: persistedMessage } = useMessageStore();
	const [message, setMessage] = useState(persistedMessage);
	const { navigate } =
		useNavigation<NativeStackNavigationProp<BottomTabsParamList>>();

	const handleSave = () => {
		setPersistedMessage(message);
		alert('Promene sačuvane');
		navigate(AppScreen.ALERT);
	};

	return (
		<View>
			<MessageInput
				value={message}
				onChangeText={setMessage}
				disabled={disabled}
			/>
			{!disabled && (
				<>
					<EditableIndicator />
					<View style={styles.saveButtonWrapper}>
						<AppButton onPress={handleSave}>SAČUVAJ</AppButton>
					</View>
				</>
			)}
		</View>
	);
};

interface MessageInputProps extends TextInputProps {
	disabled?: boolean;
}

const MessageInput = ({ disabled, ...props }: MessageInputProps) => {
	return (
		<View style={styles.messageInputWrapper}>
			<TextInput
				multiline
				textAlignVertical='top'
				editable={!disabled}
				style={[styles.messageInput, disabled && styles.disabled]}
				{...props}
			/>
		</View>
	);
};

const EditableIndicator = () => {
	return (
		<View style={styles.editableIndicator}>
			<View style={styles.divider} />
			<Text style={styles.editableIndicatorText}>
				Kliknite kako biste izmenili poruku
			</Text>
			<View style={styles.divider} />
		</View>
	);
};
