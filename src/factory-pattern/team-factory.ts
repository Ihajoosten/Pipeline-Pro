// import { User } from "../models/user/user.model";
// import { Team } from "../models/team.model";
// import { UserFactory } from "./user-factory";

// // TeamFactory class
// export class TeamFactory {
//   static createTeam(
//     teamName: string,
//     roles: string[],
//     numMembers: number
//   ): Team {
//     let users: User[] = [];
//     for (let i = 0; i < numMembers; i++) {
//       const role = roles[i % roles.length];
//       users.push(
//         UserFactory.createUser(`User ${i}`, `user${i}@example.com`, role)
//       );
//     }
//     return new Team(teamName);
//   }

//   // static createTeamWithDefaultName(userRoles: string[], numMembers: number): Team {
//   //   const users = userRoles.map((role) => UserFactory.createUser(role));
//   //   const team = new Team(`Team ${uuidv4()}`, users.slice(0, numMembers));
//   //   return team;
//   // }

//   // static createTeamWithDevelopers(numMembers: number): Team {
//   //   const users = Array.from({ length: numMembers }, () => UserFactory.createUser("Developer"));
//   //   const team = new Team(`Team ${uuidv4()}`, users);
//   //   return team;
//   // }

//   // static createTeamWithLeadDeveloper(numMembers: number): Team {
//   //   const lead = UserFactory.createUser("LeadDeveloper");
//   //   const developers = Array.from({ length: numMembers - 1 }, () => UserFactory.createUser("Developer"));
//   //   const users = [lead, ...developers];
//   //   const team = new Team(`Team ${uuidv4()}`, users);
//   //   return team;
//   // }

//   // static createTeamWithScrumMaster(numMembers: number): Team {
//   //   const scrumMaster = UserFactory.createUser("ScrumMaster");
//   //   const developers = Array.from({ length: numMembers - 1 }, () => UserFactory.createUser("Developer"));
//   //   const users = [scrumMaster, ...developers];
//   //   const team = new Team(`Team ${uuidv4()}`, users);
//   //   return team;
//   // }
// }
