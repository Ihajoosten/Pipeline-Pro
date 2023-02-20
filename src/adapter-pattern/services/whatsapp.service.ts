import { IMessage } from "../interface/IMessage";
import { IMessagingService } from "../interface/IMessagingService";

// Implementation of the MessagingService for whatsapp
export class WhatsappService implements IMessagingService {
  public sendMessage(message: IMessage): void {
    console.log(
      `Sending whatsapp message to ${message.recipient}: ${message.content}`
    );
  }
}
