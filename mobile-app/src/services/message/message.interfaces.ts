interface MessageService {
	sendSMS(recipients: string[], body: string): Promise<void>;
}
