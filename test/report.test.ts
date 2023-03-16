import { UserFactory } from "../src/factory-pattern/user-factory";
import { ScrumRole } from "../src/models/enumerations";
import { User } from "../src/models/user.model";
import {
  JPEGSprintReport,
  PDFSprintReport,
  PNGSprintReport,
  Report,
} from "../src/template-pattern/abstract-report";
import { SprintResult } from "../src/template-pattern/SprintResult";

describe("Report", () => {
  const mockUser = new UserFactory().createUser(
    "Erdem",
    "Pekguzel",
    "erdempekguzel@avans.nl",
    "0697513489",
    [],
    ScrumRole.SCRUM_MASTER
  );
  const mockSprintResult: SprintResult = new SprintResult(
    "Sprint 1",
    mockUser,
    "2022-01-01",
    "2022-01-10",
    "Complete feature X",
    10,
    8,
    80,
    ["US-1", "US-2"],
    ["US-3"],
    ["Impediment 1", "Impediment 2"],
    ["Action 1", "Action 2"]
  );

  describe("generateReport PDF", () => {
    it("should generate a report with PDFSprintReport", () => {
      // Arrange
      const report = new PDFSprintReport(mockUser, mockSprintResult);

      // Act
      const result = report.generateReport();

      // Assert
      expect(result).toMatch(/PDF Report for Sprint Results:/);
      expect(result).toMatch(/Generated on /);
      expect(result).toMatch(
        /This is the header of the report that's going to be generated in PDF format/
      );
      expect(result).toMatch(
        /This is the footer of the report that's going to be generated in PDF format/
      );
      expect(result).toMatch(/Sprint Name: Sprint 1/);
      expect(result).toMatch(/Sprint Duration: 9 days/);
      expect(result).toMatch(/Sprint Start Date: 2022-01-01/);
      expect(result).toMatch(/Sprint End Date: 2022-01-10/);
      expect(result).toMatch(/Sprint Goal: Complete feature X/);
      expect(result).toMatch(/Total Story Points Planned: 10/);
      expect(result).toMatch(/Total Story Points Completed: 8/);
      expect(result).toMatch(
        /Percentage of Planned Story Points Completed: 80%/
      );
      expect(result).toMatch(/Velocity: 0.89 story points per day/);
      expect(result).toMatch(/User Stories Completed:\n- US-1\n- US-2\n/);
      expect(result).toMatch(/User Stories Not Completed:\n- US-3\n/);
      expect(result).toMatch(/Impediments:\n- Impediment 1\n- Impediment 2\n/);
      expect(result).toMatch(
        /Retrospective Actions:\n- Action 1\n- Action 2\n/
      );
    });

    it("should throw an error when generateHeader is not implemented", () => {
      // Arrange
      class InvalidReport extends Report {
        protected generateFooter(): string {
          return "This is the footer of the report that's going to be generated in PDF format";
        }

        protected generateContent(): string {
          return "This is the content of the report that's going to be generated in PDF format";
        }

        protected generateHeader(): string {
          throw new Error("Not implemented: generateHeader");
        }
      }

      const report = new InvalidReport();

      // Act
      const action = () => report.generateReport();

      // Assert
      expect(action).toThrowError("Not implemented: generateHeader");
    });
  });

  describe("generateReport PNG", () => {
    it("should generate a report with PNGSprintReport", () => {
      // Arrange
      const report = new PNGSprintReport(mockUser, mockSprintResult);

      // Act
      const result = report.generateReport();

      // Assert
      expect(result).toMatch(/PDF Report for Sprint Results:/);
      expect(result).toMatch(/Generated on /);
      expect(result).toMatch(
        /This is the header of the report that's going to be generated in PNG format/
      );
      expect(result).toMatch(
        /This is the footer of the report that's going to be generated in PNG format/
      );
      expect(result).toMatch(/Sprint Name: Sprint 1/);
      expect(result).toMatch(/Sprint Duration: 9 days/);
      expect(result).toMatch(/Sprint Start Date: 2022-01-01/);
      expect(result).toMatch(/Sprint End Date: 2022-01-10/);
      expect(result).toMatch(/Sprint Goal: Complete feature X/);
      expect(result).toMatch(/Total Story Points Planned: 10/);
      expect(result).toMatch(/Total Story Points Completed: 8/);
      expect(result).toMatch(
        /Percentage of Planned Story Points Completed: 80%/
      );
      expect(result).toMatch(/Velocity: 0.89 story points per day/);
      expect(result).toMatch(/User Stories Completed:\n- US-1\n- US-2\n/);
      expect(result).toMatch(/User Stories Not Completed:\n- US-3\n/);
      expect(result).toMatch(/Impediments:\n- Impediment 1\n- Impediment 2\n/);
      expect(result).toMatch(
        /Retrospective Actions:\n- Action 1\n- Action 2\n/
      );
    });
  });

  describe("generateReport JPEG", () => {
    it("should generate a report with JPEGSprintReport", () => {
      // Arrange
      const report = new JPEGSprintReport(mockUser, mockSprintResult);

      // Act
      const result = report.generateReport();

      // Assert
      expect(result).toMatch(/PDF Report for Sprint Results:/);
      expect(result).toMatch(/Generated on /);
      expect(result).toMatch(
        /This is the header of the report that's going to be generated in JPEG format/
      );
      expect(result).toMatch(
        /This is the footer of the report that's going to be generated in JPEG format/
      );
      expect(result).toMatch(/Sprint Name: Sprint 1/);
      expect(result).toMatch(/Sprint Duration: 9 days/);
      expect(result).toMatch(/Sprint Start Date: 2022-01-01/);
      expect(result).toMatch(/Sprint End Date: 2022-01-10/);
      expect(result).toMatch(/Sprint Goal: Complete feature X/);
      expect(result).toMatch(/Total Story Points Planned: 10/);
      expect(result).toMatch(/Total Story Points Completed: 8/);
      expect(result).toMatch(
        /Percentage of Planned Story Points Completed: 80%/
      );
      expect(result).toMatch(/Velocity: 0.89 story points per day/);
      expect(result).toMatch(/User Stories Completed:\n- US-1\n- US-2\n/);
      expect(result).toMatch(/User Stories Not Completed:\n- US-3\n/);
      expect(result).toMatch(/Impediments:\n- Impediment 1\n- Impediment 2\n/);
      expect(result).toMatch(
        /Retrospective Actions:\n- Action 1\n- Action 2\n/
      );
    });

    it("should throw an error when generateHeader is not implemented", () => {
      // Arrange
      class InvalidReport extends Report {
        protected generateFooter(): string {
          return "This is the footer of the report that's going to be generated in JPEG format";
        }

        protected generateContent(): string {
          return "This is the content of the report that's going to be generated in JPEG format";
        }

        protected generateHeader(): string {
          throw new Error("Not implemented: generateHeader");
        }
      }

      const report = new InvalidReport();

      // Act
      const action = () => report.generateReport();

      // Assert
      expect(action).toThrowError("Not implemented: generateHeader");
    });

    it("should throw an error when generateFooter is not implemented", () => {
      // Arrange
      class InvalidReport extends Report {
        protected generateFooter(): string {
          throw new Error("Not implemented: generateFooter");
        }
        protected generateHeader(): string {
          return "This is the header of the report that's going to be generated in PDF format";
        }

        protected generateContent(): string {
          return "This is the content of the report that's going to be generated in PDF format";
        }
      }

      const report = new InvalidReport();

      // Act
      const action = () => report.generateReport();

      // Assert
      expect(action).toThrowError("Not implemented: generateFooter");
    });
  });
});
