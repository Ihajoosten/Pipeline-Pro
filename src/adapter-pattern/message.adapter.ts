import { IMessage } from "./interfaces/IMessage";
import { IMessagingAdapter } from "./interfaces/IMessagingAdapter";
import { IMessagingService } from "./interfaces/IMessagingService";

export class MessagingServiceAdapter implements IMessagingAdapter {
  private _messagingService: IMessagingService;

  constructor(messagingService: IMessagingService) {
    this._messagingService = messagingService;
  }

  public sendMessage(message: IMessage): void {
    this._messagingService.sendMessage(message);
  }
}
