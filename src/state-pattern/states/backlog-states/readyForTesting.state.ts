import { BacklogItem } from "../../../models/backlogItem.model";
import { IObserver } from "../../../observer-pattern/interfaces/IObserver";
import { ISubject } from "../../../observer-pattern/interfaces/ISubject";
import { IBacklogItemState } from "../../interface/IBacklogItemState";
import { BacklogDoingState } from "./doing.state";
import { BacklogTestingState } from "./testing.state";
import { BacklogToDoState } from "./toDo.state";

export class BacklogReadyForTestingState
  implements IBacklogItemState, ISubject
{
  private backlogItem: BacklogItem;
  private observers: Array<IObserver> = [];

  constructor(backlogItem: BacklogItem) {
    this.backlogItem = backlogItem;
  }

  toDo(): void {
    console.log('Moving backlog item to the "ToDo" state.');
    this.backlogItem.setState(new BacklogToDoState(this.backlogItem));
  }

  doing(): void {
    console.log('Moving backlog item to the "Doing" state.');
    this.backlogItem.setState(new BacklogDoingState(this.backlogItem));
  }

  readyForTesting(): void {
    console.log(
      "Cannot move backlog item to the ReadyForTesting from ReadyForTesting state"
    );
    throw new Error(
      "Cannot move backlog item to the ReadyForTesting from ReadyForTesting state"
    );
  }

  testing(): void {
    console.log('Moving backlog item to the "Testing" state.');
    this.backlogItem.setState(new BacklogTestingState(this.backlogItem));
  }

  tested(): void {
    console.log(
      "Cannot move backlog item to the Tested from ReadyForTesting state"
    );
    throw new Error(
      "Cannot move backlog Tested to the Doing from ReadyForTesting state"
    );
  }

  done(): void {
    console.log(
      "Cannot move backlog item to the Done from ReadyForTesting state"
    );
    throw new Error(
      "Cannot move backlog Done to the Doing from ReadyForTesting state"
    );
  }

  public subscribe(observer: IObserver) {
    this.observers.push(observer);
  }

  public unsubscribe(observer: IObserver) {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  public notify(state: IBacklogItemState) {
    for (const observer of this.observers) {
      observer.update(state);
    }
  }
}
