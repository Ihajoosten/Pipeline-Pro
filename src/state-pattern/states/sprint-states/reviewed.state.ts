import { Sprint } from "../../../models/sprint.model";
import { ISprintState } from "../../interface/ISprintState";
import { SprintClosedState } from "./closed.state";

export class SprintReviewedState implements ISprintState {
  constructor(private sprint: Sprint) {}
  create(): void {
    throw new Error("Cannot change state from Reviewed to Created");
  }
  start(): void {
    throw new Error("Cannot change state from Reviewed to Active");
  }
  finish(): void {
    throw new Error("Cannot change state from Reviewed to Finished");
  }
  release(): void {
    throw new Error("Cannot change state from Reviewed to Released");
  }
  review(): void {
    throw new Error("Cannot change state from Reviewed to Reviewed");
  }
  close(): void {
    console.log("Scrum Master is closing the sprin!t");
    this.sprint.setState(new SprintClosedState(this.sprint));
  }
}
