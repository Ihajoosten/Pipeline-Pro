import { IEmail } from "../interfaces/IEmail";

export class EmailService {
  public sendEmail(email: IEmail): void {
    console.log(`Sending Email from ${email.from }to ${email.to}: ${email.subject} ----- ${email.body}`);
  }
}
