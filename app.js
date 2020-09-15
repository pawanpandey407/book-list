// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn =  isbn;
}

// UI Constructor
function UI() {}

// Add Book to the List
UI.prototype.addBookToList = function(book) {
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

// Show Alert
UI.prototype.showAlert = function(message, className) {
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

// Delete Book
UI.prototype.deleteBook = function(target) {
  
  target.parentElement.parentElement.remove();

}

// Clear Fields
UI.prototype.clearFields = function() {
document.getElementById('title').value = '';
document.getElementById('author').value = '';
document.getElementById('isbn').value = '';
}


// add book event Listeners
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
    // Add book to list
    ui.addBookToList(book);

    // Success alert
    ui.showAlert('Successfully added a book !!', 'success');

    // Clear Fields
    ui.clearFields();
  }
  e.preventDefault();
});

// delete event listener
document.getElementById('book-list').addEventListener('click', function(e){

  // Instantiate UI
  const ui = new UI();

    if(e.target.className === 'delete') {
  
      // Delete book
      e.target.parentElement.parentElement.remove()

      // Success alert
      ui.showAlert('Successfully deleted a book !!', 'success');
  }

  e.preventDefault();
});

