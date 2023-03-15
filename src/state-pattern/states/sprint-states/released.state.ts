import { Sprint } from "../../../models/sprint.model";
import { ISprintState } from "../../interface/ISprintState";
import { SprintReviewedState } from "./reviewed.state";

export class SprintReleasedState implements ISprintState {
  constructor(private sprint: Sprint) { }
  create(): void {
    throw new Error("Cannot change state from Released to Created");
  }
  start(): void {
    throw new Error("Cannot change state from Released to Active");
  }
  finish(): void {
    throw new Error("Cannot change state from Released to Finished");
  }
  release(): void {
    throw new Error("Cannot change state from Released to Released");
  }
  review(): void {
    console.log("Scrum Master is reviewing the sprint!");
    this.sprint.setState(new SprintReviewedState(this.sprint));
  }
  close(): void {
    throw new Error("Cannot change state from Released to Closed");
  }
}
