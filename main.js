let container = document.querySelector(".container");

let apiKey = "FZkzlEs3EzRFDvYVCvDrdjQATKMTTZaJ";

function bookStore() {
  fetch(
    `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      // console.log(data.results.books);
      data.results.books.map((item) => {
        return (item = container.insertAdjacentHTML(
          "afterbegin",
          `
          <div class="card" style="width: 18rem; margin-bottom: 1rem;  
          border: 1px solid #cac8c8;">
          <img src="${item.book_image}" class="card-img-top" alt="book_image">
          <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
          <p class="card-text">${item.description}</p>
          <a href="#" class="btn" style="background-color: pink; color: white">View</a>
          </div></div>
            `
        ));
      });
    });
}

// admin
// Callin Functions
bookStore();
