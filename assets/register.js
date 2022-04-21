const form = document.getElementById("registerForm");
form.addEventListener("submit", register);

async function register(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
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
