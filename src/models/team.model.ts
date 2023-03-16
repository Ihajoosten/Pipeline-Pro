import {
  Developer,
  LeadDeveloper,
  ProductOwner,
  ScrumMaster,
  Tester,
} from "./user.model";

export class Team {
  public name: string;
  public productOwner?: ProductOwner;
  public scrumMaster?: ScrumMaster;
  public leadDevelopers?: Array<LeadDeveloper>;
  public developers?: Array<Developer>;
  public testers?: Array<Tester>;

  public constructor(name: string) {
    this.name = name;
  }
}
