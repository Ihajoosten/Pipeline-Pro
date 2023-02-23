import { AbstractDevelopmentPipeline } from "./abstract-development-pipeline.model";

export class DeploymentPipeline extends AbstractDevelopmentPipeline {
  constructor(name: string) {
    super(name);
  }
}
