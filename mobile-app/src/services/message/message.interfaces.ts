type MessageResult = "unknown" | "sent" | "cancelled";

interface IMessageService {
	sendNativeSMS(recipients: string[] | string, body: string): Promise<MessageResult>;
	sendOnlineSMS(recipients: string[] | string, body: string): Promise<void>;
}
