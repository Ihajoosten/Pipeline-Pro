import { Branch, Repository } from "../src/models/repository";

describe("The user should be able to create a repository and work in it.", () => {
  let repository: Repository;
  const master = "master";
  const development = "development";
  const message = "initial commit";
  const author = { name: "Luc Joosten", email: "luc@gmail.com" };

  beforeEach(() => {
    repository = new Repository();
  });

  it("should create a new branch", () => {
    repository.createBranch(development);
    const developmentBranch: Branch = repository.getBranches()[1];

    expect(repository.getBranches()).toHaveLength(2);
    expect(developmentBranch.name).toEqual(development);
  });

  it("should delete a branch", () => {
    repository.createBranch(development);
    repository.deleteBranch(development);

    expect(repository.getBranches()).toHaveLength(1);
  });

  it("should throw an error when deleting the last branch", () => {
    expect(() => {
      repository.deleteBranch(master);
    }).toThrowError();
  });

  it("should throw an error when requesting an unexisting branch", () => {
    expect(() => {
      repository.getBranch("");
    }).toThrowError();
  });

  it("should add a new commit to a branch", () => {
    repository.commit(master, message, author);
    const commit = repository.getBranch(master).commits[0];

    expect(commit.message).toBe(message);
    expect(commit.author.name).toBe(author.name);
    expect(commit.author.email).toBe(author.email);
  });

  it("should merge a branch into another branch", () => {
    repository.commit(master, message, author);
    repository.createBranch(development);
    repository.commit(development, message, author);
    repository.commit(development, "second commit", author);
    repository.merge(development, master);

    const masterBranch: Branch = repository.getBranch(master);
    expect(masterBranch.commits).toHaveLength(2);
  });

  it("should not merge an already merged branch into another branch", () => {
    repository.commit(master, message, author);
    repository.createBranch(development);
    repository.commit(development, message, author);
    repository.commit(development, "second commit", author);
    repository.merge(development, master);

    expect(() => {
      repository.merge(development, master);
    }).toThrowError();
  });
});
