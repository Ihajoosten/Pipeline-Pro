import { Sprint } from "../../../models/sprint.model";
import { ISprintState } from "../../interface/ISprintState";
import { SprintFinishedState } from "./finished.state";

export class SprintActiveState implements ISprintState {
  constructor(private sprint: Sprint) {}
  onCreate(): void {
    console.log("Sprint has already been Initialized.");
    throw new Error("Cannot change state from Active to Created");
  }
  onStart(): void {
    console.log("Sprint is already active");
    throw new Error("Cannot change state from Active to Active");
  }
  onFinish(): void {
    console.log("Scrum Master is finishing the sprint");
    this.sprint.setState(new SprintFinishedState(this.sprint));
  }
  onReview(): void {
    console.log("Sprint is already active");
    throw new Error("Cannot change state from Active to Active");
  }
  onComplete(): void {
    console.log("Sprint is already active");
    throw new Error("Cannot change state from Active to Copmleted");
  }
  onClose(): void {
    console.log("Sprint is already active");
    throw new Error("Cannot change state from Active to Closed");
  }
}
