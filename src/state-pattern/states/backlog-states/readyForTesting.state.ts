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

  readyForTesting(): () => void {
    return this.throwError("ReadyForTested");
  }

  testing(): void {
    console.log('Moving backlog item to the "Testing" state.');
    this.backlogItem.setState(new BacklogTestingState(this.backlogItem));
  }

  tested(): () => void {
    return this.throwError("Tested");
  }

  done(): () => void {
    return this.throwError("Done");
  }

  private throwError(to: string): any {
    console.log(
      `Cannot move backlog item to the ${to} from ReadyForTested state`
    );
    throw new Error(
      `Cannot move backlog item to the ${to} from ReadyForTested state`
    );
  }
}
