import { Pipeline } from "../../../models/pipeline";
import { IObserver } from "../../../observer-pattern/interfaces/IObserver";
import { IPipelineVisitor } from "../../../visitor-pattern/visitors/IPipelineVisitor";
import { IPipelineState } from "../../interface/IPipelineState";
import { PipelineCancelledState } from "./cancelled.state";
import { PipelineDeployState } from "./deploy.state";

export class PipelineAnalyzeState implements IPipelineState {
  constructor(
    private pipeline: Pipeline,
    private observers: IObserver[] = []
  ) { }

  public subscribe(observer: IObserver): void {
    this.observers.push(observer);
  }

  public unsubscribe(observer: IObserver): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  public notify(message: string): void {
    this.observers.forEach((observer: IObserver) => {
      observer.update(this);
    });
  }

  getName(): string {
    return "Analyze Stage";
  }

  getAction(): string {
    return "Analyzing...";
  }

  acceptVisitor(visitor: IPipelineVisitor): void {
    visitor.visit(this);
  }

  onSource(): void {
    this.logMessage();
    throw new Error("Cannot change to Source State from Analyze State");
  }

  onPackage(): void {
    this.logMessage();
    throw new Error("Cannot change to Source State from Analyze State");
  }

  onBuild(): void {
    this.logMessage();
    throw new Error("Cannot change to Build State from Analyze State");
  }

  onTest(): void {
    this.logMessage();
    throw new Error("Cannot change to Test State from Analyze State");
  }

  onAnalyze(): void {
    console.log("Pipeline still analyzing..");
    throw new Error("Cannot change to Analyze State from Analyze State");
  }

  onDeploy(): void {
    try {
      console.log("Analysis complete, now deploying project");
      this.pipeline.setState(new PipelineDeployState(this.pipeline));
    } catch (error) {
      this.notify(JSON.stringify(error));
    }
  }

  onCancelled(): void {
    try {
      console.log("Scrum Master Cancelled Pipeline");
      this.pipeline.setState(new PipelineCancelledState(this.pipeline));
    } catch (error) {
      this.notify(JSON.stringify(error));
    }
  }

  private logMessage(): void {
    console.log("Pipeline is already analyzing project");
  }
}
