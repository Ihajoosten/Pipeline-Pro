import { Activity } from "./activity.model";
import { BacklogItem } from "./backlogItem.model";
import { Sprint } from "./sprint.model";

export interface Commit {
  hash: string;
  message: string;
  author: {
    name: string;
    email: string;
    date: Date;
  };
  sprint?: Sprint;
  activity?: BacklogItem | Activity;
}

export interface Branch {
  name: string;
  commits: Commit[];
}

export class Repository {
  private branches: Branch[] = [{ name: "master", commits: [] }];

  public createBranch(branchName: string): Branch {
    const newBranch: Branch = { name: branchName, commits: [] };
    this.branches.push(newBranch);
    return newBranch;
  }

  public deleteBranch(branchName: string): void {
    if (this.branches.length == 1) {
      throw new Error("Atleast 1 branch is required!");
    }
    this.branches = this.branches.filter(
      (branch) => branch.name !== branchName
    );
  }

  public getBranch(branchName: string): Branch {
    const branch = this.branches.find((branch) => branch.name === branchName);
    if (!branch) {
      throw new Error(`Branch ${branchName} not found!`);
    }
    return branch;
  }

  public getBranches(): Branch[] {
    return this.branches;
  }

  public commit(
    branchName: string,
    message: string,
    author: { name: string; email: string },
    sprint?: Sprint,
    activity?: BacklogItem | Activity
  ): void {
    const branch = this.getBranch(branchName);
    const lastCommit = branch.commits.length > 0 ? branch.commits[0] : null;
    const newCommit: Commit = {
      hash: lastCommit
        ? `hash-${lastCommit.hash.slice(5, 12)}-${branch.commits.length + 1}`
        : `hash-0000001-${branch.commits.length + 1}`,
      message,
      author: {
        name: author.name,
        email: author.email,
        date: new Date(),
      },
      sprint,
      activity
    };
    branch.commits.unshift(newCommit);
  }

  public merge(fromBranchName: string, toBranchName: string): void {
    const fromBranch = this.getBranch(fromBranchName);
    const toBranch = this.getBranch(toBranchName);
    const lastCommitFrom = fromBranch.commits[0];
    const lastCommitTo = toBranch.commits[0];
    if (lastCommitFrom.hash === lastCommitTo.hash) {
      throw new Error(
        `Branches ${fromBranchName} and ${toBranchName} are already up-to-date!`
      );
    }
    const newCommit: Commit = {
      hash: `hash-0000001-${toBranch.commits.length + 1}`,
      message: `Merge branch '${fromBranchName}' into ${toBranchName}.`,
      author: {
        name: lastCommitFrom.author.name,
        email: lastCommitFrom.author.email,
        date: new Date(),
      },
    };
    toBranch.commits.unshift(newCommit);
  }

  public push(branchName: string): void {
    console.log(`Pushing local branch ${branchName} to remote.`);
  }

  public pull(branchName: string): void {
    console.log(`Pulling remote branch ${branchName} to local.`);
  }

  public fetch(branchName: string): void {
    console.log(`Fetching remote branch ${branchName} to local.`);
  }
}
