import { Pipeline } from "../../../models/pipeline";
import { IObserver } from "../../../observer-pattern/interfaces/IObserver";
import { IPipelineVisitor } from "../../../visitor-pattern/visitors/IPipelineVisitor";
import { IPipelineState } from "../../interface/IPipelineState";
import { PipelineAnalyzeState } from "./analyze.state";
import { PipelineCancelledState } from "./cancelled.state";

export class PipelineTestState implements IPipelineState {
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
    return "Test Stage";
  }
  getAction(): string {
    return "Testing...";
  }
  acceptVisitor(visitor: IPipelineVisitor): void {
    visitor.visit(this);
  }
  onSource(): void {
    this.logMessage();
    throw new Error("Cannot change to Source State from Test State");
  }
  onPackage(): void {
    this.logMessage();
    throw new Error("Cannot change to Package State from Test State");
  }
  onBuild(): void {
    this.logMessage();
    throw new Error("Cannot change to Package State from Test State");
  }
  onTest(): void {
    this.logMessage();
    throw new Error("Cannot change to Package State from Test State");
  }
  onAnalyze(): void {
    try {
      console.log(
        "All tests have succeeded. Next job is analyzing code on coverage"
      );
      this.pipeline.setState(new PipelineAnalyzeState(this.pipeline));
    } catch (error) {
      this.notify(JSON.stringify(error));
    }
  }
  onDeploy(): void {
    this.logMessage();
    throw new Error("Cannot change to Deploy State from Test State");
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
    console.log("Pipeline is already testing project");
  }
}
