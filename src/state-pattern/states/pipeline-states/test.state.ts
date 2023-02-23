import { AbstractDevelopmentPipeline } from "../../../models/pipeline/abstract-development-pipeline.model";
import { IPipelineState } from "../../interface/IPipelineState";
import { PipelineAnalyzeState } from "./analyze.state";

export class PipelineTestState implements IPipelineState {
  constructor(private pipeline: AbstractDevelopmentPipeline) {}
  onSource(): void {
    console.log("Pipeline is already testing project");
    throw new Error("Cannot change to Source State from Test State");
  }
  onPackage(): void {
    console.log("Pipeline is already testing project");
    throw new Error("Cannot change to Package State from Test State");
  }
  onBuild(): void {
    console.log("Pipeline is already testing project");
    throw new Error("Cannot change to Package State from Test State");
  }
  onTest(): void {
    console.log("Pipeline is already testing project");
    throw new Error("Cannot change to Package State from Test State");
  }
  onAnalyze(): void {
    console.log(
      "All tests have succeeded. Next job is analyzing code on coverage"
    );
    this.pipeline.setState(new PipelineAnalyzeState(this.pipeline));
  }
  onDeploy(): void {
    console.log("Pipeline is already testing project");
    throw new Error("Cannot change to Deploy State from Test State");
  }
}
