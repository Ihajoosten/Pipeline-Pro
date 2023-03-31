import { Sprint } from "../../../models/sprint.model";
import { ISprintState } from "../../interface/ISprintState";
import { SprintActiveState } from "./active.state";
import { SprintCancelReleaseState } from "./canceled.state";
import { SprintReviewedState } from "./reviewed.state";

export class SprintReleasedState implements ISprintState {
  constructor(private sprint: Sprint) { }

  public create(): () => void {
    return this.throwError("Created");
  }

  public release(): () => void {
    return this.throwError("Released");
  }
  public finish(): () => void {
    return this.throwError("Finished");
  }
  public close(): () => void {
    return this.throwError("Closed");
  }

  public start(): () => void {
    console.log(
      "Scrum Master canceled Release! You can now iterate through backlog items again"
    );
    this.sprint.setState(new SprintActiveState(this.sprint));
    return this.throwError("Active");
  }

  public cancel(): void {
    console.log("Scrum Master is reviewing the sprint!");
    this.sprint.setState(new SprintCancelReleaseState(this.sprint));
  }

  review(): void {
    console.log("Scrum Master is reviewing the sprint!");
    this.sprint.setState(new SprintReviewedState(this.sprint));
  }

  private throwError(to: string): any {
    console.log("Sprint is already Released");
    console.log(`Cannot change to ${to} State from Released State`);
    throw new Error(`Cannot change to ${to} State from Released State`);
  }
}
