import { AbstractDevelopmentPipeline } from "../../../models/pipeline/abstract-development-pipeline.model";
import { IPipelineState } from "../../interface/IPipelineState";
import { PipelineDeployState } from "./deploy.state";

export class PipelineAnalyzeState implements IPipelineState {
  constructor(private pipeline: AbstractDevelopmentPipeline) {}
  onSource(): void {
    console.log("Pipeline is already analyzing project");
    throw new Error("Cannot change to Source State from Analyze State");
  }
  onPackage(): void {
    console.log("Pipeline is already analyzing project");
    throw new Error("Cannot change to Source State from Analyze State");
  }
  onBuild(): void {
    console.log("Pipeline is already analyzing project");
    throw new Error("Cannot change to Build State from Analyze State");
  }
  onTest(): void {
    console.log("Pipeline is already analyzing project");
    throw new Error("Cannot change to Test State from Analyze State");
  }
  onAnalyze(): void {
    console.log("Pipeline still analyzing..");
    throw new Error("Cannot change to Analyze State from Analyze State");
  }
  onDeploy(): void {
    console.log("Analysis complete, now deploying project");
    this.pipeline.setState(new PipelineDeployState(this.pipeline));
  }
}
