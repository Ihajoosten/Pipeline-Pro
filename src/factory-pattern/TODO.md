# TODO List

1. Create an abstract User class that defines common properties and methods for all types of users.
2. Create concrete classes for each type of user (developer, lead-developer, scrum-master, product-owner) that inherit from the User class and implement their specific behavior.
3. Create a Team class that contains a list of User objects and a name property.
4. Implement a TeamFactory class that can create new teams with the appropriate combination of users.
5. Update your application code to use the TeamFactory to create new teams and assign users to them.

# Summary

- The factory design pattern is used to create objects without exposing the creation logic to the client and to create objects of various types without creating a separate class for each type.

- In your case, you will create a factory class TeamFactory to create Team objects that are composed of different User objects.

- The User class will be an abstract class that defines common properties and methods for all users.

- Concrete classes (e.g. Developer, LeadDeveloper, ScrumMaster, and ProductOwner) will inherit from the User class and implement their specific behavior.

- The Team class will contain a list of User objects and a name property.

- The TeamFactory class will have methods to create teams with different combinations of User objects, based on the specified roles and number of team members.
