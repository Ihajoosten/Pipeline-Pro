import { BacklogItem } from "../../../observer-pattern/models/backlogItem.model";
import { IBacklogItemState } from "../../interface/IBacklogItemState";

export class BacklogDoneState implements IBacklogItemState {
  private backlogItem: BacklogItem;

  constructor(backlogItem: BacklogItem) {
    this.backlogItem = backlogItem;
  }

  toDo(): void {
    console.log("Cannot move backlog item to the ToDo state from Done state");
    throw new Error("Cannot move backlog item to the ToDo from Done state");
  }

  doing(): void {
    console.log("Cannot move backlog item to the Doing state from Done state");
    throw new Error("Cannot move backlog item to the Doing from Done state");
  }

  readyForTesting(): void {
    console.log(
      "Cannot move backlog item to the ReadyForTesting state from Done state"
    );
    throw new Error(
      "Cannot move backlog item to the ReadyForTesting from Done state"
    );
  }

  testing(): void {
    console.log(
      "Cannot move backlog item to the Testing state from Done state"
    );
    throw new Error("Cannot move backlog item to the Testing from Done state");
  }

  tested(): void {
    console.log("Cannot move backlog item to the Tested state from Done state");
    throw new Error("Cannot move backlog item to the Tested from Done state");
  }

  done(): void {
    console.log("Cannot move backlog item to the Done state from Done state");
    throw new Error(
      "Cannot move backlog item to the Done state from Done state"
    );
  }
}
