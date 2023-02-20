# TODO List

1. Define the state interface for the backlog item, activity, and sprint.

2. Implement concrete classes for each state of the backlog item, activity, and sprint, and make sure they implement the state interface.

3. Define the Scrum class and ensure it has a reference to the current state of the project.

4. Define the actions that can be performed on backlog items, activities, and sprints in each state, and ensure they transition the object to the appropriate state.

5. Update the Scrum class to call the appropriate methods on its current state object.

# Summary

## Classes:

- BacklogItem: A class representing a product backlog item, which can be in different states.

- Activity: A class representing a task or work item that is associated with a backlog item, and can also be in different states.

- Sprint: A class representing a sprint, which can contain multiple backlog items and activities that need to be completed.

- Scrum: A class representing the overall Scrum project, which is composed of multiple sprints.

## State Design Pattern:

- Define an interface for the state, which will have methods for handling transitions between states and performing actions specific to each state.

- Implement concrete classes for each state of the backlog item, activity, and sprint. Each concrete state class should implement the state interface.

- Each concrete class should have a reference to the object it is responsible for, e.g. a backlog item should have a reference to its current state.
- The Scrum class should also have a reference to the current state of the project.
- The state classes should define the actions that can be performed on the object in their respective states, and should transition the object to the appropriate state when an action is completed.

- The Scrum class should call the appropriate methods on its current state object, depending on the current state of the project.
