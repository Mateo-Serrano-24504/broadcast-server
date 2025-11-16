# Broadcast server

### Code organization

The code in this repository is organized in a _feature-based_ structure.
The folder `src`, that contains the source code, has a module for each
feature, in which the `index.ts` file exports the public interface of
the module.

The main `index.ts` is the entry point of the project, the `app.ts`
file builds up the _Express_ application, and the `server.ts` file
deploys the server given the app.

### Scope

In this project, I developed a broadcast server that would allow users to
join rooms and be notified when a new message arrives. Also, of course,
users can send messages to the room.
