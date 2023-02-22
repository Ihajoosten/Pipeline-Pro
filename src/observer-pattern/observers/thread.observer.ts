import { IObserver } from "../interfaces/IObserver";
import { MessagingServiceAdapter } from "../../adapter-pattern/message.adapter";
import { ISubject } from "../interfaces/ISubject";
import { Thread } from "../../models/thread.model";

export class ThreadObserver implements IObserver {
    private messageService: MessagingServiceAdapter;
    constructor(messageService: MessagingServiceAdapter) {
        this.messageService = messageService;
    }
    update(subject: ISubject): void {
        const thread = subject as Thread;
        const backlogItem = thread.getBacklogItem();
        // const messages = thread.();
        
        // const message = `New message in Thread for Backlog Item ${backlogItem.getId()}: ${
        //   messages[messages.length - 1]
        // }`;
    
        // this.messageService.sendMessage({content: message});
    }
}