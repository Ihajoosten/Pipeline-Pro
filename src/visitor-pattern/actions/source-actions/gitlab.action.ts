import { CompositeComponent } from "../../compositeComponent";
import { AbstractPipelineVisitor } from "../../visitors/pipelineVisitor";

export class GitlabSourceAction extends CompositeComponent {
  constructor(name: string) {
    super(name);
  }

  public override AcceptVisitor(visitor: AbstractPipelineVisitor): void {
    visitor.visitGithub(this);
    super.AcceptVisitor(visitor);
  }

  public override executeAction(): string {
    return `Executing Gitlab Source Action`;
  }
}