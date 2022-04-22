[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=7644000&assignment_repo_type=AssignmentRepo)
# Homework 5: Bloo Chat!

A simple realtime messaging application build with Node, Express, and Socket.io.

After cloning the application, run `npm install` to install the dependencies. 

To run the application, use the command `npm run dev`.

Detailed instructions are at this [url](https://cs280spring.github.io/hw/hw5/index.html).

The application is deployed on [Heroku](https://bloo-chat-starter.herokuapp.com/).

On a high level, the app is divide into a server side and a client side.

On the server side, "index.js" is our main, it contains an express app that loads 
one njk for "/"(index.njk), and another one for "/chatroom"(chatroom.njk). "index.js" also 
have a io socket connection to interact with the client sockets that it is connected. 
"index.js" have a another route called "auth", providing two other endpoints: "/register" 
and "/authenticate", which uses mongoDB to register and authenticate the users. 

On the client side, "index.njk" is connected to "frontpage.js", which post request to 
"/register" and "/authenticate" for user inputs and direct to "/chatroom" with username 
once the user is either registered or authenticated. "chatroom.njk" is connected to 
"script.js". When the content of "chatroom.njk" is loaded, "script.js" establish a socket
connection with io emit the user's messages. 

App deployed at: https://bloo-chat-swu82.herokuapp.com/