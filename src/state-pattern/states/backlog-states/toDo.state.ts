import { BacklogItem } from "../../../models/backlogItem.model";
import { IBacklogItemState } from "../../interface/IBacklogItemState";
import { BacklogDoingState } from "./doing.state";

export class BacklogToDoState implements IBacklogItemState {
  constructor(private backlogItem: BacklogItem) {}

  toDo(): () => void {
    return this.throwError("ToDo");
  }

  doing(): void {
    console.log('Moving backlog item to the "Doing" state.');
    this.backlogItem.setState(new BacklogDoingState(this.backlogItem));
  }

  readyForTesting(): () => void {
    return this.throwError("ReadyForTesting");
  }

  testing(): () => void {
    return this.throwError("Testing");
  }

  tested(): void {
    return this.throwError("Tested");
  }

  done(): () => void {
    return this.throwError("Done");
  }

  private throwError(to: string): any {
    console.log(`Cannot move backlog item to the ${to} from ToDo state`);
    throw new Error(`Cannot move backlog item to the ${to} from ToDo state`);
  }
}
