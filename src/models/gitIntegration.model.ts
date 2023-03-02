export interface Commit {
  hash: string;
  message: string;
  author: {
    name: string;
    email: string;
    date: Date;
  };
}

export interface Branch {
  name: string;
  commits: Commit[];
}

export class Repository {
  private branches: Branch[] = [{ name: 'master', commits: [] }];

  public createBranch(branchName: string): Branch {
    const newBranch: Branch = { name: branchName, commits: [] };
    this.branches.push(newBranch);
    return newBranch;
  }

  public deleteBranch(branchName: string): void {
    this.branches = this.branches.filter(branch => branch.name !== branchName);
  }

  public getBranch(branchName: string): Branch {
    const branch = this.branches.find(branch => branch.name === branchName);
    if (!branch) {
      throw new Error(`Branch ${branchName} not found`);
    }
    return branch;
  }

  public getBranches(): Branch[] {
    return this.branches;
  }

  public commit(branchName: string, message: string, author: { name: string, email: string }): void {
    const branch = this.getBranch(branchName);
    const lastCommit = branch.commits.length > 0 ? branch.commits[0] : null;
    const newCommit: Commit = {
      hash: lastCommit ? `hash-${lastCommit.hash.slice(0, 7)}-${branch.commits.length + 1}` : `hash-0000001-${branch.commits.length + 1}`,
      message,
      author: {
        name: author.name,
        email: author.email,
        date: new Date(),
      }
    };
    branch.commits.unshift(newCommit);
  }

  public merge(fromBranchName: string, toBranchName: string): void {

    const fromBranch = this.getBranch(fromBranchName);
    const toBranch = this.getBranch(toBranchName);
    const lastCommitFrom = fromBranch.commits[0];
    const lastCommitTo = toBranch.commits[0];
    if (lastCommitFrom.hash === lastCommitTo.hash) {
      throw new Error(`Branches ${fromBranchName} and ${toBranchName} are already up-to-date`);
    }
    const newCommit: Commit = {
      hash: `hash-0000001-${toBranch.commits.length + 1}`,
      message: `Merge branch '${fromBranchName}' into ${toBranchName}`,
      author: {
        name: lastCommitFrom.author.name,
        email: lastCommitFrom.author.email,
        date: new Date(),
      },
    };
    toBranch.commits.unshift(newCommit);
  }

  public push(branchName: string) {
    console.log("Pushing local branche " + branchName + " to remote")
  }

  public pull(branchName: string) {
    console.log("Pulling remote branche " + branchName + " to local")
  }

  public fetch(branchName: string) {
    console.log("Fetching remote branche " + branchName + " to local")
  }
}

export class GitIntegration {
  private repository: Repository;

  constructor() {
    this.repository = new Repository();
  }

  public createBranch(branchName: string): Branch {
    return this.repository.createBranch(branchName);
  }

  public deleteBranch(branchName: string): void {
    this.repository.deleteBranch(branchName);
  }

  public getBranch(branchName: string): Branch {
    return this.repository.getBranch(branchName);
  }

  public getBranches(): Branch[] {
    return this.repository.getBranches();
  }

  public commit(branchName: string, message: string, author: { name: string, email: string }): void {
    this.repository.commit(branchName, message, author);
  }

  public merge(fromBranchName: string, toBranchName: string): void {
    this.repository.merge(fromBranchName, toBranchName);
  }

  public push(branchName: string): void {
    this.repository.push(branchName);
  }
  public pull(branchName: string): void {
    this.repository.push(branchName);
  }
  public fetch(branchName: string): void {
    this.repository.push(branchName);
  }
}
