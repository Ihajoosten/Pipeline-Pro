import { IPipelineState } from "../../state-pattern/interface/IPipelineState";
import { IPipelineVisitor } from "./IPipelineVisitor";

export class AdvancedLogVisitor implements IPipelineVisitor {
  private message = "";

  visit(pipelineStage: IPipelineState): void {
    this.log(`Currently processing the following action: ${pipelineStage.getAction()} in the ${pipelineStage.getName()}!`);
  }

  public log(message: string) {
    this.message = message;
    console.log(`
    ╔═╗╔╦╗╦  ╦╔═╗╔╗╔╔═╗╔═╗╔╦╗  ╦  ╔═╗╔═╗╔═╗╔═╗╦═╗
    ╠═╣ ║║╚╗╔╝╠═╣║║║║  ║╣  ║║  ║  ║ ║║ ╦║ ╦║╣ ╠╦╝
    ╩ ╩═╩╝ ╚╝ ╩ ╩╝╚╝╚═╝╚═╝═╩╝  ╩═╝╚═╝╚═╝╚═╝╚═╝╩╚═                                                                                                                   
    `)
    console.log(`%c ${message}`);
  }

  public getLog(): string {
    return this.message;
  }
}
