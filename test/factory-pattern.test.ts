import { User } from "../src/factory-pattern/models/abstract-user.model";
import { Team } from "../src/factory-pattern/models/team.model";
import { Developer, ScrumMaster, LeadDeveloper, ProductOwner } from "../src/factory-pattern/models/users.model";
import { TeamFactory } from "../src/factory-pattern/team-factory";
import { UserFactory } from "../src/factory-pattern/user-factory";

describe("User class", () => {
  test("User object has name, email, and role properties", () => {
    const user = new Developer("Luc Joosten", "lhajoost@avans.nl", "Developer");
    expect(user.name).toEqual("Luc Joosten");
    expect(user.email).toEqual("lhajoost@avans.nl");
    expect(user.role).toEqual("Developer");
  });

  test("getDescription returns a description of the user's role", () => {
    const user = new ScrumMaster("Jane Smith", "jane.smith@example.com", "ScrumMaster");
    expect(user.getDescription()).toEqual("I am a scrum master.");
  });

  test("Developer getDescription returns correct string", () => {
    const developer = new Developer("Luc Joosten", "lhajoost@avans.nl", "Developer");
    expect(developer.getDescription()).toEqual("I am a developer.");
  });

  test("LeadDeveloper getDescription returns correct string", () => {
    const leadDeveloper = new LeadDeveloper("Luc Joosten", "lhajoost@avans.nl", "LeadDeveloper");
    expect(leadDeveloper.getDescription()).toEqual("I am a lead developer.");
  });

  test("ScrumMaster getDescription returns correct string", () => {
    const scrumMaster = new ScrumMaster("Luc Joosten", "lhajoost@avans.nl", "ScrumMaster");
    expect(scrumMaster.getDescription()).toEqual("I am a scrum master.");
  });
});

describe("UserFactory class", () => {
  test("createUser returns a Developer object for role 'Developer'", () => {
    const user = UserFactory.createUser("Luc Joosten", "lhajoost@avans.nl", "Developer");
    expect(user).toBeInstanceOf(Developer);
    expect(user.name).toEqual("Luc Joosten");
    expect(user.email).toEqual("lhajoost@avans.nl");
    expect(user.role).toEqual("Developer");
  });

  test("createUser returns a LeadDeveloper object for role 'LeadDeveloper'", () => {
    const user = UserFactory.createUser("Luc Joosten", "lhajoost@avans.nl", "LeadDeveloper");
    expect(user).toBeInstanceOf(LeadDeveloper);
    expect(user.name).toEqual("Luc Joosten");
    expect(user.email).toEqual("lhajoost@avans.nl");
    expect(user.role).toEqual("LeadDeveloper");
  });

  test("createUser returns a ScrumMaster object for role 'ScrumMaster'", () => {
    const user = UserFactory.createUser("Luc Joosten", "lhajoost@avans.nl", "ScrumMaster");
    expect(user).toBeInstanceOf(ScrumMaster);
    expect(user.name).toEqual("Luc Joosten");
    expect(user.email).toEqual("lhajoost@avans.nl");
    expect(user.role).toEqual("ScrumMaster");
  });

  test("createUser returns a ProductOwner object for role 'ProductOwner'", () => {
    const user = UserFactory.createUser("Luc Joosten", "lhajoost@avans.nl", "ProductOwner");
    expect(user).toBeInstanceOf(ProductOwner);
    expect(user.name).toEqual("Luc Joosten");
    expect(user.email).toEqual("lhajoost@avans.nl");
    expect(user.role).toEqual("ProductOwner");
  });

  test("createUser throws an error for unknown roles", () => {
    expect(() => {
      UserFactory.createUser("Luc Joosten", "lhajoost@avans.nl", "UnknownRole");
    }).toThrow("Unknown role: UnknownRole");
  });
});

// describe("TeamFactory class", () => {
//   let user1: User;
//   let user2: User;
//   let user3: User;

//   beforeEach(() => {
//     user1 = UserFactory.createUser("John Doe", "john.doe@example.com", "Developer");
//     user2 = UserFactory.createUser("Jane Smith", "jane.smith@example.com", "LeadDeveloper");
//     user3 = UserFactory.createUser("Bob Johnson", "bob.johnson@example.com", "ScrumMaster");
//   });

//   test("createTeam creates a Team object with specified name and users", () => {
//     const team = TeamFactory.createTeam("Team A", [user1, user2, user3], 3);
//     expect(team).toBeInstanceOf(Team);
//     expect(team.name).toEqual("Team A");
//     expect(team.users).toEqual([user1, user2, user3]);
//   });

//   test("createTeam creates a Team object with default name and specified users", () => {
//     const team = TeamFactory.createTeamWithDefaultName([user1, user2, user3]);
//     expect(team).toBeInstanceOf(Team);
//     expect(team.name).toEqual("Team 1");
//     expect(team.users).toEqual([user1, user2, user3]);
//   });

//   test("createTeamWithDevelopers creates a Team object with specified number of developers", () => {
//     const team = TeamFactory.createTeamWithDevelopers(3);
//     expect(team).toBeInstanceOf(Team);
//     expect(team.users).toHaveLength(3);
//     team.users.forEach(user => {
//       expect(user).toBeInstanceOf(Developer);
//     });
//   });

//   test("createTeamWithLeadDeveloper creates a Team object with specified number of developers and 1 lead developer", () => {
//     const team = TeamFactory.createTeamWithLeadDeveloper(3);
//     expect(team).toBeInstanceOf(Team);
//     expect(team.users).toHaveLength(4);
//     const leadDeveloper = team.users.find(user => user instanceof LeadDeveloper);
//     expect(leadDeveloper).toBeTruthy();
//     team.users.forEach(user => {
//       if (user instanceof Developer) {
//         expect(user).toBeInstanceOf(Developer);
//       } else if (user instanceof LeadDeveloper) {
//         expect(user).toBeInstanceOf(LeadDeveloper);
//       }
//     });
//   });

//   test("createTeamWithScrumMaster creates a Team object with specified number of developers, 1 lead developer, and 1 scrum master", () => {
//     const team = TeamFactory.createTeamWithScrumMaster(3);
//     expect(team).toBeInstanceOf(Team);
//     expect(team.users).toHaveLength(5);
//     const scrumMaster = team.users.find(user => user instanceof ScrumMaster);
//     expect(scrumMaster).toBeTruthy();
//     const leadDeveloper = team.users.find(user => user instanceof LeadDeveloper);
//     expect(leadDeveloper).toBeTruthy();
//     team.users.forEach(user => {
//       if (user instanceof Developer) {
//         expect(user).toBeInstanceOf(Developer);
//       } else if (user instanceof LeadDeveloper) {
//         expect(user).toBeInstanceOf(LeadDeveloper);
//       } else if (user instanceof ScrumMaster) {
//         expect(user).toBeInstanceOf(ScrumMaster);
//       }
//     });
//   });
// });
