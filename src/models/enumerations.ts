export enum NotificationType {
  SLACK = "Slack",
  EMAIL = "Email",
  DISCORD = "Discord",
  WHATSAPP = "Whatsapp",
}

export enum ScrumRole {
  PRODUCT_OWNER = "Product Owner",
  SCRUM_MASTER = "Scrum Master",
  DEVELOPER = "Developer",
  LEAD_DEVELOPER = "Lead Developer",
  TESTER = "Tester",
}

export enum SprintType {
  PLANNING = "Planning",
  DEVELOPMENT = "Development",
  TESTING = "Testing",
  DEPLOYMENT = "Deployment",
}

export enum RegEx {
  EMAIL = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
  PHONE_NUMBER = "^\\+?[0-9]{6,14}$",
  NAME = "^[a-zA-Z]{2,}$",
  TEAM_NAMES = "^[a-zA-Z0-9s]{1,50}$/",
}
