import { Sprint } from "../../../models/sprint.model";
import { ISprintState } from "../../interface/ISprintState";

export class SprintClosedState implements ISprintState {
  constructor(private sprint: Sprint) {}
  onCreate(): void {
    console.log("Sprint is already closed");
    throw new Error("Cannot change state from Closed to Created");
  }
  onStart(): void {
    console.log("Sprint is already closed");
    throw new Error("Cannot change state from Closed to Active");
  }
  onFinish(): void {
    console.log("Sprint is already closed");
    throw new Error("Cannot change state from Closed to Finished");
  }
  onReview(): void {
    console.log("Sprint is already closed");
    throw new Error("Cannot change state from Closed to Reviewed");
  }
  onComplete(): void {
    console.log("Sprint is already closed");
    throw new Error("Cannot change state from Closed to Completed");
  }
  onClose(): void {
    console.log("Sprint is already closed");
    throw new Error("Cannot change state from Closed to Closed");
  }
}
