interface ISMSProvider<T> {
    sendSMS(to: string[], body: string): Promise<T>;
}
  