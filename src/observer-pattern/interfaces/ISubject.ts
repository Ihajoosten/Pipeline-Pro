// import { Observer } from "./IObserver";

export interface ISubject {
  // subscribe(observer: Observer): void;
  // unsubscribe(observer: Observer): void;
  notify(): void;
}
