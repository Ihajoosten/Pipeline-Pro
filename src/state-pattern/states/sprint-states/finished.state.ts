import { Sprint } from "../../../models/sprint.model";
import { ISprintState } from "../../interface/ISprintState";
import { SprintReleasedState } from "./released.state";
import { SprintReviewedState } from "./reviewed.state";

export class SprintFinishedState implements ISprintState {
  constructor(private sprint: Sprint) {}

  public create(): () => void {
    return this.throwError("Created");
  }
  public finish(): () => void {
    return this.throwError("Finished");
  }
  public start(): () => void {
    return this.throwError("Active");
  }
  public review(): void {
    console.log("Scrum master is reviewing the sprint!");
    this.sprint.setState(new SprintReviewedState(this.sprint));
  }
  public close(): () => void {
    return this.throwError("Closed");
  }

  release(): void {
    console.log("Scrum master is releasing the sprint!");
    this.sprint.setState(new SprintReleasedState(this.sprint));
  }

  private throwError(to: string): any {
    console.log("Sprint is already Finished");
    console.log(`Cannot change to ${to} State from Finished State`);
    throw new Error(`Cannot change to ${to} State from Finished State`);
  }
}
