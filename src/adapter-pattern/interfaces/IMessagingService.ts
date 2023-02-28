import { IMessage } from "./IMessage";

export interface IMessagingService {
  name: string;
  sendMessage(message: IMessage): void;
}
