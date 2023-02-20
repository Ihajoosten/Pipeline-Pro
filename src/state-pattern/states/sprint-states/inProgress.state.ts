import { Sprint } from "../../../models/sprint.model";
import { ISprintState } from "../../interface/ISprintState";
import { SprintCompletedState } from "./completed.state";
import { SprintFailedState } from "./failed.state";

export class SprintInProgressState implements ISprintState {
  constructor(private sprint: Sprint) {}

  public create(): void {
    console.log("Sprint is already created.");
  }

  public start(): void {
    console.log("Sprint is already in progress.");
    throw new Error("Invalid state transition: InProgress");
  }

  public complete(): void {
    console.log("Completing the sprint...");
    this.sprint.setState(new SprintCompletedState(this.sprint));
  }

  public release(): void {
    console.log("Cannot release a sprint that is not completed yet.");
    throw new Error("Invalid state transition: InProgress");
  }

  public fail(): void {
    console.log("Failing the sprint...");
    this.sprint.setState(new SprintFailedState(this.sprint));
  }
}
