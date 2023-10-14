class NativeSMSProvider {
  sendSMS(to: string[], body: string): void {
    if (to.length === 0) {
      throw new Error('No recipients specified');
    }
    
    //Implement NativeSMS functionality here
  }
}

export default NativeSMSProvider;