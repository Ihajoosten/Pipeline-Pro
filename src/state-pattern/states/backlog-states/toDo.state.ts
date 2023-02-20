import { BacklogItem } from "../../../composite-pattern/models/backlogItem.composite.model";
import { IBacklogItemState } from "../../interface/IBacklogItemState";
import { BacklogDoingState } from "./doing.state";

export class BacklogToDoState implements IBacklogItemState {
  private backlogItem: BacklogItem;

  constructor(backlogItem: BacklogItem) {
    this.backlogItem = backlogItem;
  }

  toDo(): void {
    console.log("Cannot move backlog item to the ToDo from ToDo state");
    throw new Error("Cannot move backlog item to the ToDo from ToDo state");
  }

  doing(): void {
    console.log('Moving backlog item to the "Doing" state.');
    this.backlogItem.setState(new BacklogDoingState(this.backlogItem));
  }

  readyForTesting(): void {
    console.log(
      "Cannot move backlog item to the ReadyForTesting from ToDo state"
    );
    throw new Error(
      "Cannot move backlog item to the ReadyForTesting from ToDo state"
    );
  }

  testing(): void {
    console.log("Cannot move backlog item to the Testing from ToDo state");
    throw new Error("Cannot move backlog item to the Testing from ToDo state");
  }

  tested(): void {
    console.log("Cannot move backlog item to the Tested from ToDo state");
    throw new Error("Cannot move backlog item to the Tested from ToDo state");
  }

  done(): void {
    console.log("Cannot move backlog item to the Done from ToDo state");
    throw new Error("Cannot move backlog item to the Done from ToDo state");
  }
}
