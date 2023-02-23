import { CompositeComponent } from "../../compositeComponent";
import { AbstractPipelineVisitor } from "../../visitors/pipelineVisitor";

export class AWSDeployAction extends CompositeComponent {
  constructor(name: string) {
    super(name);
  }

  public override AcceptVisitor(visitor: AbstractPipelineVisitor): void {
    visitor.visitGithub(this);
    super.AcceptVisitor(visitor);
  }

  public override executeAction(): string {
    return `Executing AWS deploy Action`;
  }
}