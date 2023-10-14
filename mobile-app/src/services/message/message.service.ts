import axios from 'axios';

class TwilioMessageService implements MessageService {
	private serverlessFunctionUrl: string;

	constructor(serverlessFunctionUrl: string) {
		this.serverlessFunctionUrl = serverlessFunctionUrl;
	}

	async sendSMS(to: string[], body: string): Promise<void> {
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

const serverlessFunctionUrl = process.env.REACT_APP_TWILIO_SERVERLESS_FUNCTION_URL;
if (!serverlessFunctionUrl) throw Error('Twilio Auth Token is not configured');

export default new TwilioMessageService(serverlessFunctionUrl);
