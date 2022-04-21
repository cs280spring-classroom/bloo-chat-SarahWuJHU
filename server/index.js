const debug = require("debug")("bloo-chat");
const nunjucks = require("nunjucks");
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const UserDao = require("./data/UserDao");
const users = new UserDao();
const port = process.env.PORT || 7000;
const usrs = [];

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.use(express.static("assets"));

app.get("/", (req, res) => {
  res.render("index.njk", null);
});

app.get("/chatroom", (req, res) => {
  res.render("chatroom.njk", { uname: req.query.uname });
});

app.get("/login", (req, res) => {
  res.render("login.njk", null);
});

app.get("/register", (req, res) => {
  res.render("register.njk", null);
});

app.get("/api/register", async (req, res) => {
  const { username, role } = req.query;
  if (username && role) {
    res.status(400).json({
      message:
        "You must query the database based on either a username or user role.",
    });
  } else {
    const data = username
      ? await users.readOne(username)
      : await users.readAll(role);
    res.json({ data: data ? data : [] });
  }
});

app.post("/api/register", async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const data = await users.create({ username, password, role });
    res.status(201).json({ data });
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
});

io.on("connection", function (socket) {
  let theUsr;
  socket.on("log on", (usr) => {
    theUsr = usr.name;
    socket.broadcast.emit("log on", { name: theUsr });
    socket.emit("welcome", { name: theUsr, users: usrs });
    usrs.push(theUsr);
  });

  socket.on("message", (msg) => {
    debug(`${msg.user}: ${msg.message}`);
    //Broadcast the message to everyone
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    io.emit("log off", { name: theUsr });
    const index = usrs.indexOf(theUsr);
    if (index > -1) {
      usrs.splice(index, 1);
    }
  });
});

http.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});
