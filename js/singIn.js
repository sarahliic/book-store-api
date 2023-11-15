let username = document.querySelector(".username");
let password = document.querySelector(".password");
let loginBtn = document.querySelector(".linkbtn");
let validation = document.querySelector(".validation");
let section = document.querySelector(".section");

// create admin information and save it in the local storage
const admininfo = {
  usres: "admin",
  username: "sarah123",
  email: "sarahExample@gmail.come",
  password: "1lk#ytuf6SA$",
};

// Event Listener
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let usernameValue = username.value;
  let passwordValue = password.value;

  let apiKey = "FZkzlEs3EzRFDvYVCvDrdjQATKMTTZaJ";

  fetch(
    `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${apiKey}`,
    {
      method: "POST",
      body: JSON.stringify({
        usernameValue,
        passwordValue,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (
        usernameValue === admininfo.username &&
        passwordValue === admininfo.password
      ) {
        getAdminInfo();
      } else if (usernameValue.length > 5 && passwordValue.length > 8) {
        // Login successful, redirect to the desired page
        window.location.href = "index.html";
      } else {
        // Login failed, show error message
        validation.innerHTML = "Invalid username or password";
        validation.style.color = "red";
      }
    })
    .catch((error) => {
      console.error(error);
      // Handle any errors that occurred during the login process
    });
  //   getAdminInfo();
});

//=============================================================

// SET ADMIN INFO
function setAdminInfo() {
  window.localStorage.setItem(admininfo.usres, JSON.stringify(admininfo));
}
// Get Admin info and give it the privileges
function getAdminInfo() {
  console.log(window.localStorage.getItem(admininfo.usres));
  // api
  let apiKey = "FZkzlEs3EzRFDvYVCvDrdjQATKMTTZaJ";

  fetch(
    `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${apiKey}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data.results.books);
      data.results.books.map((item) => {
        section.innerHTML = "";
        let itemContainer = document.createElement("div");
        document.body.appendChild(itemContainer);
        itemContainer.insertAdjacentHTML(
          "afterbegin",
          `
            <div class="card" style="width: 18rem;">
              <img src="${item.book_image}" class="card-img-top" alt="book_image">
              <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
              <p class="card-text">${item.description}</p>
              <a href="#" class="btn btn-primary">View</a>
              <a href="#" class="btn btn-primary" onclick ="deleteItem(${item.rank})">Delete</a>
              </div></div>
        
              `
        );
        return (item = itemContainer);
      });
    });
}

// delete Item
function deleteItem(rank) {
  let apiKey = "FZkzlEs3EzRFDvYVCvDrdjQATKMTTZaJ";

  fetch(
    `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${apiKey}&rank=${rank}`,
    {
      method: "DELETE",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      container.innerHTML = "";
      console.log(`deleted item `);
      //   getAdminInfo();
    })
    .catch((error) => {
      console.log(error);
    });
}
//Calling function
// setAdminInfo();
// getAdminInfo();
