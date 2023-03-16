import { IReportGeneratorStrategy } from "./interfaces/IReportGeneratorStrategy";
import { SprintResult } from "./sprintResults";

// PDF Report generator
export class PDFReport implements IReportGeneratorStrategy {
  generateReport(results: string[]): string {
    let report = `PDF Report for Sprint Results:
    Generated on ${new Date().toLocaleString()} by ${process.env.USER}

    -----------------------------------------------------------------

    `;

    for (const result of results) {
      report += `
      Sprint Number: ${result.sprintNumber}
      Start Date: ${result.startDate.toLocaleDateString()}
      End Date: ${result.endDate.toLocaleDateString()}
      Goals: ${result.goals.join(", ")}
      Completed: ${result.completed}
      Velocity: ${result.metrics.velocity}
      Burndown Chart: ${result.metrics.burndownChart.join(", ")}
      Cumulative Flow Diagram: ${result.metrics.cumulativeFlowDiagram.join(
        ", "
      )}
      Lead Time: ${result.metrics.leadTime}
      Cycle Time: ${result.metrics.cycleTime}

      -----------------------------------------------------------------
      `;
    }
    return report;
  }
}

// PNG Report generator
export class PNGReport implements IReportGeneratorStrategy {
  generateReport(results: string[]): string {
    let report = `PNG Report for Sprint Results:
    Generated on ${new Date().toLocaleString()} by ${process.env.USER}

    -----------------------------------------------------------------

    `;

    for (const result of results) {
      report += `
      Sprint Number: ${result.sprintNumber}
      Start Date: ${result.startDate.toLocaleDateString()}
      End Date: ${result.endDate.toLocaleDateString()}
      Goals: ${result.goals.join(", ")}
      Completed: ${result.completed}
      Velocity: ${result.metrics.velocity}
      Burndown Chart: ${result.metrics.burndownChart.join(", ")}
      Cumulative Flow Diagram: ${result.metrics.cumulativeFlowDiagram.join(
        ", "
      )}
      Lead Time: ${result.metrics.leadTime}
      Cycle Time: ${result.metrics.cycleTime}

      -----------------------------------------------------------------
      `;
    }

    // Convert report to PNG image
    // ...

    return "PNG image generated";
  }
}

// JPEG Report generator
export class JPEGReport implements IReportGeneratorStrategy {
  generateReport(results: string[]): string {
    let report = `JPEG Report for Sprint Results:
    Generated on ${new Date().toLocaleString()} by ${process.env.USER}

    -----------------------------------------------------------------

    `;

    for (const result of results) {
      report += `
      Sprint Number: ${result.sprintNumber}
      Start Date: ${result.startDate.toLocaleDateString()}
      End Date: ${result.endDate.toLocaleDateString()}
      Goals: ${result.goals.join(", ")}
      Completed: ${result.completed}
      Velocity: ${result.metrics.velocity}
      Burndown Chart: ${result.metrics.burndownChart.join(", ")}
      Cumulative Flow Diagram: ${result.metrics.cumulativeFlowDiagram.join(
        ", "
      )}
      Lead Time: ${result.metrics.leadTime}
      Cycle Time: ${result.metrics.cycleTime}

      -----------------------------------------------------------------
      `;
    }

    // Convert report to JPEG image
    // ...

    return "JPEG image generated";
  }
}
