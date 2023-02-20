import { BacklogItem } from "../../../models/backlogItem.model";
import { IBacklogItemState } from "../../interface/IBacklogItemState";
import { BacklogReadyForTestingState } from "./readyForTesting.state";
import { BacklogToDoState } from "./toDo.state";

export class BacklogDoingState implements IBacklogItemState {
  private backlogItem: BacklogItem;

  constructor(backlogItem: BacklogItem) {
    this.backlogItem = backlogItem;
  }

  toDo(): void {
    console.log('Moving backlog item to the "ToDo" state.');
    this.backlogItem.setState(new BacklogToDoState(this.backlogItem));
  }

  doing(): void {
    console.log("Cannot move backlog item to the Doing from Doing state");
    throw new Error("Cannot move backlog item to the Doing from Doing state");
  }

  readyForTesting(): void {
    console.log('Moving backlog item to the "ReadyForTesting" state.');
    this.backlogItem.setState(
      new BacklogReadyForTestingState(this.backlogItem)
    );
  }

  testing(): void {
    console.log("Cannot move backlog item to the Testing from Doing state");
    throw new Error("Cannot move backlog item to the Testing from Doing state");
  }

  tested(): void {
    console.log("Cannot move backlog item to the Tested from Doing state");
    throw new Error("Cannot move backlog item to the Tested from Doing state");
  }

  done(): void {
    console.log("Cannot move backlog item to the Done from Doing state");
    throw new Error("Cannot move backlog item to the Done from Doing state");
  }
}
