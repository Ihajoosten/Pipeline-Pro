import { IMessage } from "../interfaces/IMessage";
import { IMessagingService } from "../interfaces/IMessagingService";


// Implementation of the MessagingService for discord
export class DiscordService implements IMessagingService {
  public sendMessage(message: IMessage): void {
    console.log(
      `Sending Discord message to ${message.recipient}: ${message.content}`
    );
  }
}
