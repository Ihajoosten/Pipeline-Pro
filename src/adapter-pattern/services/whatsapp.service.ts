import { IMessage } from "../interfaces/IMessage";
import { IMessagingService } from "../interfaces/IMessagingService";

// Implementation of the MessagingService for whatsapp
export class WhatsappService implements IMessagingService {
  public sendMessage(message: IMessage): void {
    console.log(
      `Sending whatsapp message to ${message.recipient}: ${message.content}`
    );
  }
}
