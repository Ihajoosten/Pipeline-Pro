import { Pipeline } from "../../../models/pipeline";
import { IObserver } from "../../../observer-pattern/interfaces/IObserver";
import { IPipelineVisitor } from "../../../visitor-pattern/visitors/IPipelineVisitor";
import { IPipelineState } from "../../interface/IPipelineState";
import { PipelineSourceState } from "./source.state";

export class PipelineCancelledState implements IPipelineState {
  constructor(private pipeline: Pipeline, private observers: IObserver[] = []) {
    this.notify("Development Pipeline cancelled");
  }

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
    return "Cancel Stage";
  }

  getAction(): string {
    return "Canceling Pipeline...";
  }

  acceptVisitor(visitor: IPipelineVisitor): void {
    visitor.visit(this);
  }

  onSource(): void {
    // only to this state to restart
    try {
      console.log("Pipeline cancelled, now restarting tasks");
      this.pipeline.setState(new PipelineSourceState(this.pipeline));
    } catch (error) {
      this.notify(JSON.stringify(error));
    }
  }

  onPackage(): void {
    this.logMessage();
    throw new Error("Cannot change to Package State from Cancelled State");
  }

  onBuild(): void {
    this.logMessage();
    throw new Error("Cannot change to Build State from Cancelled State");
  }

  onTest(): void {
    this.logMessage();
    throw new Error("Cannot change to Test State from Cancelled State");
  }

  onAnalyze(): void {
    this.logMessage();
    throw new Error("Cannot change to Analyze State from Cancelled State");
  }

  onDeploy(): void {
    this.logMessage();
    throw new Error("Cannot change to Deploy State from Cancelled State");
  }
  onCancelled(): void {
    this.logMessage();
    throw new Error("Cannot change to Cancelled State from Cancelled State");
  }

  private logMessage(): void {
    console.log("Project is cancelled");
  }
}
