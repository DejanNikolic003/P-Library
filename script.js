const table = document.querySelector('#tbody');
const modal = document.getElementById('createBookModal');
const modalButton = document.getElementById('createBook');
const closeModalButton = document.getElementsByClassName('close')[0];

const addBookButton = document.querySelector('#saveBook');
const bookTitleEl = document.querySelector('#bookTitle');
const bookAuthorEl = document.querySelector('#bookAuthor');
const bookPagesEl = document.querySelector('#bookPages');


const myLibrary = [];

modalButton.addEventListener('click', function() {
    modal.style.display = 'block';
});

closeModalButton.addEventListener('click', function() {
    modal.style.display = 'none';
});


function Book(title, author, pages, isRead) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
};

Book.prototype.updateRead = function () {
    this.isRead = !this.isRead;
}

const addBookToLibrary = (title, author, pages, isRead) => {
    return myLibrary.push(new Book(title, author, pages, isRead));
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
        }
    });
}

const readBook = (bookId) => {
    const index = findBookIndex(bookId);

    if(index === -1) {
        myLibrary[index].updateRead();
    }
}

const showNotFoundError = () => {
    const tr = document.createElement('tr');
    tr.id = 'notFoundRow';
    const notFoundColumn = document.createElement('th');

    notFoundColumn.setAttribute('colspan', 4);
    notFoundColumn.style.textAlign = 'center';
    
    notFoundColumn.textContent = 'Books not found.';

    tr.appendChild(notFoundColumn);
    table.appendChild(tr);
    return;
}

const listBooks = () => {
    if(myLibrary.length > 0) {
        destroyOldRows();
    }

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
        const readButton = document.createElement('button');

        tableRow.dataset.bookId = book['id'];

        removeButton.textContent = 'Remove';
        removeButton.id = 'removeButton';
        removeButton.dataset.id = book['id'];

        readButton.textContent = 'Read';
        readButton.id = 'readButton';
        readButton.dataset.id = book['id'];

        titleColumn.textContent = book['title'];
        titleColumn.id = 'titleColumn';

        authorColumn.textContent = book['author'];
        authorColumn.id = 'authorColumn';

        pageColumn.textContent = book['pages'];
        pageColumn.id = 'pageColumn';

        buttonColumn.appendChild(removeButton);
        buttonColumn.appendChild(readButton);

        tableRow.appendChild(titleColumn);
        tableRow.appendChild(authorColumn);
        tableRow.appendChild(pageColumn);
        tableRow.appendChild(buttonColumn);

        table.appendChild(tableRow);
    });
}

const destroyOldRows = () => {
    const notFoundRow = document.querySelector('#notFoundRow');
    if(myLibrary.length > 0 && notFoundRow !== null) {
        notFoundRow.remove();
    }
    
    const existingTableRows = document.querySelectorAll('tr[data-book-id]');

    existingTableRows.forEach((row) => {
        row.remove();
    });
};

const handleButtons = () => {
    const readButtons = document.querySelectorAll('#readButton');
    const removeButtons = document.querySelectorAll('#removeButton');
        
    removeButtons.forEach((button) => {
        button.addEventListener('click', function() {
            removeBookFromLibrary(this.dataset.id);
        });
    });

    readButtons.forEach((button) => {
        button.addEventListener('click', function() {
            readBook(this.dataset.id);
        });
    });
};

const main = () => {
    listBooks();
    handleButtons();
}

addBookButton.addEventListener('click', function() {
    let bookTitle = bookTitleEl.value;
    let bookAuthor = bookAuthorEl.value;
    let bookPages = bookPagesEl.value;

    addBookToLibrary(bookTitle, bookAuthor, bookPages, false);
    main();

    bookTitleEl.value = '';
    bookAuthorEl.value = '';
    bookPagesEl.value = '';
    modal.style.display = 'none';
});


