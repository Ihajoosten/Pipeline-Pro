import { IPipelineState } from "../../state-pattern/interface/IPipelineState";
import { IPipelineVisitor } from "./IPipelineVisitor";

export class AdvancedLogVisitor implements IPipelineVisitor {
  visit(pipelineStage: IPipelineState): void {
    this.log(
      `Stage: ${pipelineStage.getName()}: ${pipelineStage.getAction()} - ${new Date(
        Date.now()
      )}`
    );
  }

  public log(message: string) {
    console.log(message);
  }
}
