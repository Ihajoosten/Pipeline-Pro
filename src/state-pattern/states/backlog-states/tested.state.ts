import { BacklogItem } from "../../../models/backlogItem.model";
import { IBacklogItemState } from "../../interface/IBacklogItemState";
import { BacklogDoneState } from "./done.state";
import { BacklogReadyForTestingState } from "./readyForTesting.state";
import { BacklogToDoState } from "./toDo.state";

export class BacklogTestedState implements IBacklogItemState {
  constructor(private backlogItem: BacklogItem) {}

  toDo(): void {
    this.backlogItem.setState(new BacklogToDoState(this.backlogItem));
  }

  doing(): () => void {
    return this.throwError("Doing");
  }

  readyForTesting(): void {
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

  done(): void {
    this.backlogItem.setState(new BacklogDoneState(this.backlogItem));
  }

  private throwError(to: string): any {
    console.log(`Cannot move backlog item to the ${to} from Tested state`);
    throw new Error(`Cannot move backlog item to the ${to} from Tested state`);
  }
}
