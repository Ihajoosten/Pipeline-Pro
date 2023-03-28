import { IMessage } from "../interfaces/IMessage";
import { IMessagingService } from "../interfaces/IMessagingService";

export class WhatsappService implements IMessagingService {
  public sendMessage(message: IMessage): void {
    console.log(
      `Sending Whatsapp message to ${message.address}: ${message.message}`
    );
  }
}
