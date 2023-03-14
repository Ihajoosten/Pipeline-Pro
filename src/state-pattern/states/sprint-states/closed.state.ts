import { Sprint } from "../../../models/sprint.model";
import { ISprintState } from "../../interface/ISprintState";

export class SprintClosedState implements ISprintState {
  constructor(private sprint: Sprint) {}
  create(): void {
    throw new Error("Cannot change state from Closed to Created");
  }
  start(): void {
    throw new Error("Cannot change state from Closed to Active");
  }
  finish(): void {
    throw new Error("Cannot change state from Closed to Finished");
  }
  release(): void {
    throw new Error("Cannot change state from Closed to Reviewed");
  }
  review(): void {
    throw new Error("Cannot change state from Closed to Completed");
  }
  close(): void {
    throw new Error("Cannot change state from Closed to Closed");
  }
}
