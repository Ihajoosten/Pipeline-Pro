import { Sprint } from "../../../models/sprint.model";
import { ISprintState } from "../../interface/ISprintState";
import { SprintReleasedState } from "./released.state";

export class SprintCompletedState implements ISprintState {
  constructor(private sprint: Sprint) {}

  public create(): void {
    console.log("Sprint is already created.");
  }

  public start(): void {
    console.log("Sprint is already completed.");
  }

  public complete(): void {
    console.log("Sprint is already completed.");
  }

  public release(): void {
    console.log("Releasing the sprint...");
    this.sprint.setState(new SprintReleasedState(this.sprint));
  }

  public fail(): void {
    console.log("Cannot fail a sprint that is already completed.");
  }
}
