import { IMessage } from "../interfaces/IMessage";
import { IMessagingService } from "../interfaces/IMessagingService";

export class DiscordService implements IMessagingService {
  public constructor(public name: string) {}

  public sendMessage(message: IMessage): void {
    if (message == null) throw new Error("Invalid message.");
    else
      console.log(
        `Sending Discord message to ${message.recipient}: ${message.content}`
      );
  }
}
