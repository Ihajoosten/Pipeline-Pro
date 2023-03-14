import { Notification } from "../../models/notification.model";
import { IObserver } from "./IObserver";

export interface ISubject {
  subscribe(observer: IObserver): void;
  unsubscribe(observer: IObserver): void;
  notify(notification: Notification): void;
  // De gevraagde parameter kan natuurlijk aangepast/uitgebreid worden wanneer er meerdere observers zijn
}
