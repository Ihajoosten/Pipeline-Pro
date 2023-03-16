import { ScrumMaster } from "../models/user.model";

export class SprintResult {
  public constructor(
    private name: string,
    private scrumMaster: ScrumMaster,
    private startDate: string,
    private endDate: string,
    private goal: string,
    private totalStoryPointsPlanned: number,
    private totalStoryPointsCompleted: number,
    private sprintDuration: number,
    private percentageOfPlannedStoryPointsCompleted: number,
    private userStoriesCompleted: string[],
    private userStoriesNotCompleted: string[],
    private impediments: string[],
    private retrospectiveActions: string[]
  ) { }
}