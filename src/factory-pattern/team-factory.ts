import RE2 from "re2";
import { RegEx } from "../models/enumerations";
import { Team } from "../models/team.model";
import {
  Developer,
  LeadDeveloper,
  ProductOwner,
  ScrumMaster,
  Tester,
} from "../models/user.model";

const regNames = new RE2(RegEx.TEAM_NAMES);

// TeamFactory class
export class TeamFactory {
  public static createTeam(
    name: string,
    productOwner?: ProductOwner,
    scrumMaster?: ScrumMaster,
    leadDevelopers?: LeadDeveloper[],
    developers?: Developer[],
    testers?: Tester[]
  ): Team {
    const team = new Team(name);

    console.warn("Paramater Developers" + developers);

    team.productOwner =
      productOwner &&
      !TeamFactory.validate(
        `${productOwner.getFirstName} ${productOwner.getLastName}`
      )
        ? productOwner
        : undefined;
    team.scrumMaster =
      scrumMaster &&
      !TeamFactory.validate(
        `${scrumMaster.getFirstName} ${scrumMaster.getLastName}`
      )
        ? scrumMaster
        : undefined;
    team.leadDevelopers =
      leadDevelopers &&
      leadDevelopers.filter((d) => {
        TeamFactory.validate(`${d.getFirstName} ${d.getLastName}`);
      })
        ? leadDevelopers
        : undefined;
    team.developers =
      developers &&
      developers.filter((d) => {
        TeamFactory.validate(`${d.getFirstName} ${d.getLastName}`);
      })
        ? developers
        : undefined;
    team.testers =
      testers &&
      testers.filter((d) => {
        TeamFactory.validate(`${d.getFirstName} ${d.getLastName}`);
      })
        ? testers
        : undefined;

    console.warn("Team Developers" + team.developers);

    return team;
  }

  private static validate(name: string): boolean {
    return regNames.test(name);
  }
}
