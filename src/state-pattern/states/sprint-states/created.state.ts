import { Sprint } from "../../../models/sprint.model";
import { ISprintState } from "../../interface/ISprintState";
import { SprintActiveState } from "./active.state";

export class SprintCreatedState implements ISprintState {
  constructor(private sprint: Sprint) {}
  create(): void {
    throw new Error("Cannot change state from Created to Created");
  }
  start(): void {
    console.log("Scrum Master is starting the sprint!");
    this.sprint.setState(new SprintActiveState(this.sprint));
  }
  finish(): void {
    throw new Error("Cannot change state from Created to Finished");
  }
  release(): void {
    throw new Error("Cannot change state from Created to Reviewed");
  }
  review(): void {
    throw new Error("Cannot change state from Created to Completed");
  }
  close(): void {
    throw new Error("Cannot change state from Created to Closed");
  }
}
