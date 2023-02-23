import { Pipeline } from "../../../models/pipeline/pipeline";
import { IObserver } from "../../../observer-pattern/interfaces/IObserver";
import { IPipelineVisitor } from "../../../visitor-pattern/visitors/IPipelineVisitor";
import { IPipelineState } from "../../interface/IPipelineState";
import { PipelinePackageState } from "./package.state";

export class PipelineSourceState implements IPipelineState {
  constructor(
    private pipeline: Pipeline,
    private observers: IObserver[] = []
  ) {}
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
    return "Source State";
  }

  getAction(): string {
    return "Sourcing...";
  }

  acceptVisitor(visitor: IPipelineVisitor): void {
    visitor.visit(this);
  }

  onSource(): void {
    console.log("Pipeline still fetching source code");
    throw new Error("Cannot change to Source State from Source State");
  }

  onPackage(): void {
    try {
      console.log(
        "Source Code Fetched, now installing 3rd party packages/libraries"
      );
      this.pipeline.setState(new PipelinePackageState(this.pipeline));
    } catch (error) {
      this.notify(JSON.stringify(error));
    }
  }

  onBuild(): void {
    console.log("Pipeline still fetching source code");
    throw new Error("Cannot change to Build State from Source State");
  }

  onTest(): void {
    console.log("Pipeline still fetching source code");
    throw new Error("Cannot change to Test State from Source State");
  }

  onAnalyze(): void {
    console.log("Pipeline still fetching source code");
    throw new Error("Cannot change to Analyze State from Source State");
  }

  onDeploy(): void {
    console.log("Pipeline still fetching source code");
    throw new Error("Cannot change to Deploy State from Source State");
  }
}
