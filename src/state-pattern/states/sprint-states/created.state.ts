import { Sprint } from "../../../models/sprint.model";
import { ISprintState } from "../../interface/ISprintState";
import { SprintActiveState } from "./active.state";

export class SprintCreatedState implements ISprintState {
  constructor(private sprint: Sprint) { }

  public create(): () => void {
    return this.throwError("Created");
  }
  public finish(): () => void {
    return this.throwError("Finished");
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
  public cancel(): () => void {
    return this.throwError("CancelRelease");
  }

  start(): void {
    console.log("Scrum Master is starting the sprint!");
    this.sprint.setState(new SprintActiveState(this.sprint));
  }

  private throwError(to: string): any {
    console.log("Sprint is already Created");
    console.log(`Cannot change to ${to} State from Created State`);
    throw new Error(`Cannot change to ${to} State from Created State`);
  }
}
