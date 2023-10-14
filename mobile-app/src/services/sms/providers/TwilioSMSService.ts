import axios from 'axios';

class TwilioSMSService implements ISMSProvider<string[]> {
  private twilioFunctionUrl: string;
  private recipientLimit: number;

  constructor() { 
    this.recipientLimit = parseInt(process.env.REACT_APP_RECIPIENT_LIMIT ?? '10', 10);
    this.twilioFunctionUrl = process.env.REACT_APP_TWILIO_SERVERLESS_FUNCTION_URL ?? '';
  }

  async sendSMS(to: string[], body: string): Promise<string[]> {
    if(!to || to.length === 0) {
      throw new Error('Recipient list is empty');
    }

    if(!body || body.trim().length === 0) {
      console.log('Body is empty, using default body');
      body = "Placeholder default body";
    }

    if (to.length > this.recipientLimit) {
      console.log(`Recipient limit of ${this.recipientLimit} exceeded, taking first ${this.recipientLimit} numbers.`);
      to = to.splice(this.recipientLimit);
    }

    try {
      const response = await axios.post(this.twilioFunctionUrl, {
        to: to,
        body: body,
      });
      return response.data;
    } catch (error) {
      console.error('Error sending messages via Twilio: ', error);
      throw error;
    }
  }
}

export default TwilioSMSService;