import { User } from "../models/user.model";
import { SprintResult } from "./SprintResult";

export abstract class Report {
  // public author: User;
  // public timeOfGeneration: string;
  // public format: string
  // public sprintResult: ISprintResult

  // public constructor(author: User, format: string, result: ISprintResult) {
  //   this.author = author;
  //   this.timeOfGeneration = new Date().getTime.toString();
  //   this.format = format;
  //   this.sprintResult = result
  // }

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

    `
    report += footer

    return report;
  }

  protected abstract generateHeader(): string

  protected abstract generateFooter(): string

  protected abstract generateContent(): string
}

export class PDFSprintReport extends Report {
  public author: User;
  public timeOfGeneration: string;
  public sprintResult: SprintResult


  public constructor(author: User, sprintResults: SprintResult) {
    super();
    this.author = author;
    this.sprintResult = sprintResults
    this.timeOfGeneration = new Date().getTime.toString();
  }

  protected generateHeader(): string {
    return `This is the header of the report that's going to be generated in PDF format`
  }

  protected generateFooter(): string {
    return `This is the footer of the report that's going to be generated in PDF format`
  }

  protected generateContent(): string {
    const sprintDuration = Math.round((new Date(this.sprintResult['endDate']).getTime() - new Date(this.sprintResult['startDate']).getTime()) / (1000 * 60 * 60 * 24));
    const velocity = this.sprintResult['totalStoryPointsCompleted'] / sprintDuration;

    let logOutput = `Sprint Name: ${this.sprintResult['name']}\n`;
    logOutput += `Sprint Duration: ${sprintDuration} days\n`;
    logOutput += `Sprint Start Date: ${this.sprintResult['startDate']}\n`;
    logOutput += `Sprint End Date: ${this.sprintResult['endDate']}\n`;
    logOutput += `Sprint Goal: ${this.sprintResult['goal']}\n`;
    logOutput += `Total Story Points Planned: ${this.sprintResult['totalStoryPointsPlanned']}\n`;
    logOutput += `Total Story Points Completed: ${this.sprintResult['totalStoryPointsCompleted']}\n`;
    logOutput += `Percentage of Planned Story Points Completed: ${this.sprintResult['percentageOfPlannedStoryPointsCompleted']}%\n`;
    logOutput += `Velocity: ${velocity.toFixed(2)} story points per day\n`;

    logOutput += `\nUser Stories Completed:\n`;

    for (const userStory of this.sprintResult['userStoriesCompleted']
    ) {
      logOutput += `- ${userStory}\n`;
    }

    logOutput += `\nUser Stories Not Completed:\n`;
    for (const userStory of this.sprintResult['userStoriesNotCompleted']
    ) {
      logOutput += `- ${userStory}\n`;
    }

    logOutput += `\nImpediments:\n`;
    for (const impediment of this.sprintResult['impediments']) {
      logOutput += `- ${impediment}\n`;
    }

    logOutput += `\nRetrospective Actions:\n`;
    for (const action of this.sprintResult['retrospectiveActions']
    ) {
      logOutput += `- ${action}\n`;
    }

    return logOutput;
  }
}

export class PNGSprintReport extends Report {
  public author: User;
  public timeOfGeneration: string;
  public sprintResult: SprintResult


  public constructor(author: User, sprintResults: SprintResult) {
    super();
    this.author = author;
    this.sprintResult = sprintResults
    this.timeOfGeneration = new Date().getTime.toString();
  }

  protected generateHeader(): string {
    return `This is the header of the report that's going to be generated in PNG format`
  }

  protected generateFooter(): string {
    return `This is the footer of the report that's going to be generated in PNG format`
  }

  protected generateContent(): string {
    const sprintDuration = Math.round((new Date(this.sprintResult['endDate']).getTime() - new Date(this.sprintResult['startDate']).getTime()) / (1000 * 60 * 60 * 24));
    const velocity = this.sprintResult['totalStoryPointsCompleted'] / sprintDuration;

    let logOutput = `Sprint Name: ${this.sprintResult['name']}\n`;
    logOutput += `Sprint Duration: ${sprintDuration} days\n`;
    logOutput += `Sprint Start Date: ${this.sprintResult['startDate']}\n`;
    logOutput += `Sprint End Date: ${this.sprintResult['endDate']}\n`;
    logOutput += `Sprint Goal: ${this.sprintResult['goal']}\n`;
    logOutput += `Total Story Points Planned: ${this.sprintResult['totalStoryPointsPlanned']}\n`;
    logOutput += `Total Story Points Completed: ${this.sprintResult['totalStoryPointsCompleted']}\n`;
    logOutput += `Percentage of Planned Story Points Completed: ${this.sprintResult['percentageOfPlannedStoryPointsCompleted']}%\n`;
    logOutput += `Velocity: ${velocity.toFixed(2)} story points per day\n`;

    logOutput += `\nUser Stories Completed:\n`;

    for (const userStory of this.sprintResult['userStoriesCompleted']
    ) {
      logOutput += `- ${userStory}\n`;
    }

    logOutput += `\nUser Stories Not Completed:\n`;
    for (const userStory of this.sprintResult['userStoriesNotCompleted']
    ) {
      logOutput += `- ${userStory}\n`;
    }

    logOutput += `\nImpediments:\n`;
    for (const impediment of this.sprintResult['impediments']) {
      logOutput += `- ${impediment}\n`;
    }

    logOutput += `\nRetrospective Actions:\n`;
    for (const action of this.sprintResult['retrospectiveActions']
    ) {
      logOutput += `- ${action}\n`;
    }

    return logOutput;
  }
}

export class JPEGSprintReport extends Report {
  public author: User;
  public timeOfGeneration: string;
  public sprintResult: SprintResult


  public constructor(author: User, sprintResults: SprintResult) {
    super();
    this.author = author;
    this.sprintResult = sprintResults
    this.timeOfGeneration = new Date().getTime.toString();
  }

  protected generateHeader(): string {
    return `This is the header of the report that's going to be generated in PNG format`
  }

  protected generateFooter(): string {
    return `This is the footer of the report that's going to be generated in PNG format`
  }

  protected generateContent(): string {
    const sprintDuration = Math.round((new Date(this.sprintResult['endDate']).getTime() - new Date(this.sprintResult['startDate']).getTime()) / (1000 * 60 * 60 * 24));
    const velocity = this.sprintResult['totalStoryPointsCompleted'] / sprintDuration;

    let logOutput = `Sprint Name: ${this.sprintResult['name']}\n`;
    logOutput += `Sprint Duration: ${sprintDuration} days\n`;
    logOutput += `Sprint Start Date: ${this.sprintResult['startDate']}\n`;
    logOutput += `Sprint End Date: ${this.sprintResult['endDate']}\n`;
    logOutput += `Sprint Goal: ${this.sprintResult['goal']}\n`;
    logOutput += `Total Story Points Planned: ${this.sprintResult['totalStoryPointsPlanned']}\n`;
    logOutput += `Total Story Points Completed: ${this.sprintResult['totalStoryPointsCompleted']}\n`;
    logOutput += `Percentage of Planned Story Points Completed: ${this.sprintResult['percentageOfPlannedStoryPointsCompleted']}%\n`;
    logOutput += `Velocity: ${velocity.toFixed(2)} story points per day\n`;

    logOutput += `\nUser Stories Completed:\n`;

    for (const userStory of this.sprintResult['userStoriesCompleted']
    ) {
      logOutput += `- ${userStory}\n`;
    }

    logOutput += `\nUser Stories Not Completed:\n`;
    for (const userStory of this.sprintResult['userStoriesNotCompleted']
    ) {
      logOutput += `- ${userStory}\n`;
    }

    logOutput += `\nImpediments:\n`;
    for (const impediment of this.sprintResult['impediments']) {
      logOutput += `- ${impediment}\n`;
    }

    logOutput += `\nRetrospective Actions:\n`;
    for (const action of this.sprintResult['retrospectiveActions']
    ) {
      logOutput += `- ${action}\n`;
    }

    return logOutput;
  }
}