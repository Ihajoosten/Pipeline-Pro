import { User } from "../models/user.model";
import { SprintResult } from "./SprintResult";

export abstract class Report {
  generateReport(): string {
    const header = this.generateHeader();
    const content = this.generateContent();
    const footer = this.generateFooter();

    let report = `PDF Report for Sprint Results:
    Generated on ${new Date().getTime.toString} by ${process.env.USER}

    -----------------------------------------------------------------

    ${header}
    `;

    report += `
    
    ${content}

    -----------------------------------------------------------------

    `;
    report += footer;

    return report;
  }

  protected abstract generateHeader(): string;

  protected abstract generateFooter(): string;

  protected abstract generateContent(): string;
}

export function exportLog(sprintResult: SprintResult): string {
  const sprintDuration = Math.round(
    (new Date(sprintResult["endDate"]).getTime() -
      new Date(sprintResult["startDate"]).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  const velocity = sprintResult["totalStoryPointsCompleted"] / sprintDuration;

  let logOutput = `Sprint Name: ${sprintResult["name"]}\n`;
  logOutput += `Sprint Duration: ${sprintDuration} days\n`;
  logOutput += `Sprint Start Date: ${sprintResult["startDate"]}\n`;
  logOutput += `Sprint End Date: ${sprintResult["endDate"]}\n`;
  logOutput += `Sprint Goal: ${sprintResult["goal"]}\n`;
  logOutput += `Total Story Points Planned: ${sprintResult["totalStoryPointsPlanned"]}\n`;
  logOutput += `Total Story Points Completed: ${sprintResult["totalStoryPointsCompleted"]}\n`;
  logOutput += `Percentage of Planned Story Points Completed: ${sprintResult["percentageOfPlannedStoryPointsCompleted"]}%\n`;
  logOutput += `Velocity: ${velocity.toFixed(2)} story points per day\n`;

  logOutput += `\nUser Stories Completed:\n`;

  for (const userStory of sprintResult["userStoriesCompleted"]) {
    logOutput += `- ${userStory}\n`;
  }

  logOutput += `\nUser Stories Not Completed:\n`;
  for (const userStory of sprintResult["userStoriesNotCompleted"]) {
    logOutput += `- ${userStory}\n`;
  }

  logOutput += `\nImpediments:\n`;
  for (const impediment of sprintResult["impediments"]) {
    logOutput += `- ${impediment}\n`;
  }

  logOutput += `\nRetrospective Actions:\n`;
  for (const action of sprintResult["retrospectiveActions"]) {
    logOutput += `- ${action}\n`;
  }

  return logOutput;
}

export class PDFSprintReport extends Report {
  public author: User;
  public timeOfGeneration: string;
  public sprintResult: SprintResult;

  public constructor(author: User, sprintResults: SprintResult) {
    super();
    this.author = author;
    this.sprintResult = sprintResults;
    this.timeOfGeneration = new Date().getTime.toString();
  }

  protected generateHeader(): string {
    return `This is the header of the report that's going to be generated in PDF format`;
  }

  protected generateFooter(): string {
    return `This is the footer of the report that's going to be generated in PDF format`;
  }

  protected generateContent(): string {
    return exportLog(this.sprintResult);
  }
}

export class PNGSprintReport extends Report {
  public author: User;
  public timeOfGeneration: string;
  public sprintResult: SprintResult;

  public constructor(author: User, sprintResults: SprintResult) {
    super();
    this.author = author;
    this.sprintResult = sprintResults;
    this.timeOfGeneration = new Date().getTime.toString();
  }

  protected generateHeader(): string {
    return `This is the header of the report that's going to be generated in PNG format`;
  }

  protected generateFooter(): string {
    return `This is the footer of the report that's going to be generated in PNG format`;
  }

  protected generateContent(): string {
    return exportLog(this.sprintResult);
  }
}

export class JPEGSprintReport extends Report {
  public author: User;
  public timeOfGeneration: string;
  public sprintResult: SprintResult;

  public constructor(author: User, sprintResults: SprintResult) {
    super();
    this.author = author;
    this.sprintResult = sprintResults;
    this.timeOfGeneration = new Date().getTime.toString();
  }

  protected generateHeader(): string {
    return `This is the header of the report that's going to be generated in JPEG format`;
  }

  protected generateFooter(): string {
    return `This is the footer of the report that's going to be generated in JPEG format`;
  }

  protected generateContent(): string {
    return exportLog(this.sprintResult);
  }
}
