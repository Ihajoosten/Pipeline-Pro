import { Project } from "../src/models/project.model";
import { Team } from "../src/models/team.model";
import { Role } from "../src/models/user/roles";
import { User } from "../src/models/user/user.model";

describe("The User can create one or multiple projects", () => {

  let productOwner: User
  beforeEach(() => {
    productOwner = new User("Luc Joosten", "luc@gmail.com", Role.ProductOwner);
  });

  it("Product Owner creates a new Scrum Project", () => {
    let project = new Project("test project", productOwner, new Team("Test"))

    expect(project).toBeInstanceOf(Project)
  });
});