import { BacklogItem } from "../../../models/backlogItem.model";
import { IBacklogItemState } from "../../interface/IBacklogItemState";
import { BacklogTestedState } from "./tested.state";

export class BacklogTestingState implements IBacklogItemState {
  constructor(private backlogItem: BacklogItem) { }

  toDo(): () => void { return this.throwError('ToDo'); }

  doing(): () => void { return this.throwError('Doing'); }

  readyForTesting(): () => void { return this.throwError('ReadyForTesting'); }

  testing(): () => void { return this.throwError('Testing'); }

  tested(): void {
    this.backlogItem.setState(new BacklogTestedState(this.backlogItem));
  }

  done(): () => void { return this.throwError('Done'); }

  private throwError(to: string): any {
    console.log(`Cannot move backlog item to the ${to} from Testing state`);
    throw new Error(`Cannot move backlog item to the ${to} from Testing state`);
  }
}
