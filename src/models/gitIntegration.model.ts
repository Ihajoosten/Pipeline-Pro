export class GitIntegration {
  constructor() {
    //
  }

  public commit(branch: string): void {
    console.log(`Commited the changes to ${branch}.`);
  }

  public push(): void {
    console.log("Pushed the changes to Git.");
  }

  public pull(): void {
    console.log("Pulled the latest version from Git.");
  }

  public newBranch(branch: string): void {
    console.log(`Added a new branch: ${branch}.`);
  }

  public switchBranch(branch: string): void {
    console.log(`Switched to branch ${branch}.`);
  }

  public stashChanges(): void {
    console.log("Stashed the changes");
  }

  public deleteChanges(): void {
    console.log("Deleted the changes.");
  }

  // public commitAndPushToMaster(): void {

  // }

  // public commitAndPushToMasterFail(): void {

  // }
}
