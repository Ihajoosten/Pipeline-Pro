import { Sprint } from "../../../models/sprint.model";
import { ISprintState } from "../../interface/ISprintState";
import { SprintClosedState } from "./closed.state";
import { SprintReviewState } from "./review.state";

export class SprintFinishedState implements ISprintState {
  constructor(private sprint: Sprint) {}
  onCreate(): void {
    throw new Error("Cannot change state from Finished to Created");
  }
  onStart(): void {
    throw new Error("Cannot change state from Finished to Active");
  }
  onFinish(): void {
    throw new Error("Cannot change state from Finished to Finished");
  }
  onReview(): void {
    console.log("Scrum master is reviewing the sprint!");
    this.sprint.setState(new SprintReviewState(this.sprint));
  }
  onComplete(): void {
    throw new Error("Cannot change state from Finished to Completed");
  }
  onClose(): void {
    console.log("Scrum master is releasing the sprint!");
    this.sprint.setState(new SprintClosedState(this.sprint));
  }
}
