// Book Class
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

//UI Class
class UI {
  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }

  showAlert(message, type) {
    //Create Alert
    const alert = document.createElement("div");
    // Add message
    alert.innerText = message;
    //Add Style
    alert.className = `alert ${type}`;
    //Add to Dom
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(alert, form);

    //Remove
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }

  addBookToList(book) {
    const bookList = document.getElementById("book-list");
    // Create Row Element
    const bookItem = document.createElement("tr");
    // Add Book
    bookItem.innerHTML = `   <td> ${book.title} </td>
    <td> ${book.author} </td>
    <td> ${book.isbn} </td>
    <td><a href= "#" class="delete">x</a></td> `;
    bookList.appendChild(bookItem);
  }
}

// Event Listeners
document.getElementById("book-form").addEventListener("submit", function (e) {
  /// Get Form Values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;
  // Instantiate book
  const book = new Book(title, author, isbn);

  //Instantiate UI
  const ui = new UI();

  //Validate
  if (!(title || author || isbn)) {
    // Alert
    ui.showAlert("Supply all Fields", "error");
  } else {
    // Add Book
    ui.addBookToList(book);
    ui.clearFields();
    // Alert
    ui.showAlert("Book Added!", "success");
  }

  e.preventDefault();
});

// Event Listner for Delete
document.getElementById("book-list").addEventListener("click", function (e) {
  const ui = new UI();

  ui.deleteBook(e.target);
  ui.showAlert("Book Deleted", "success");

  e.preventDefault();
});
