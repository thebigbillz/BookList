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
  static deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, type) {
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

  static clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }

  static addBookToList(book) {
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

//Local Storage
class Store {
  static getBooks() {
    let books;
    if (!localStorage.getItem("books")) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static displayBooks() {
    document.getElementById("book-list").innerHTML = "";
    let books = this.getBooks();
    books.forEach((book) => {
      UI.addBookToList(book);
    });
  }

  static addBook(book) {
    let books = this.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
    UI.clearFields();
    UI.showAlert("Book Added!", "success");
  }

  static removeBook(title) {
    let books = this.getBooks();
    books = books.filter((book) => {
      return book.title != title;
    });
    localStorage.setItem("books", JSON.stringify(books));
    UI.clearFields();
    UI.showAlert("Book Removed!", "success");
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
  //const ui = new UI();

  //Validate
  if (!(title || author || isbn)) {
    // Alert
    UI.showAlert("Supply all Fields", "error");
  } else {
    // Add Book
    console.log(book);
    Store.addBook(book);
    Store.displayBooks();
  }

  e.preventDefault();
});

// Event Listner for Delete
document.getElementById("book-list").addEventListener("click", function (e) {
  //const ui = new UI();

  Store.removeBook(
    e.target.parentElement.parentElement.firstElementChild.innerText
  );
  Store.displayBooks();

  e.preventDefault();
});
