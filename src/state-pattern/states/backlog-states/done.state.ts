import { BacklogItem } from "../../../models/backlogItem.model";
import { IBacklogItemState } from "../../interface/IBacklogItemState";

export class BacklogDoneState implements IBacklogItemState {
  constructor(private backlogItem: BacklogItem) { }

  toDo(): () => void { return this.throwError('Done'); }

  doing(): () => void { return this.throwError('Done'); }

  readyForTesting(): () => void { return this.throwError('Done'); }

  testing(): () => void { return this.throwError('Done'); }

  tested(): () => void { return this.throwError('Done'); }

  done(): () => void { return this.throwError('Done'); }

  private throwError(to: string): any {
    console.log(`Cannot move backlog item to the ${to} from Doing state`);
    throw new Error(`Cannot move backlog item to the ${to} from Doing state`);
  }
}
