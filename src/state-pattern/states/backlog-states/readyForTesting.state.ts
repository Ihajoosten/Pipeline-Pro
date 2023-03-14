import { BacklogItem } from "../../../models/backlogItem.model";
import { IBacklogItemState } from "../../interface/IBacklogItemState";
import { BacklogDoingState } from "./doing.state";
import { BacklogTestingState } from "./testing.state";
import { BacklogToDoState } from "./toDo.state";

export class BacklogReadyForTestingState implements IBacklogItemState {
  constructor(private backlogItem: BacklogItem) {}

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
}
