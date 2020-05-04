class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}


class UI {
    addBookToList(book) {
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
        list.appendChild(row)
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

    showAlert(message, className) {
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
}

//Local Storage Class
class Store{
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static displayBooks() {
        const books = Store.getBooks();
        books.forEach(function(book){
            const ui = new UI();
            //Add book to UI
            ui.addBookToList(book);
        })

    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        console.log(isbn);
        const books = Store.getBooks();
        books.forEach(function(book,index) {
            if(book.isbn === isbn) {
                books.splice(index,1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));

    }
}

// Dom Load Evenet
document.addEventListener('DOMContentLoaded', Store.displayBooks);

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
    console.log(ui);

    //Validate
    if(title === '' || author === '' || isbn === '') {
        // Error alert
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        ui.addBookToList(book);
        //Add to local store
        Store.addBook(book);
        //Show success
        ui.showAlert('Book Added!', 'success');
        ui.clearFields();
    }

    e.preventDefault();
});

// Event Listener for delete
document.getElementById('book-list').addEventListener('click', function(e){
    const ui = new UI();
    ui.deleteBook(e.target);

    // Remove from local storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    //Show message
    ui.showAlert('Book Removed', 'success');
    e.preventDefault();
});