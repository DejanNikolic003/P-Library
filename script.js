const table = document.querySelector('#tbody');
const myLibrary = [];

function Book(title, author, pages, isRead) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
};

const addBookToLibrary = (title, author, pages, isRead) => {
    const book = new Book(title, author, pages, isRead);

    return myLibrary.push(book);
};

const findBookIndex = (bookId) => {
    return myLibrary.findIndex((book) => book.id === bookId);
}

const removeBookFromLibrary = (bookId) => {
    const index = findBookIndex(bookId);

    if(index !== -1) {
        myLibrary.splice(index, 1);
    }

    removeBookElement(bookId);
}

const removeBookElement = (bookId) => {
    if(myLibrary.length === 0) {
        showNotFoundError();
    }   
    
    const tableRows = document.querySelectorAll('tr');

    tableRows.forEach((row) => {
        if(row.dataset.bookId === bookId) {
            row.remove();
            console.log('delet?');
        }
    });
}

const showNotFoundError = () => {
    const tr = document.createElement('tr');
    const notFoundColumn = document.createElement('th');

    notFoundColumn.setAttribute('colspan', 4);
    notFoundColumn.style.textAlign = 'center';
    
    notFoundColumn.textContent = 'Books not found.';

    tr.appendChild(notFoundColumn);
    table.appendChild(tr);
    return;
}

const listBooks = () => {
    if(myLibrary.length === 0) {
        showNotFoundError();
    }   

    myLibrary.forEach((book) => {
        const tableRow = document.createElement('tr');
        const titleColumn = document.createElement('th');
        const authorColumn = document.createElement('th');
        const pageColumn = document.createElement('th');
        const buttonColumn = document.createElement('th');
        const removeButton = document.createElement('button');

        tableRow.dataset.bookId = book['id'];

        removeButton.textContent = 'Remove';
        removeButton.id = 'removeButton';
        removeButton.dataset.id = book['id'];

        titleColumn.textContent = book['title'];
        authorColumn.textContent = book['author'];
        pageColumn.textContent = book['pages'];

        buttonColumn.appendChild(removeButton);

        tableRow.appendChild(titleColumn);
        tableRow.appendChild(authorColumn);
        tableRow.appendChild(pageColumn);
        tableRow.appendChild(buttonColumn);

        table.appendChild(tableRow);
    });
    
}


const handleButtons = () => {
    const isReadedButtons = document.querySelectorAll('#readButton');
    const removeButtons = document.querySelectorAll('#removeButton');
        
    removeButtons.forEach((button) => {
        button.addEventListener('click', function() {
            removeBookFromLibrary(this.dataset.id);
        });
    });

};

addBookToLibrary('Test', 'Test', 200, false);
addBookToLibrary('Test2', 'Test2', 200, false);

listBooks();

handleButtons();