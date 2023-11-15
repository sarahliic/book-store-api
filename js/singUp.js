let signUp = document.querySelector("#signUp");
let username = document.querySelector(".username");
let email = document.querySelector(".email");
let password = document.querySelector(".password");
let confirmPassword = document.querySelector(".confirm-password");
let registerBtn = document.querySelector(".linkbtn");
let validation = document.querySelector(".validation");

// Events Listener
registerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // get input values
  let usernameValue = username.value;
  let emailValue = email.value;
  let passwordValue = password.value;
  let confirmPasswordValue = confirmPassword.value;

  let apiKey = "FZkzlEs3EzRFDvYVCvDrdjQATKMTTZaJ";

  fetch(
    `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${apiKey}`,
    {
      method: "POST",
      body: JSON.stringify({
        usernameValue,
        emailValue,
        passwordValue,
        confirmPasswordValue,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      // check registration
      if (!(usernameValue.length > 5)) {
        username.style.border = "1px solid red";
        validation.innerHTML =
          "Username length must be greater than 5 characters";
        validation.style.color = "red";
      } else if (!(passwordValue.length > 8)) {
        password.style.border = "1px solid red";
        validationp.innerHTML =
          "Password length must be greater than 8 characters";
        validationp.style.color = "red";
      } else if (confirmPasswordValue !== passwordValue) {
        confirmPassword.style.border = "1px solid red";
        validationcp.innerHTML = "Passwords did not match";
        validationcp.style.color = "red";
      } else {
        window.location.href = "singIn.html";
      }
    })
    .catch((error) => {
      console.error(error);
      // Handle any errors that occurred during the login process
    });
});
