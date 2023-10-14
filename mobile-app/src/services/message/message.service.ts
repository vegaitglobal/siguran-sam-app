import { Twilio } from 'twilio';

class TwilioMessageService implements MessageService {
	private client: Twilio;
	constructor(accountSid: string, authToken: string) {
		this.client = new Twilio(accountSid, authToken);
	}

	async sendSMS(recipients: string[], body: string): Promise<void> {
		await Promise.all(
			recipients.map(async (to) => {
				this.client.messages.create({
					to,
					body,
				});
			})
		);
	}
}

const accountSid = process.env.EXPO_PUBLIC_TWILIO_ACCOUNT_SID;
if (!accountSid) throw Error('Twilio Account SID is not configured');

const authToken = process.env.EXPO_PUBLIC_TWILIO_AUTH_TOKEN;
if (!authToken) throw Error('Twilio Auth Token is not configured');

export default new TwilioMessageService(accountSid, authToken);
