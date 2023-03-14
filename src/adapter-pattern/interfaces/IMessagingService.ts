import { IMessage } from "./IMessage";

export interface IMessagingService {
  sendMessage(message: IMessage): void;
}
