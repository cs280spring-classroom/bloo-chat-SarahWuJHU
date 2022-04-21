const login = document.getElementById("login");
const register = document.getElementById("register");
login.addEventListener("click", logInClicked);
register.addEventListener("click", registerClicked);

async function logInClicked() {
  console.log("log in clicked");
}

async function registerClicked() {
  console.log("register clicked");
  const username = document.getElementById("usrnm").value;
  const password = document.getElementById("pswrd").value;
  
  const response = await fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password
    }),
  });

  console.log(response);
}

async function Register(event) {
  event.preventDefault();
  
  const role = "CLIENT";

  const response = await fetch("/register", {
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
