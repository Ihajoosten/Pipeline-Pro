import { Sprint } from "../../../models/sprint.model";
import { ISprintState } from "../../interface/ISprintState";
import { SprintFinishedState } from "./finished.state";

export class SprintActiveState implements ISprintState {
  constructor(private sprint: Sprint) { }
  create(): void {
    throw new Error("Cannot change state from Active to Created");
  }
  start(): void {
    throw new Error("Cannot change state from Active to Active");
  }
  finish(): void {
    console.log("Scrum Master is finishing the sprint!");
    this.sprint.setState(new SprintFinishedState(this.sprint));
  }
  release(): void {
    throw new Error("Cannot change state from Active to Reviewed");
  }
  review(): void {
    throw new Error("Cannot change state from Active to Copmleted");
  }
  close(): void {
    throw new Error("Cannot change state from Active to Closed");
  }
}
