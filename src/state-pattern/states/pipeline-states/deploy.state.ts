import { AbstractDevelopmentPipeline } from "../../../models/pipeline/abstract-development-pipeline.model";
import { IPipelineState } from "../../interface/IPipelineState";

export class PipelineDeployState implements IPipelineState {
  constructor(private pipeline: AbstractDevelopmentPipeline) {}
  onSource(): void {
    console.log("Project is deployed");
    throw new Error("Cannot change to Source State from Deploy State");
  }
  onPackage(): void {
    console.log("Project is deployed");
    throw new Error("Cannot change to Source State from Deploy State");
  }
  onBuild(): void {
    console.log("Project is deployed");
    throw new Error("Cannot change to Build State from Deploy State");
  }
  onTest(): void {
    console.log("Project is deployed");
    throw new Error("Cannot change to Test State from Deploy State");
  }
  onAnalyze(): void {
    console.log("Project is deployed");
    throw new Error("Cannot change to Analyze State from Deploy State");
  }
  onDeploy(): void {
    console.log("Project is deployed");
    throw new Error("Cannot change to Deploy State from Deploy State");
  }
}
