import { Component } from "./component";
import { AbstractPipelineVisitor } from "./visitors/pipelineVisitor";

export abstract class CompositeComponent extends Component {
  private pipelineActions: Array<Component>;

  constructor(name: string) {
    super(name);
    this.pipelineActions = new Array<Component>();
  }

  public executeAction(actionName: string): string {
    return `Executing ${actionName} on the ${this.name} Pipeline`
  }

  public addChild(pipelineAction: Component): void {
    this.pipelineActions.push(pipelineAction);
  }

  public removeChild(pipelineAction: Component): void {
    const index = this.pipelineActions.indexOf(pipelineAction);
    if (index !== -1) {
      this.pipelineActions.splice(index, 1);
    }
  }

  public getChild(index: number): Component {
    return this.pipelineActions[index];
  }

  public override AcceptVisitor(visitor: AbstractPipelineVisitor): void {
    this.pipelineActions.forEach(action => {
      action.AcceptVisitor(visitor);
    });
  }
}