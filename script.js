const bookGrid = document.querySelector('#bookGrid');
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
    const div = document.getElementById(bookId);
    div.remove();
}

const readBook = (bookId) => {
    let index = findBookIndex(bookId);

    if(index !== -1) {
        myLibrary[index]['isRead'] = true;
    }
}

const displayBooks = () => {
    for(let i = 0; i < myLibrary.length; i++) {
        const div = document.createElement('div');
        const bookName = document.createElement('span');
        const bookAuthor = document.createElement('span');
        const bookPages = document.createElement('span');
        const isReadedButton = document.createElement('button');
        const removeButton = document.createElement('button');
    

        div.classList.add('flex', 'flex-col', 'gap-2', 'p-2', 'bg-gray-100', 'rounded-md');
        div.id = myLibrary[i]['id'];


        isReadedButton.classList.add('bg-white', 'hover:bg-gray-100', 'text-gray-800', 'font-semibold', 'py-1', 'px-2', 'border', 'border-gray-400', 'rounded', 'shadow', 'cursor-pointer');
        isReadedButton.id = 'readButton';
        isReadedButton.dataset.bookId = myLibrary[i]['id'];

        removeButton.classList.add('bg-white', 'hover:bg-gray-100', 'text-gray-800', 'font-semibold', 'py-1', 'px-2', 'border', 'border-gray-400', 'rounded', 'shadow', 'cursor-pointer');
        removeButton.id = 'removeButton';
        removeButton.dataset.bookId = myLibrary[i]['id'];

        bookName.textContent = 'Title: ' + myLibrary[i]['title'];
        bookAuthor.textContent = 'Author: ' +  myLibrary[i]['author'];
        bookPages.textContent = 'Pages: ' + myLibrary[i]['pages'];
        isReadedButton.textContent = myLibrary[i]['isRead'] ? 'Readed' : 'Read';
        removeButton.textContent = 'Remove';

        div.appendChild(bookName);
        div.appendChild(bookAuthor);
        div.appendChild(bookPages);
        div.appendChild(isReadedButton);
        div.appendChild(removeButton);
        
        bookGrid.appendChild(div);
    }
}


const handleButtons = () => {
    const isReadedButtons = document.querySelectorAll('#readButton');
    const removeButtons = document.querySelectorAll('#removeButton');
        
    removeButtons.forEach((button) => {
        button.addEventListener('click', function() {
            removeBookFromLibrary(this.dataset.bookId);
            displayBooks();
        });
    });

    isReadedButtons.forEach((button) => {
        button.addEventListener('click', function() {
            readBook(this.dataset.bookId);
            displayBooks();
        });
    });
};

addBookToLibrary('Test', 'Test', 200, false);

console.dir(myLibrary);


displayBooks();

handleButtons();