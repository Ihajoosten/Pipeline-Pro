import { Sprint } from "../../../models/sprint.model";
import { ISprintState } from "../../interface/ISprintState";

export class SprintClosedState implements ISprintState {
  constructor(private sprint: Sprint) {}
  onCreate(): void {
    throw new Error("Cannot change state from Closed to Created");
  }
  onStart(): void {
    throw new Error("Cannot change state from Closed to Active");
  }
  onFinish(): void {
    throw new Error("Cannot change state from Closed to Finished");
  }
  onReview(): void {
    throw new Error("Cannot change state from Closed to Reviewed");
  }
  onComplete(): void {
    throw new Error("Cannot change state from Closed to Completed");
  }
  onClose(): void {
    throw new Error("Cannot change state from Closed to Closed");
  }
}
