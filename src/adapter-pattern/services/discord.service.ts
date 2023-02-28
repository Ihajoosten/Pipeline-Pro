import { IMessage } from "../interfaces/IMessage";
import { IMessagingService } from "../interfaces/IMessagingService";

export class DiscordService implements IMessagingService {
  public sendMessage(message: IMessage): void {
      console.log(
        `Sending Discord message to ${message.address}: ${message.message}`
      );
  }
}
