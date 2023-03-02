import { Branch, GitIntegration, Repository } from "../src/models/gitIntegration.model";


describe("The User can create Repository and work in it", () => {

  let repository: Repository
  beforeEach(() => {
    repository = new Repository();
  });

  it("User can create a new branch on the repository", () => {
    repository.createBranch("development");

    expect(repository.getBranches()).toHaveLength(2);

    let branch1: Branch = repository.getBranches()[0]
    let branch2: Branch = repository.getBranches()[1]
    expect(branch1.name).toEqual("master");
    expect(branch2.name).toEqual("development");
  });

  it("User can create a new Repository", () => {

    let repository = new Repository();

    expect(repository).toBeInstanceOf(Repository)

    repository.deleteBranch("master")
    expect(repository.getBranches()).toHaveLength(0);

    repository.createBranch("development");
    expect(repository.getBranches()).toHaveLength(1);
  });

  it("User calls commit()", () => {

    repository.commit("master", "initial commit", { name: "Luc Joosten", email: "luc@gmail.com" });

    let branch = repository.getBranch("master");

    expect(branch.commits).toHaveLength(1)
  });

  it("User calls push()", () => {

    repository.commit("master", "initial commit", { name: "Luc Joosten", email: "luc@gmail.com" });

    let branch = repository.getBranch("master");

    expect(branch.commits).toHaveLength(1)

    const mockFunction = jest.fn(repository.push);

    mockFunction(branch.name);

    expect(mockFunction).toBeCalled()
  });

  it("User calls pull()", () => {

    repository.commit("master", "initial commit", { name: "Luc Joosten", email: "luc@gmail.com" });

    let branch = repository.getBranch("master");

    expect(branch.commits).toHaveLength(1)

    const mockFunction = jest.fn(repository.pull);

    mockFunction(branch.name);

    expect(mockFunction).toBeCalled()
  });

  it("User calls fetch()", () => {

    repository.commit("master", "initial commit", { name: "Luc Joosten", email: "luc@gmail.com" });

    let branch = repository.getBranch("master");

    expect(branch.commits).toHaveLength(1)

    const mockFunction = jest.fn(repository.fetch);

    mockFunction(branch.name);

    expect(mockFunction).toBeCalled()
  });

  it("User merges development into master", () => {
    repository.createBranch("development");

    repository.commit("development", "initial commit", { name: "Luc Joosten", email: "luc@gmail.com" });
    repository.commit("development", "Second commit", { name: "Luc Joosten", email: "luc@gmail.com" });

    repository.commit("master", "initial commit", { name: "Luc Joosten", email: "luc@gmail.com" });

    let development: Branch = repository.getBranch("development");
    let master: Branch = repository.getBranch("master");

    expect(development.commits).toHaveLength(2)
    expect(repository.getBranches()).toHaveLength(2)

    repository.merge(development.name, master.name)

    expect(master.commits).toHaveLength(2);
    expect(development.commits).toHaveLength(2);
  });
});

describe("The User can utilize GitIntegration", () => {

  let git: GitIntegration
  let repository: Repository;
  beforeEach(() => {
    git = new GitIntegration();
    repository = new Repository();
  });

  it("User merges development into master", () => {
    git.createBranch("development")

    expect(git.getBranches()).toHaveLength(2);

    let branch1: Branch = git.getBranches()[0]
    let branch2: Branch = git.getBranches()[1]
    expect(branch1.name).toEqual("master");
    expect(branch2.name).toEqual("development");
  });

  it("User calls commit()", () => {

    git.commit("master", "initial commit", { name: "Luc Joosten", email: "luc@gmail.com" });

    let branch = git.getBranch("master");

    expect(branch.commits).toHaveLength(1)
  });

  it("User calls push()", () => {

    git.commit("master", "initial commit", { name: "Luc Joosten", email: "luc@gmail.com" });

    let branch = git.getBranch("master");

    expect(branch.commits).toHaveLength(1)

    const mockFunction = jest.fn(git.push);

    mockFunction(branch.name);

    expect(mockFunction).toBeCalled()
  });

  it("User calls pull()", () => {

    git.commit("master", "initial commit", { name: "Luc Joosten", email: "luc@gmail.com" });

    let branch = git.getBranch("master");

    expect(branch.commits).toHaveLength(1)

    const mockFunction = jest.fn(git.pull);

    mockFunction(branch.name);

    expect(mockFunction).toBeCalled()
  });

  it("User calls fetch()", () => {

    git.commit("master", "initial commit", { name: "Luc Joosten", email: "luc@gmail.com" });

    let branch = git.getBranch("master");

    expect(branch.commits).toHaveLength(1)

    const mockFunction = jest.fn(git.fetch);

    mockFunction(branch.name);

    expect(mockFunction).toBeCalled()
  });
});
