import { TeamFactory } from "../src/factory-pattern/team-factory";
import { UserFactory } from "../src/factory-pattern/user-factory";
import { NotificationType, ScrumRole } from "../src/models/enumerations";
import { Pipeline } from "../src/models/pipeline.model";
import { Project } from "../src/models/project.model";
import { Sprint } from "../src/models/sprint.model";
import { User, NotificationPreference } from "../src/models/user.model";

describe("Project", () => {
  let project: Project;
  let productOwner: User;
  let scrumMaster: User;
  let developer: User;
  let leadDeveloper: User;
  let sprint: Sprint;
  let pipeline: Pipeline;

  beforeEach(() => {
    productOwner = new UserFactory().createUser(
      "Erdem",
      "Pekguzel",
      "erdempekguzel@avans.nl",
      "0697513489",
      [],
      ScrumRole.PRODUCT_OWNER
    );
    scrumMaster = new UserFactory().createUser(
      "Erdem",
      "Pekguzel",
      "erdempekguzel@avans.nl",
      "0697513489",
      [],
      ScrumRole.SCRUM_MASTER
    );
    developer = new UserFactory().createUser(
      "Luc",
      "Joosten",
      "lhajoost@avans.nl",
      "0645791584",
      [
        new NotificationPreference(
          NotificationType.EMAIL,
          "lhajoosten@avans.nl"
        ),
      ],
      ScrumRole.DEVELOPER
    );
    leadDeveloper = new UserFactory().createUser(
      "Luc",
      "Joosten",
      "lhajoost@avans.nl",
      "0645791584",
      [
        new NotificationPreference(
          NotificationType.EMAIL,
          "lhajoosten@avans.nl"
        ),
      ],
      ScrumRole.LEAD_DEVELOPER
    );
    const developers = [developer, leadDeveloper];
    const team = TeamFactory.createTeam('Test Team', productOwner, scrumMaster, [developers[1]], [developers[0]])
    project = new Project(
      1,
      "Test Project",
      new Date(),
      new Date(),
      team
    );
    pipeline = new Pipeline("pipelineTest", productOwner, scrumMaster);
    sprint = new Sprint(
      "",
      new Date(),
      new Date(),
      developer,
      productOwner,
      scrumMaster,
      pipeline
    );
  });

  describe("addSprint", () => {
    it("should add a sprint to the project", () => {
      project.addSprint(sprint);
      expect(project["_sprints"]).toContain(sprint);
    });
  });

  describe("removeSprint", () => {
    it("should remove a sprint from the project if the current user is a scrum master", () => {
      project["_sprints"] = [sprint];
      project.removeSprint(sprint);
      expect(project["_sprints"]).not.toContain(sprint);
    });
  });
});
