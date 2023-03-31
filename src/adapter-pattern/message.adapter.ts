import { IMessage } from "./interfaces/IMessage";
import { IMessagingService } from "./interfaces/IMessagingService";
import { EmailService } from "./services/email.service";

export class EmailServiceAdapter implements IMessagingService {
  private _emailService: EmailService;

  constructor(emailService: EmailService) {
    this._emailService = emailService;
  }

  public sendMessage(message: IMessage): void {
    this._emailService.sendEmail({
      from: "pipe@line.pro",
      to: message.address,
      subject: "IMPORTANT EMAIL FROM PIPELINE-PRO",
      body: message.message
    })
  }
}
