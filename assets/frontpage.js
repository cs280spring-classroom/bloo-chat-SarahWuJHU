const username = document.getElementById("usrnm");
const password = document.getElementById("pswrd");
const login = document.getElementById("login");
const register = document.getElementById("register");
login.addEventListener("click", logInClicked);
register.addEventListener("click", registerClicked);

function logInClicked() {
  console.log("log in clicked");
}

function registerClicked() {
  console.log("register clicked");
}

async function Register(event) {
  event.preventDefault();
  
  const role = "CLIENT";

  const response = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
      role
    }),
  });

  console.log(response);
}
