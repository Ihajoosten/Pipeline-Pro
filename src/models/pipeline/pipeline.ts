import { IObserver } from "../../observer-pattern/interfaces/IObserver";
import { IPipelineState } from "../../state-pattern/interface/IPipelineState";
import { PipelineSourceState } from "../../state-pattern/states/pipeline-states/source.state";
import { IPipelineVisitor } from "../../visitor-pattern/visitors/IPipelineVisitor";

export class Pipeline implements IObserver {
  private name: string;
  private state: IPipelineState;
  private tasks: IPipelineState[] = [];
  private visitor!: IPipelineVisitor;

  constructor(name: string) {
    this.state = new PipelineSourceState(this);
    this.name = name;
  }

  update(data: any): void {
    // NOTIFICATIE VERSTUREN.
  }

  public getName(): string {
    return this.name;
  }

  public addTask(pipelineTask: IPipelineState) {
    this.tasks.push(pipelineTask);
  }

  public setVisitor(visitor: IPipelineVisitor) {
    this.visitor = visitor;
  }

  public execute(): void {
    if (this.visitor) {
      this.tasks.forEach((task) => {
        task.acceptVisitor(this.visitor);
      });
    }
  }

  public getState(): IPipelineState {
    return this.state;
  }

  public setState(state: IPipelineState): void {
    this.state = state;
  }

  // State change methods
  public moveToPackage(): void {
    this.state.onPackage();
  }

  public moveToBuild(): void {
    this.state.onBuild();
  }

  public moveToTest(): void {
    this.state.onTest();
  }

  public moveToAnalyze(): void {
    this.state.onAnalyze();
  }

  public moveToDeploy(): void {
    this.state.onDeploy();
  }
}
