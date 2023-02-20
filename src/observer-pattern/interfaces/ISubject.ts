import { IObserver } from "./IObserver";

// Define an interface for the subjects
export interface ISubject {
  subscribe(observer: IObserver): void;
  unsubscribe(observer: IObserver): void;
  notify(data: any): void;
}