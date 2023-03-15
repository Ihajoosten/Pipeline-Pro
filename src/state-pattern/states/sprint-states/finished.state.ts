import { Sprint } from "../../../models/sprint.model";
import { ISprintState } from "../../interface/ISprintState";
import { SprintReleasedState } from "./released.state";

export class SprintFinishedState implements ISprintState {
  constructor(private sprint: Sprint) {}
  create(): void {
    throw new Error("Cannot change state from Finished to Created");
  }
  start(): void {
    throw new Error("Cannot change state from Finished to Active");
  }
  finish(): void {
    throw new Error("Cannot change state from Finished to Finished");
  }
  release(): void {
    console.log("Scrum master is reviewing the sprint!");
    this.sprint.setState(new SprintReleasedState(this.sprint));
  }
  review(): void {
    throw new Error("Cannot change state from Finished to Completed");
  }
  close(): void {
    throw new Error("Cannot change state from Finished to Closed");
  }
}
