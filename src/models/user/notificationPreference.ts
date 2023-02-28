export enum NotificationType {
    Discord = "Discord",
    Email = "Email",
    Slack = "Slack",
    Whatsapp = "Whatsapp"
}

export class NotificationPreference {
    constructor(public notificationType: NotificationType, public address: string) { }
}