import { Observer } from "../observer-pattern/interfaces/IObserver";
import { ISubject } from "../observer-pattern/interfaces/ISubject";
import { IPipelineState } from "../state-pattern/interface/IPipelineState";
import { PipelineSourceState } from "../state-pattern/states/pipeline-states/source.state";
import { IPipelineVisitor } from "../visitor-pattern/visitors/IPipelineVisitor";
import { GitIntegration } from "./gitIntegration.model";
import { User } from "./user/user.model";

export class Pipeline implements ISubject {
  private state: IPipelineState = new PipelineSourceState(this);
  private tasks: IPipelineState[] = [];
  private observers: Observer[] = [];
  private visitor?: IPipelineVisitor;

  constructor(private name: string, private scrumMaster: User, private gitIntegration: GitIntegration) { }

  public notify() {
    for (const observer of this.observers) {
      observer.sendMessage();
    }
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
    try {
      if (this.visitor) {
        this.tasks.forEach((task) => {
          task.acceptVisitor(this.visitor!);
        });
      }
    } catch (error) {
      const observer = new Observer(this.scrumMaster, `There was an error during one of the pipeline tasks!`)
      this.observers.push(observer);
      this.notify();
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
