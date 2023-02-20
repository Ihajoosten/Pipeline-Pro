# TODO List

1. Define an interface for the NotificationAdapter that includes methods for sending messages via different channels (e.g. sendEmail, sendWhatsApp, sendSlack, sendSMS).

2. Implement concrete classes for each of the different channels that implement the NotificationAdapter interface and provide the necessary logic for sending messages via those channels.

3. Define a NotificationService class that uses the NotificationAdapter to send notifications in a unified way, regardless of the channel being used.

4. Write tests to ensure that the NotificationService can send messages via all of the supported channels.

# Summary

The adapter design pattern is used to convert the interface of one class into another interface that the client expects. In this case, we're using it to provide a unified interface for sending notifications via different channels, such as WhatsApp, email, Slack, or SMS. We achieve this by defining a NotificationAdapter interface that includes methods for sending messages via each of the supported channels, and then implementing concrete adapter classes for each of the channels. Finally, we use a NotificationService class that works with the NotificationAdapter interface to send notifications via any of the supported channels. This approach allows us to decouple the sending of notifications from the specific channel used, making it easier to add new channels or switch between them in the future.
