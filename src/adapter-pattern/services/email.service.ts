import { IMessage } from "../interfaces/IMessage";
import { IMessagingService } from "../interfaces/IMessagingService";

export class EmailService implements IMessagingService {
  public sendMessage(message: IMessage): void {
    console.log(`Sending Email to ${message.address}: ${message.message}`);
  }
}
