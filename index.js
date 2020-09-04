// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI Constructor
function UI() {}

UI.prototype.addBookToList = function (book) {
  const bookList = document.getElementById("book-list");
  // Create Row Element
  const bookItem = document.createElement("tr");
  // Add Book
  bookItem.innerHTML = `   <td> ${book.title} </td>
  <td> ${book.author} </td>
  <td> ${book.isbn} </td> `;
  bookList.appendChild(bookItem);
};

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

  // Add Book
  ui.addBookToList(book);

  e.preventDefault();
});
