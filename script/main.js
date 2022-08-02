/* eslint-disable max-classes-per-file */
const form = document.querySelector('form');
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}
class Storage {
  static domBooksListFromStorage() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBooksToStorage(book) {
    const books = Storage.domBooksListFromStorage();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBooksFromStorage(title) {
    const books = Storage.domBooksListFromStorage();

    books.forEach((book, i) => {
      if (book.title === title) {
        books.splice(i, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}
class BooksToDom {
  static displayBooksInDom() {
    const books = Storage.domBooksListFromStorage();

    books.forEach((book) => BooksToDom.domBooksList(book));
  }

  static domBooksList(book) {
    const tbody = document.querySelector('#tbody');
    const tableRow = document.createElement('tr');

    tableRow.innerHTML = `
    <td>${book.author}</td>
    <td>${book.title}</td>
    <td><a href="#" class='RemoveBtn'>Remove</a></td>
    `;
    tbody.appendChild(tableRow);
  }

  static deleteBook(el) {
    if (el.classList.contains('RemoveBtn')) {
      el.parentElement.parentElement.remove();
    }
  }

  static clearField() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
}

document.addEventListener('DOMContentLoaded', BooksToDom.displayBooksInDom);

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;

  const book = new Book(title, author);

  BooksToDom.domBooksList(book);

  Storage.addBooksToStorage(book);

  BooksToDom.clearField();
});

document.querySelector('#tbody').addEventListener('click', (e) => {
  BooksToDom.deleteBook(e.target);

  Storage.removeBooksFromStorage(
    e.target.parentElement.previousElementSibling.textContent,
  );
});
