import { IObserver } from "../observer-pattern/interfaces/IObserver";
import { ISubject } from "../observer-pattern/interfaces/ISubject";
import { IPipelineState } from "../state-pattern/interface/IPipelineState";
import { PipelineSourceState } from "../state-pattern/states/pipeline-states/source.state";
import { IPipelineVisitor } from "../visitor-pattern/IPipelineVisitor";
import { ScrumRole } from "./enumerations";
import { Notification } from "./notification.model";
import { User } from "./user.model";

export class Pipeline implements ISubject {
  private _state: IPipelineState = new PipelineSourceState(this);
  private _tasks: Array<IPipelineState> = [];
  private _observers: Array<IObserver> = [];
  private _visitor?: IPipelineVisitor;
  private _isExecuting: boolean = false;

  constructor(
    private name: string,
    private productOwner: User,
    private scrumMaster: User
  ) {
    if (this.productOwner.getRole() !== ScrumRole.PRODUCT_OWNER) {
      throw new Error("Invalid product owner!");
    }
    if (this.scrumMaster.getRole() !== ScrumRole.SCRUM_MASTER) {
      throw new Error("Invalid scrum master!");
    }
  }

  public getName(): string {
    return this.name;
  }

  public addTask(pipelineTask: IPipelineState): void {
    this._tasks.push(pipelineTask);
  }

  public getTasks(): IPipelineState[] {
    return this._tasks;
  }

  public removeTask(pipelineTask: IPipelineState) {
    const index = this._tasks.indexOf(pipelineTask);
    if (index !== -1) {
      this._tasks.splice(index, 1);
    }
  }

  public setVisitor(_visitor: IPipelineVisitor): void {
    this._visitor = _visitor;
  }

  public execute(): void {
    try {
      this._isExecuting = true;
      if (this._visitor) {
        this._tasks.forEach((task) => {
          task.acceptVisitor(this._visitor!);
        });
        const notificationMessage = `Pipeline _tasks were successfully executed!`;
        this.notify(new Notification(this.productOwner, notificationMessage));
        this.notify(new Notification(this.scrumMaster, notificationMessage));
      }
    } catch (error) {
      this._isExecuting = false;
      const notificationMessage = `There was an error during one of the pipeline _tasks!`;
      this.notify(new Notification(this.scrumMaster, notificationMessage));
    }
    this._isExecuting = false;
  }

  public isRunning(): boolean {
    return this._isExecuting;
  }

  public getState(): IPipelineState {
    return this._state;
  }

  public setState(_state: IPipelineState): void {
    this._state = _state;
  }

  public moveToSource(): void {
    this._state.onSource();
  }

  public moveToPackage(): void {
    this._state.onPackage();
  }

  public moveToBuild(): void {
    this._state.onBuild();
  }

  public moveToTest(): void {
    this._state.onTest();
  }

  public moveToAnalyze(): void {
    this._state.onAnalyze();
  }

  public moveToDeploy(): void {
    this._state.onDeploy();
  }

  public moveToCancel(): void {
    this._state.onCancel();
  }

  public subscribe(observer: IObserver) {
    this._observers.push(observer);
  }

  public unsubscribe(observer: IObserver) {
    const index = this._observers.indexOf(observer);
    if (index !== -1) {
      this._observers.splice(index, 1);
    }
  }

  public notify(notification: Notification) {
    for (const observer of this._observers) {
      observer.update(notification);
    }
  }
}
