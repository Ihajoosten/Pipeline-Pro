import { IObserver } from "../observer-pattern/interfaces/IObserver";
import { ISubject } from "../observer-pattern/interfaces/ISubject";
import { IPipelineState } from "../state-pattern/interface/IPipelineState";
import { PipelineSourceState } from "../state-pattern/states/pipeline-states/source.state";
import { IPipelineVisitor } from "../visitor-pattern/visitors/IPipelineVisitor";
import { Sprint } from "./sprint.model";

export class Pipeline implements ISubject {
  private name: string;
  private state: IPipelineState;
  private tasks: Array<IPipelineState> = new Array<IPipelineState>();
  private visitor!: IPipelineVisitor;
  private observers: Array<IObserver> = new Array<IObserver>();
  public hasSucceeded: boolean;

  constructor(name: string) {
    this.state = new PipelineSourceState(this);
    this.name = name;
    this.hasSucceeded = false;
  }

  public subscribe(observer: IObserver) {
    this.observers.push(observer);
  }

  public unsubscribe(observer: IObserver) {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  public notify(message: string) {
    for (const observer of this.observers) {
      observer.update({ message });
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
          task.acceptVisitor(this.visitor);
        });
      }
    } catch (err) {
      this.hasSucceeded = false;
      this.notify(
        `There was an error during the pipeline tasks - error message: ${err}`
      );
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
