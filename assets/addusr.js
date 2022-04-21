import UserDao from "../server/data/UserDao";
const users = new UserDao();

const form = document.getElementById("loginForm");
const username = document.getElementById("usrnm");
const password = document.getElementById("pswrd");
const user = document.getElementById("uname");
const role = "CLIENT";

form.addEventListener("submit", (event) => {
  try {
    const data = await users.create({ username, password, role});
    user.innerText = data.username;
    location.href = "/chatroom";
} catch (err) {
    password.value = "";
    username.value = "";
    location.href = "/login";
}
  event.preventDefault();
});
