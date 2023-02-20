import { IMessage } from "../interfaces/IMessage";
import { IMessagingService } from "../interfaces/IMessagingService";

// Implementation of the MessagingService for email
export class EmailService implements IMessagingService {
  public constructor(public name: string) { }

  public sendMessage(message: IMessage): void {
    if (message == null) throw new Error('Invalid message.');
    if (message.recipient === message.sender) throw new Error('Invalid recipient.');
    console.log(`Sending Email to ${message.recipient}: ${message.content}`);
  }
}
