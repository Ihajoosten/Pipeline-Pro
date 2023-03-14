import { Sprint } from "../../../models/sprint.model";
import { ISprintState } from "../../interface/ISprintState";
import { SprintClosedState } from "./closed.state";

export class SprintCompletedState implements ISprintState {
  constructor(private sprint: Sprint) {}
  onCreate(): void {
    throw new Error("Cannot change state from Completed to Created");
  }
  onStart(): void {
    throw new Error("Cannot change state from Completed to Active");
  }
  onFinish(): void {
    throw new Error("Cannot change state from Completed to Finished");
  }
  onReview(): void {
    throw new Error("Cannot change state from Completed to Reviewed");
  }
  onComplete(): void {
    throw new Error("Cannot change state from Completed to Completed");
  }
  onClose(): void {
    console.log("Scrum Master is closing the sprint!");
    this.sprint.setState(new SprintClosedState(this.sprint));
  }
}
