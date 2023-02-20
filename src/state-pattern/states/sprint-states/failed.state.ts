import { Sprint } from "../../../models/sprint.model";
import { ISprintState } from "../../interface/ISprintState";
import { SprintInProgressState } from "./inProgress.state";

export class SprintFailedState implements ISprintState {
  constructor(private sprint: Sprint) {}

  public create(): void {
    let hasToDo: boolean = false;

    this.sprint.backlogItems?.forEach((i) => {
      if (i.name === "ToDo") hasToDo = true;
    });

    if (hasToDo) {
      this.sprint.setState(new SprintInProgressState(this.sprint));
    } else {
      console.log(
        "Cannot create a new sprint when the previous sprint has failed."
      );
    }
  }

  public start(): void {
    let hasToDo: boolean = false;

    this.sprint.backlogItems?.forEach((i) => {
      if (i.name === "ToDo") hasToDo = true;
    });

    if (hasToDo) {
      this.sprint.setState(new SprintInProgressState(this.sprint));
    } else {
      console.log(
        "Cannot start a new sprint when the previous sprint has failed."
      );
      throw new Error(
        "Cannot transition from Failed to InProgress because all items are done"
      );
    }
  }

  public complete(): void {
    let hasToDo: boolean = false;

    this.sprint.backlogItems?.forEach((i) => {
      if (i.name === "ToDo") hasToDo = true;
    });

    if (hasToDo) {
      this.sprint.setState(new SprintInProgressState(this.sprint));
    } else {
      console.log("Cannot complete a sprint that has failed.");
      throw new Error("Cannot transition from Failed to Completed");
    }
  }

  public release(): void {
    let hasToDo: boolean = false;

    this.sprint.backlogItems?.forEach((i) => {
      if (i.name === "ToDo") hasToDo = true;
    });

    if (hasToDo) {
      this.sprint.setState(new SprintInProgressState(this.sprint));
    } else {
      console.log("Cannot release a sprint that has failed.");
      throw new Error("Cannot transition from Failed to Released");
    }
  }

  public fail(): void {
    let hasToDo: boolean = false;

    this.sprint.backlogItems?.forEach((i) => {
      if (i.name === "ToDo") hasToDo = true;
    });

    if (hasToDo) {
      this.sprint.setState(new SprintInProgressState(this.sprint));
    } else {
      console.log("Cannot cancel a sprint that has already failed");
      throw new Error("Cannot transition from Failed to Failed");
    }
  }
}
