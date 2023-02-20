import { Sprint } from "../../../observer-pattern/models/sprint.model";
import { ISprintState } from "../../interface/ISprintState";

export class SprintReleasedState implements ISprintState {
  constructor(private sprint: Sprint) {}

  public create(): void {
    console.log("Sprint is already released.");
    throw new Error("Cannot transition from Released to Created");
  }

  public start(): void {
    console.log("Cannot start a sprint that is already released.");
    throw new Error("Cannot transition from Released to InProgress");
  }

  public complete(): void {
    console.log("Cannot complete a sprint that is already released.");
    throw new Error("Cannot transition from Released to Completed");
  }

  public release(): void {
    console.log("Sprint is already released.");
    throw new Error("Cannot transition from Released to Released");
  }

  public fail(): void {
    console.log("Cannot fail a sprint that is already released.");
    throw new Error("Cannot transition from Released to Failed");
  }
}
