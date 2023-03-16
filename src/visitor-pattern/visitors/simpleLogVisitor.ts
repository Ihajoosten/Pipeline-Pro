import { IPipelineState } from "../../state-pattern/interface/IPipelineState";
import { IPipelineVisitor } from "./IPipelineVisitor";

export class SimpleLogVisitor implements IPipelineVisitor {
  visit(pipelineStage: IPipelineState): void {
    this.log(`Stage: ${pipelineStage.getName()}`);
  }

  public log(message: string): void {
    console.log(message);
  }
}
