import { IObserver } from "../interfaces/IObserver";
import { MessagingServiceAdapter } from "../../adapter-pattern/message.adapter";
import { IMessage } from "../../adapter-pattern/interfaces/IMessage";

export class BacklogItemObserver implements IObserver {
    private messageService: MessagingServiceAdapter;
    constructor(messageService: MessagingServiceAdapter) {
        this.messageService = messageService;
    }
    update(message: IMessage): void {
        this.messageService.sendMessage(message);
    }
}