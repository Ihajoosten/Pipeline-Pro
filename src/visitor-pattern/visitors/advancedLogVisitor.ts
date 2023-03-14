import { IPipelineState } from "../../state-pattern/interface/IPipelineState";
import { IPipelineVisitor } from "./IPipelineVisitor";

export class AdvancedLogVisitor implements IPipelineVisitor {
  private message: string = "";

  visit(pipelineStage: IPipelineState): void {
    this.log(
      `Stage: ${pipelineStage.getName()}: ${pipelineStage.getAction()} - ${new Date(
        Date.now()
      )}`
    );
  }

  public log(message: string) {
    this.message = message;
    console.log(this.message);
  }

  public getLog(): string {
    return this.message;
  }
}
