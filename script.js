const myLibrary = [];

function Book(title, author, pages) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
};

const addBookToLibrary = (title, author, pages) => {
    const book = new Book(title, author, pages);
    return myLibrary.push(book);
};

const removeBookFromLibrary = (id) => {
    let index = myLibrary.indexOf(id);

    return myLibrary.splice(0, 1, index);
}

console.log(addBookToLibrary('Test', 'Test', 100));