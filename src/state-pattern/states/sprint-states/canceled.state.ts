import { Sprint } from "../../../models/sprint.model";
import { ISprintState } from "../../interface/ISprintState";
import { SprintActiveState } from "./active.state";

export class SprintCancelReleaseState implements ISprintState {
  constructor(private sprint: Sprint) { }

  public create(): () => void {
    return this.throwError("CancelRelease");
  }

  public start(): void {
    console.log("Scrum Master is reactivating the sprint");
    this.sprint.setState(new SprintActiveState(this.sprint));
  }
  public release(): () => void {
    return this.throwError("Released");
  }
  public review(): () => void {
    return this.throwError("Reviewed");
  }
  public close(): () => void {
    return this.throwError("Closed");
  }
  public finish(): void {
    return this.throwError("Finished");
  }

  public cancel(): () => void {
    return this.throwError("CancelRelease");
  }
  private throwError(to: string): any {
    console.log("Sprint release is already canceled");
    console.log(`Cannot change to ${to} State from CancelRelease State`);
    throw new Error(`Cannot change to ${to} State from CancelRelease State`);
  }
}
