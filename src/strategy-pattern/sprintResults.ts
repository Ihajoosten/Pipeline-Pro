// SprintResult class
export class SprintResult {
  constructor(
    public sprintNumber: number,
    public startDate: Date,
    public endDate: Date,
    public goals: string[],
    public completed: boolean,
    public metrics: {
      velocity: number;
      burndownChart: number[];
      cumulativeFlowDiagram: number[];
      leadTime: number;
      cycleTime: number;
    }
  ) {}
}
