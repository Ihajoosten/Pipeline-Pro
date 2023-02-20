import { IMessage } from "../interface/IMessage";
import { IMessagingService } from "../interface/IMessagingService";

// Implementation of the MessagingService for email
export class EmailService implements IMessagingService {
  public sendMessage(message: IMessage): void {
    console.log(`Sending Email to ${message.recipient}: ${message.content}`);
  }
}
