import axios from 'axios';
import * as SMS from 'expo-sms';

class MessageService implements IMessageService {
	private serverlessFunctionUrl: string;

	constructor(serverlessFunctionUrl: string) {
		this.serverlessFunctionUrl = serverlessFunctionUrl;
	}

	async sendNativeSMS(
		recipients: string | string[],
		body: string
	): Promise<void> {
		try {
			const isAvailable = await SMS.isAvailableAsync();
			if (isAvailable) {
				const { result } = await SMS.sendSMSAsync(recipients, body);

				switch (result) {
					case 'cancelled':
						console.log('SMS not sent');
					case 'sent':
						console.log('SMS sent');
					case 'unknown':
						console.log("I'm an Android device and I don't send any feedback.");
				}
			} else {
				console.log("There's no SMS available on this device.");
			}
		} catch (e) {
			console.log(e);
		}
	}

	async sendOnlineSMS(to: string[], body: string): Promise<void> {
		try {
			await axios.post(this.serverlessFunctionUrl, {
				to: to,
				body: body,
			});
		} catch (error) {
			console.error('Error sending messages via Twilio: ', error);
			throw error;
		}
	}
}

// const serverlessFunctionUrl =
// 	process.env.REACT_APP_TWILIO_SERVERLESS_FUNCTION_URL;
// if (!serverlessFunctionUrl) throw Error('Twilio Auth Token is not configured');

export default new MessageService('serverlessFunctionUrl');
