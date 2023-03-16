import { TeamFactory } from "../src/factory-pattern/team-factory";
import { UserFactory } from "../src/factory-pattern/user-factory";
import { ScrumRole } from "../src/models/enumerations";
import { Developer, LeadDeveloper, Tester } from "../src/models/user.model";

describe("Team Factory", () => {
  const userFactory = new UserFactory();

  describe("Create Team", () => {
    it("should create a team with only a name", () => {
      const team = TeamFactory.createTeam("Testing Team SOA3");
      expect(team.name).toEqual("Testing Team SOA3");
      expect(team.productOwner).toBeUndefined();
      expect(team.scrumMaster).toBeUndefined();
      expect(team.developers).toBeUndefined();
      expect(team.leadDevelopers).toBeUndefined();
      expect(team.testers).toBeUndefined();
    });

    it("should create a team with a product owner, scrum master", () => {
      const productOwner = userFactory.createUser(
        "Luc",
        "Joosten",
        "test@gmail.com",
        "0649785015",
        [],
        ScrumRole.PRODUCT_OWNER
      );
      const scrumMaster = userFactory.createUser(
        "Erdem",
        "Pekguzel",
        "test@gmail.com",
        "0649785015",
        [],
        ScrumRole.SCRUM_MASTER
      );

      const team = TeamFactory.createTeam(
        "Testing Team SOA3",
        productOwner,
        scrumMaster
      );
      expect(team.name).toEqual("Testing Team SOA3");
      expect(team.productOwner).toEqual(productOwner);
      expect(team.scrumMaster).toEqual(scrumMaster);
      expect(team.developers).toBeUndefined();
      expect(team.leadDevelopers).toBeUndefined();
      expect(team.testers).toBeUndefined();
    });

    it("should create a team with only developers", () => {
      const developer1 = userFactory.createUser(
        "Luc",
        "Joosten",
        "test@gmail.com",
        "0649785015",
        [],
        ScrumRole.DEVELOPER
      );
      const developer2 = userFactory.createUser(
        "Luc",
        "Joosten",
        "test@gmail.com",
        "0649785015",
        [],
        ScrumRole.DEVELOPER
      );
      const developer3 = userFactory.createUser(
        "Luc",
        "Joosten",
        "test@gmail.com",
        "0649785015",
        [],
        ScrumRole.DEVELOPER
      );

      const developers: Developer[] = [developer1, developer2, developer3];
      const team = TeamFactory.createTeam(
        "Testing Team SOA3",
        undefined,
        undefined,
        undefined,
        developers
      );

      expect(team.name).toEqual("Testing Team SOA3");
      expect(team.productOwner).toBeUndefined();
      expect(team.scrumMaster).toBeUndefined();
      expect(team.developers).toEqual(developers);
      expect(team.leadDevelopers).toBeUndefined();
      expect(team.testers).toBeUndefined();
    });

    it("should create a team with only lead developers", () => {
      const developer1 = userFactory.createUser(
        "Luc",
        "Joosten",
        "test@gmail.com",
        "0649785015",
        [],
        ScrumRole.LEAD_DEVELOPER
      );
      const developer2 = userFactory.createUser(
        "Luc",
        "Joosten",
        "test@gmail.com",
        "0649785015",
        [],
        ScrumRole.LEAD_DEVELOPER
      );
      const developer3 = userFactory.createUser(
        "Luc",
        "Joosten",
        "test@gmail.com",
        "0649785015",
        [],
        ScrumRole.LEAD_DEVELOPER
      );

      const developers: LeadDeveloper[] = [developer1, developer2, developer3];
      const team = TeamFactory.createTeam(
        "Testing Team SOA3",
        undefined,
        undefined,
        developers
      );

      expect(team.name).toEqual("Testing Team SOA3");
      expect(team.productOwner).toBeUndefined();
      expect(team.scrumMaster).toBeUndefined();
      expect(team.leadDevelopers).toEqual(developers);
      expect(team.developers).toBeUndefined();
      expect(team.testers).toBeUndefined();
    });

    it("should create a team with only testers", () => {
      const tester1 = userFactory.createUser(
        "Luc",
        "Joosten",
        "test@gmail.com",
        "0649785015",
        [],
        ScrumRole.TESTER
      );
      const tester2 = userFactory.createUser(
        "Luc",
        "Joosten",
        "test@gmail.com",
        "0649785015",
        [],
        ScrumRole.TESTER
      );
      const tester3 = userFactory.createUser(
        "Luc",
        "Joosten",
        "test@gmail.com",
        "0649785015",
        [],
        ScrumRole.TESTER
      );

      const testers: Tester[] = [tester1, tester2, tester3];
      const team = TeamFactory.createTeam(
        "Testing Team SOA3",
        undefined,
        undefined,
        undefined,
        undefined,
        testers
      );

      expect(team.name).toEqual("Testing Team SOA3");
      expect(team.productOwner).toBeUndefined();
      expect(team.scrumMaster).toBeUndefined();
      expect(team.leadDevelopers).toBeUndefined();
      expect(team.developers).toBeUndefined();
      expect(team.testers).toEqual(testers);
    });

    it("should create a full team", () => {
      const productOwner = userFactory.createUser(
        "Luc",
        "Joosten",
        "test@gmail.com",
        "0649785015",
        [],
        ScrumRole.PRODUCT_OWNER
      );
      const scrumMaster = userFactory.createUser(
        "Erdem",
        "Pekguzel",
        "test@gmail.com",
        "0649785015",
        [],
        ScrumRole.SCRUM_MASTER
      );

      const developer1 = userFactory.createUser(
        "Luc",
        "Joosten",
        "test@gmail.com",
        "0649785015",
        [],
        ScrumRole.DEVELOPER
      );
      const developer2 = userFactory.createUser(
        "Luc",
        "Joosten",
        "test@gmail.com",
        "0649785015",
        [],
        ScrumRole.DEVELOPER
      );
      const developer3 = userFactory.createUser(
        "Luc",
        "Joosten",
        "test@gmail.com",
        "0649785015",
        [],
        ScrumRole.DEVELOPER
      );

      const developers: Developer[] = [developer1, developer2, developer3];

      const lead1 = userFactory.createUser(
        "Luc",
        "Joosten",
        "test@gmail.com",
        "0649785015",
        [],
        ScrumRole.LEAD_DEVELOPER
      );
      const lead2 = userFactory.createUser(
        "Luc",
        "Joosten",
        "test@gmail.com",
        "0649785015",
        [],
        ScrumRole.LEAD_DEVELOPER
      );
      const lead3 = userFactory.createUser(
        "Luc",
        "Joosten",
        "test@gmail.com",
        "0649785015",
        [],
        ScrumRole.LEAD_DEVELOPER
      );
      const leadDevelopers: LeadDeveloper[] = [lead1, lead2, lead3];

      const tester1 = userFactory.createUser(
        "Luc",
        "Joosten",
        "test@gmail.com",
        "0649785015",
        [],
        ScrumRole.TESTER
      );
      const tester2 = userFactory.createUser(
        "Luc",
        "Joosten",
        "test@gmail.com",
        "0649785015",
        [],
        ScrumRole.TESTER
      );
      const tester3 = userFactory.createUser(
        "Luc",
        "Joosten",
        "test@gmail.com",
        "0649785015",
        [],
        ScrumRole.TESTER
      );

      const testers: Tester[] = [tester1, tester2, tester3];
      const team = TeamFactory.createTeam(
        "Testing Team SOA3",
        productOwner,
        scrumMaster,
        leadDevelopers,
        developers,
        testers
      );

      expect(team.name).toEqual("Testing Team SOA3");
      expect(team.productOwner).toEqual(productOwner);
      expect(team.scrumMaster).toEqual(scrumMaster);
      expect(team.leadDevelopers).toEqual(leadDevelopers);
      expect(team.developers).toEqual(developers);
      expect(team.testers).toEqual(testers);
    });
  });
});
