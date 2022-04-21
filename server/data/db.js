const mongoose = require("mongoose");

const URI = `mongodb+srv://blooadmin:Sarah0518$@bloo-chat.zndws.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

async function connect() {
  try {
    await mongoose.connect(URI);
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.log(err);
  }
}

module.exports = { connect };
