class NativeSMSProvider implements ISMSProvider<void>{
  private twilioFunctionUrl: string;
  private recipientLimit: number;

  constructor() { 
    this.recipientLimit = parseInt(process.env.REACT_APP_RECIPIENT_LIMIT ?? '10', 10);
    this.twilioFunctionUrl = process.env.REACT_APP_TWILIO_SERVERLESS_FUNCTION_URL ?? '';
  }

  sendSMS(to: string[], body: string): Promise<void> {
    if(!to || to.length === 0) {
      throw new Error('Recipient list is empty');
    }

    if(!body || body.trim().length === 0) {
      console.log('Body is empty, using default body');
      body = "Placeholder default body";
    }

    if (to.length > this.recipientLimit) {
      console.log(`Recipient limit of ${this.recipientLimit} exceeded, taking first ${this.recipientLimit} numbers.`);
      to = to.splice(0, this.recipientLimit);
    }
    
    //Implement NativeSMS functionality here
    return Promise.resolve();
  }
}

export default NativeSMSProvider;