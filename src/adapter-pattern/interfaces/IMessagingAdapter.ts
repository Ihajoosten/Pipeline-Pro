import { IMessage } from "./IMessage";

export interface IMessagingAdapter {
  sendMessage(message: IMessage | null | {}): void;
}
