import {
  Developer,
  ScrumMaster,
  LeadDeveloper,
  ProductOwner,
} from "../src/models/users.model";
import { UserFactory } from "../src/factory-pattern/user-factory";

describe("User class", () => {
  it("User object has name, email, and role properties", () => {
    const user = new Developer("Luc Joosten", "lhajoost@avans.nl", "Developer");
    expect(user.name).toEqual("Luc Joosten");
    expect(user.email).toEqual("lhajoost@avans.nl");
    expect(user.role).toEqual("Developer");
  });

  it("getDescription returns a description of the user's role", () => {
    const user = new ScrumMaster(
      "Jane Smith",
      "jane.smith@example.com",
      "ScrumMaster"
    );
    expect(user.getDescription()).toEqual("I am a scrum master.");
  });

  it("Developer getDescription returns correct string", () => {
    const developer = new Developer(
      "Luc Joosten",
      "lhajoost@avans.nl",
      "Developer"
    );
    expect(developer.getDescription()).toEqual("I am a developer.");
  });

  it("LeadDeveloper getDescription returns correct string", () => {
    const leadDeveloper = new LeadDeveloper(
      "Luc Joosten",
      "lhajoost@avans.nl",
      "LeadDeveloper"
    );
    expect(leadDeveloper.getDescription()).toEqual("I am a lead developer.");
  });

  it("ScrumMaster getDescription returns correct string", () => {
    const scrumMaster = new ScrumMaster(
      "Luc Joosten",
      "lhajoost@avans.nl",
      "ScrumMaster"
    );
    expect(scrumMaster.getDescription()).toEqual("I am a scrum master.");
  });
});

describe("UserFactory class", () => {
  it("createUser returns a Developer object for role 'Developer'", () => {
    const user = UserFactory.createUser(
      "Luc Joosten",
      "lhajoost@avans.nl",
      "Developer"
    );
    expect(user).toBeInstanceOf(Developer);
    expect(user.name).toEqual("Luc Joosten");
    expect(user.email).toEqual("lhajoost@avans.nl");
    expect(user.role).toEqual("Developer");
  });

  it("createUser returns a LeadDeveloper object for role 'LeadDeveloper'", () => {
    const user = UserFactory.createUser(
      "Luc Joosten",
      "lhajoost@avans.nl",
      "LeadDeveloper"
    );
    expect(user).toBeInstanceOf(LeadDeveloper);
    expect(user.name).toEqual("Luc Joosten");
    expect(user.email).toEqual("lhajoost@avans.nl");
    expect(user.role).toEqual("LeadDeveloper");
  });

  it("createUser returns a ScrumMaster object for role 'ScrumMaster'", () => {
    const user = UserFactory.createUser(
      "Luc Joosten",
      "lhajoost@avans.nl",
      "ScrumMaster"
    );
    expect(user).toBeInstanceOf(ScrumMaster);
    expect(user.name).toEqual("Luc Joosten");
    expect(user.email).toEqual("lhajoost@avans.nl");
    expect(user.role).toEqual("ScrumMaster");
  });

  it("createUser returns a ProductOwner object for role 'ProductOwner'", () => {
    const user = UserFactory.createUser(
      "Luc Joosten",
      "lhajoost@avans.nl",
      "ProductOwner"
    );
    expect(user).toBeInstanceOf(ProductOwner);
    expect(user.name).toEqual("Luc Joosten");
    expect(user.email).toEqual("lhajoost@avans.nl");
    expect(user.role).toEqual("ProductOwner");
  });

  it("createUser throws an error for unknown roles", () => {
    expect(() => {
      UserFactory.createUser("Luc Joosten", "lhajoost@avans.nl", "UnknownRole");
    }).toThrow("Unknown role: UnknownRole");
  });
});
