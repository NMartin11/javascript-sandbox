// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}


// UI Constructor
function UI() {}

// add book to list
UI.prototype.addBookToList = function(book) {
    const list = document.getElementById('book-list');

    //Create tr elment
    const row = document.createElement('tr');

    //insert calls
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;
    list.appendChild(row);
}

//Show Alert
UI.prototype.showAlert = function(message, className){
    // Create Div
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    //add text
    div.appendChild(document.createTextNode(message));

    // get parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    //Insert Alert
    container.insertBefore(div, form);

    // time out after 3 seconds
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);
}

// Clear Fields
UI.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

//Delete Book
UI.prototype.deleteBook = function(target) {
    if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

// Event Listeners for add book
document.getElementById('book-form').addEventListener('submit', function(e){

    //Get Form Values
    const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

    // Instantiate book
    const book = new Book(title, author, isbn);

    //Instatiate UI
    const ui= new UI();

    //Validate
    if(title === '' || author === '' || isbn === '') {
        // Error alert
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        ui.addBookToList(book);
        //Show success
        ui.showAlert('Book Added!', 'success');
        ui.clearFields();
    }

    e.preventDefault();
});

// Event Listenor for delete
document.getElementById('book-list').addEventListener('click', function(e){
    const ui = new UI();
    ui.deleteBook(e.target);

    //Show message
    ui.showAlert('Book Removed', 'success');
    e.preventDefault();
});




    
