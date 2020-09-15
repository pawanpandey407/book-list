// Book Class
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI class
class UI {

  addBookToList(book) {

    const list = document.getElementById('book-list');

    // Create a tr element
    const row = document.createElement('tr');

    // Insert columns
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;

    // Append child
    list.appendChild(row);
  }

  showAlert(message, className) {

    // Create div elements
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.container');
    // Get form
    const form = document.querySelector('#book-form');
    // Insert alert
    container.insertBefore(div, form);
    // Disappear message after 3 sec
    setTimeout(function() {
      document.querySelector('.alert').remove();
    }, 3000);
  }

  deleteBook(target) {

    if(target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }

  }

  clearFields() {

    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

// Local Storage Class
class Store {

  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    }else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function(book) {
      const ui = new UI;

      // Add book to UI
      ui.addBookToList(book);
    })

  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook() {
    const books = Store.getBooks();

    books.forEach(function(book, index) {
      if(book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));

  }
}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Add book event Listeners
document.getElementById('book-form').addEventListener('submit', function(e) {

  // Get Form Values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
  
  // Instantiate book
  const book = new Book(title, author, isbn);
  
  // Instantiate UI
  const ui = new UI();
  
    // Validate 
    if(title === '' || author === '' || isbn === '') {
      // Error alert
      ui.showAlert('Please provide more information !!', 'error');
  
    }else {
      // Add books to list
      ui.addBookToList(book);

      // Add books to storage
      Store.addBook(book);
  
      // Success alert
      ui.showAlert('Successfully added a book !!', 'success');
  
      // Clear Fields
      ui.clearFields();
    }
    e.preventDefault();
  });
  
  // Delete book event listener
  document.getElementById('book-list').addEventListener('click', function(e){
  
    // Instantiate UI
    const ui = new UI();
  
    // Delete book
    ui.deleteBook(e.target);
  
    if(e.target.className === 'delete') {
      // Remove book from local storage
      Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
      // Success alert
      ui.showAlert('Successfully deleted a book !!', 'success');
    }
  
    e.preventDefault();
  });