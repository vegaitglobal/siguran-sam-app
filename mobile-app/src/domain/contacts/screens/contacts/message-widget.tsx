import { AppButton } from '@/shared/components';
import React, { useState } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { styles } from './message-widget.style';

interface Props {
	disabled?: boolean;
}

export const MessageWidget = ({ disabled }: Props) => {
	const [message, setMessage] = useState<string>('Hey there!');

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
						<AppButton>SAČUVAJ</AppButton>
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
				selectTextOnFocus={!disabled}
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
