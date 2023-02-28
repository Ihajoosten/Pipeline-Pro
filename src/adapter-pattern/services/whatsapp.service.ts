import { IMessage } from "../interfaces/IMessage";
import { IMessagingService } from "../interfaces/IMessagingService";

export class WhatsappService implements IMessagingService {
  public constructor(public name: string) {}

  public sendMessage(message: IMessage): void {
    if (message == null) throw new Error("Invalid message.");
    console.log(
      `Sending whatsapp message to ${message.recipient}: ${message.content}`
    );
  }
}
