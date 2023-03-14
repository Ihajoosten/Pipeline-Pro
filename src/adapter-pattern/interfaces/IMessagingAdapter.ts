import { IMessage } from "./IMessage";

// Interface for the adapter that will be used to send messages through different mediums
export interface IMessagingAdapter {
  sendMessage(message: IMessage | null | {}): void;
}
