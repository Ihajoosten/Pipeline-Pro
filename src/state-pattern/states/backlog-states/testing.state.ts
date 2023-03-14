import { BacklogItem } from "../../../models/backlogItem.model";
import { IBacklogItemState } from "../../interface/IBacklogItemState";
import { BacklogTestedState } from "./tested.state";

export class BacklogTestingState implements IBacklogItemState {
  constructor(private backlogItem: BacklogItem) {}

  toDo(): void {
    console.log(
      "Cannot move backlog item to the ToDo state from Testing state"
    );
    throw new Error("Cannot move backlog item to the ToDo from Testing state");
  }

  doing(): void {
    console.log(
      "Cannot move backlog item to the Doing state from Testing state"
    );
    throw new Error("Cannot move backlog item to the Doing from Testing state");
  }

  readyForTesting(): void {
    console.log(
      "Cannot move backlog item to the ReadyForTesting state from Testing state"
    );
    throw new Error(
      "Cannot move backlog item to the ReadyForTesting from Testing state"
    );
  }

  testing(): void {
    console.log(
      "Cannot move backlog item to the Testing state from Testing state"
    );
    throw new Error(
      "Cannot move backlog item to the Testing from Testing state"
    );
  }

  tested(): void {
    this.backlogItem.setState(new BacklogTestedState(this.backlogItem));
  }

  done(): void {
    console.log(
      "Cannot move backlog item to the Done state from Testing state"
    );
    throw new Error("Cannot move backlog item to the Done from Testing state");
  }
}
