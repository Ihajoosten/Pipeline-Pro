import { Sprint } from "../../../models/sprint.model";
import { ISprintState } from "../../interface/ISprintState";
import { SprintInProgressState } from "./inProgress.state";

export class SprintCreatedState implements ISprintState {
  constructor(private sprint: Sprint) {}

  public create(): void {
    console.log("Sprint is already created.");
  }

  public start(): void {
    console.log("Starting the sprint...");
    this.sprint.setState(new SprintInProgressState(this.sprint));
  }

  public complete(): void {
    console.log("Cannot complete a sprint that has not started yet.");
    throw new Error("Invalid state transition: Created");
  }

  public release(): void {
    console.log("Cannot release a sprint that has not started yet.");
    throw new Error("Invalid state transition: Created");
  }

  public fail(): void {
    console.log("Cannot fail a sprint that has not started yet.");
    throw new Error("Invalid state transition: Created");
  }
}
