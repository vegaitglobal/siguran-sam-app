import axios from 'axios';
import * as SMS from 'expo-sms';
import { Platform } from 'react-native';

class MessageService implements IMessageService {
  private serverlessFunctionUrl: string;

  constructor(serverlessFunctionUrl: string) {
    this.serverlessFunctionUrl = serverlessFunctionUrl;
  }

  async sendNativeSMS(recipients: string[], body: string): Promise<MessageResult> {
    const { result } = await SMS.sendSMSAsync(
      Platform.OS === 'ios' ? recipients : recipients.join(', '),
      body
    );

    return result;
  }

  async sendOnlineSMS(to: string[], body: string): Promise<void> {
    await axios.post(this.serverlessFunctionUrl, {
      to: to,
      body: body,
    });
  }
}

export default MessageService;
