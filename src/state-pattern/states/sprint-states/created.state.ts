import { Sprint } from "../../../models/sprint.model";
import { ISprintState } from "../../interface/ISprintState";
import { SprintActiveState } from "./active.state";

export class SprintCreatedState implements ISprintState {
  constructor(private sprint: Sprint) {}
  onCreate(): void {
    throw new Error("Cannot change state from Created to Created");
  }
  onStart(): void {
    console.log("Scrum Master is starting the sprint!");
    this.sprint.setState(new SprintActiveState(this.sprint));
  }
  onFinish(): void {
    throw new Error("Cannot change state from Created to Finished");
  }
  onReview(): void {
    throw new Error("Cannot change state from Created to Reviewed");
  }
  onComplete(): void {
    throw new Error("Cannot change state from Created to Completed");
  }
  onClose(): void {
    throw new Error("Cannot change state from Created to Closed");
  }
}
