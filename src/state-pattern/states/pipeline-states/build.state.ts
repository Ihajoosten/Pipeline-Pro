import { Pipeline } from "../../../models/pipeline/pipeline";
import { IObserver } from "../../../observer-pattern/interfaces/IObserver";
import { IPipelineVisitor } from "../../../visitor-pattern/visitors/IPipelineVisitor";
import { IPipelineState } from "../../interface/IPipelineState";
import { PipelineTestState } from "./test.state";

export class PipelineBuildState implements IPipelineState {
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
    return "Build Stage";
  }
  getAction(): string {
    return "Building...";
  }
  acceptVisitor(visitor: IPipelineVisitor): void {
    visitor.visit(this);
  }
  onSource(): void {
    console.log("Pipeline still building project");
    throw new Error("Cannot change to Source State from Build State");
  }
  onPackage(): void {
    console.log("Pipeline still building project");
    throw new Error("Cannot change to Package State from Build State");
  }
  onBuild(): void {
    console.log("Pipeline is already building project");
    throw new Error("Cannot change to Package State from Build State");
  }
  onTest(): void {
    try {
      console.log("Pipeline successfully built project. Testing has started");
      this.pipeline.setState(new PipelineTestState(this.pipeline));
    } catch (error) {
      this.notify(JSON.stringify(error));
    }
  }
  onAnalyze(): void {
    console.log("Pipeline still building project");
    throw new Error("Cannot change to Analyze State from Build State");
  }
  onDeploy(): void {
    console.log("Pipeline still building project");
    throw new Error("Cannot change to Deploy State from Build State");
  }
}
