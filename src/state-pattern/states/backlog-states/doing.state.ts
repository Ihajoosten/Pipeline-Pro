import { BacklogItem } from "../../../models/backlogItem.model";
import { IBacklogItemState } from "../../interface/IBacklogItemState";
import { BacklogReadyForTestingState } from "./readyForTesting.state";
import { BacklogToDoState } from "./toDo.state";

export class BacklogDoingState implements IBacklogItemState {
  constructor(private backlogItem: BacklogItem) {}

  toDo(): void {
    console.log('Moving backlog item to the "ToDo" state.');
    this.backlogItem.setState(new BacklogToDoState(this.backlogItem));
  }

  doing(): () => void {
    return this.throwError("Doing");
  }

  readyForTesting(): void {
    console.log('Moving backlog item to the "ReadyForTesting" state.');
    this.backlogItem.setState(
      new BacklogReadyForTestingState(this.backlogItem)
    );
  }

  testing(): () => void {
    return this.throwError("Testing");
  }

  tested(): () => void {
    return this.throwError("Tested");
  }

  done(): () => void {
    return this.throwError("Done");
  }

  private throwError(to: string): any {
    console.log(`Cannot move backlog item to the ${to} from Doing state`);
    throw new Error(`Cannot move backlog item to the ${to} from Doing state`);
  }
}
