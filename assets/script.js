document.addEventListener("DOMContentLoaded", (_event) => {
  // Connect to socket.io
  const socket = io(); // automatically tries to connect on same port app was served from
  const username = document.getElementById("uname").innerText;
  socket.emit("log on", { name: username });
  const form = document.getElementById("chatForm");
  const messages = document.getElementById("messages");
  const messageToSend = document.getElementById("txt");
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
    const message = document.createElement("li");
    //XSS vulnaribility
    message.innerHTML = `<strong>${msg.user}</strong>: ${msg.message}`;
    placeText(messages, message);
  });

  socket.on("log on", (usr) => {
    const message = document.createElement("li");
    message.innerText = `${usr.name} joined the room`;
    placeText(messages, message);
  });

  socket.on("log off", (usr) => {
    const message = document.createElement("li");
    message.innerText = `${usr.name} left the room`;
    placeText(messages, message);
  });

  socket.on("welcome", (welc) =>{
    const message1 = document.createElement("li");
    message1.innerText = `Welcome ${welc.name}!`;
    placeText(messages, message1);
    const message2 = document.createElement("li");
    if(welc.users == false){
      message2.innerText = `Unfortunately no one is online at the moment 😔`;
    }else{
      message2.innerText = `Online users: ${welc.users}`;
    }
    placeText(messages, message2);
  })
});

function placeText(messages, message){
  messages.appendChild(message);
  messages.scrollTop = messages.scrollHeight;
}
