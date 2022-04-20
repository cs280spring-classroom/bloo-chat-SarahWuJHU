document.addEventListener("DOMContentLoaded", (_event) => {
  // Connect to socket.io
  const socket = io(); // automatically tries to connect on same port app was served from
  const username = document.getElementById("uname").innerText;
  socket.emit("log on", { name: username });
  const form = document.getElementById("chatForm");
  const messages = document.getElementById("messages");
  const messageToSend = document.getElementById("txt");
  const appName = "BlooChatApp";

  form.addEventListener("submit", (event) => {
    socket.emit("message", {
      user: username,
      message: messageToSend.value,
    });
    messageToSend.value = "";
    event.preventDefault();
  });

  // append the chat text message
  socket.on("message", (msg) => {
    createMessage(msg.user, msg.message, "text_normal", messages);
  });

  socket.on("log on", (usr) => {
    createMessage(appName, `${usr.name} joined the room`, "text_green", messages);
  });

  socket.on("log off", (usr) => {
    createMessage(appName, `${usr.name} left the room`, "text_red", messages);
  });

  socket.on("welcome", (welc) => {
    createMessage(appName, `Welcome ${welc.name}!`, "text_normal", messages);
    if (welc.users == false) {
      createMessage(appName, `Unfortunately no one is online at the moment 😔`, "text_normal", messages);
    } else {
      createMessage(appName, `Online users: ${welc.users}`, "text_normal", messages);
    }
  });
});

function createMessage(username, msg, text_class, messages) {
  const message = document.createElement("li");
  const user = document.createElement("span");
  const text = document.createElement("span");
  user.className = "user_badge";
  text.className = text_class;
  user.innerText = `${username}`;
  text.innerText = `${msg}`;
  //XSS vulnaribility
  message.appendChild(user);
  message.appendChild(text);
  messages.appendChild(message);
  messages.scrollTop = messages.scrollHeight;
}

