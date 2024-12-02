import { AppButton } from '@/shared/components';
import { AppScreen } from '@/shared/constants';
import {
  getPersonalizedMessage,
  setPersistedMessage,
  useMessageStore,
} from '@/shared/store/use-message-store';
import { BottomTabsParamList } from '@/shared/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { styles } from './message-widget.style';
import { useUserInfoStore } from '@/shared/store';

interface Props {
  readOnly?: boolean;
}

const LOCATION_PLACEHOLDER = 'https://maps.google.com/?q=...';

export const MessageWidget = ({ readOnly }: Props) => {
  const { message: persistedMessage } = useMessageStore();
  const { fullName } = useUserInfoStore();

  const [message, setMessage] = useState(
    getPersonalizedMessage(persistedMessage, fullName, LOCATION_PLACEHOLDER)
  );
  const { navigate } = useNavigation<NativeStackNavigationProp<BottomTabsParamList>>();

  const handleSave = () => {
    setPersistedMessage(message);
    alert('Promene sačuvane');
    navigate(AppScreen.ALERT);
  };

  return (
    <View>
      <MessageInput value={message} onChangeText={setMessage} disabled={readOnly} />
      {!readOnly && (
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
      <Text style={styles.editableIndicatorText}>Kliknite kako biste izmenili poruku</Text>
      <View style={styles.divider} />
    </View>
  );
};
