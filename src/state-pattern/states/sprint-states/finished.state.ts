import { Sprint } from "../../../models/sprint.model";
import { ISprintState } from "../../interface/ISprintState";
import { SprintReviewState } from "./review.state";

export class SprintFinishedState implements ISprintState {
  constructor(private sprint: Sprint) { }
  onCreate(): void {
    console.log("Sprint is already finished");
    throw new Error("Cannot change state from Finished to Created");
  }
  onStart(): void {
    console.log("Sprint is already finished");
    throw new Error("Cannot change state from Finished to Active");
  }
  onFinish(): void {
    console.log("Sprint is already finished");
    throw new Error("Cannot change state from Finished to Finished");
  }
  onReview(): void {
    console.log("Sprint is already active");
    this.sprint.setState(new SprintReviewState(this.sprint));
  }
  onComplete(): void {
    console.log("Sprint is already active");
    throw new Error("Cannot change state from Finished to Copmleted");
  }
  onClose(): void {
    console.log("Sprint is already active");
    throw new Error("Cannot change state from Finished to Closed");
  }
}
