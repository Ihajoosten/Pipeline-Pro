import { Sprint } from "../../../models/sprint.model";
import { ISprintState } from "../../interface/ISprintState";
import { SprintCompletedState } from "./completed.state";

export class SprintReviewState implements ISprintState {
  constructor(private sprint: Sprint) { }
  onCreate(): void {
    console.log("Sprint is already reviewed");
    throw new Error("Cannot change state from Reviewed to Created");
  }
  onStart(): void {
    console.log("Sprint is already reviewed");
    throw new Error("Cannot change state from Reviewed to Active");
  }
  onFinish(): void {
    console.log("Sprint is already reviewed");
    throw new Error("Cannot change state from Reviewed to Finished");
  }
  onReview(): void {
    console.log("Sprint is already reviewed");
    throw new Error("Cannot change state from Reviewed to Reviewed");
  }
  onComplete(): void {
    console.log("Scrum Master has now completed the sprint");
    this.sprint.setState(new SprintCompletedState(this.sprint));
  }
  onClose(): void {
    console.log("Sprint is already reviewed");
    throw new Error("Cannot change state from Reviewed to Closed");
  }
}
