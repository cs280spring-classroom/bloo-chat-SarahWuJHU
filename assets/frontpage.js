const login = document.getElementById("login");
const register = document.getElementById("register");
login.addEventListener("click", logInClicked);
register.addEventListener("click", registerClicked);

async function logInClicked() {
  const username = document.getElementById("usrnm").value;
  const password = document.getElementById("pswrd").value;

  const response = await fetch("/authenticate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (response.status === 200) {
    location.href = `/chatroom?uname=${username}`;
  } else {
    alert("Wrong password or username, try again!");
  }
}

async function registerClicked() {
  const username = document.getElementById("usrnm").value;
  const password = document.getElementById("pswrd").value;

  const response = await fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (response.status === 201) {
    location.href = `/chatroom?uname=${username}`;
  } else {
    alert("Invalid password or username, try again!");
  }
}
