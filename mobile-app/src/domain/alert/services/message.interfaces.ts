interface IMessageService {
	sendNativeSMS(recipients: string[] | string, body: string): Promise<void>;
	sendOnlineSMS(recipients: string[] | string, body: string): Promise<void>;
}
