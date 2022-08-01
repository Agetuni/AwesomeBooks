let bookList = [];
const form = document.querySelector('.addBook');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
function getBooks() {
  const books = JSON.parse(localStorage.getItem('books'));
  if (books !== null) {
    bookList = books;
  }
}
function displayBooks() {
  const bookElement = document.querySelector('#books');
  let booksHtml = '';
  if (bookList.length !== 0) {
    bookList.forEach((book) => {
      booksHtml += `<p>${book.title}</p> <p>${book.author}</p><button data-title=${book.title} class="deleteBook">Remove</button> <hr>`;
    });
    bookElement.innerHTML = booksHtml;
    const deleteBook = document.querySelectorAll('.deleteBook');
    deleteBook.forEach((element) => {
      element.addEventListener('click', function deleteBook() {
        const { title } = this.dataset;
        const remove = bookList.filter((b) => b.title !== title);
        localStorage.setItem('books', JSON.stringify(remove));
        getBooks();
        displayBooks();
      });
    });
  } else {
    bookElement.innerHTML = '';
  }
}
function addBook(e) {
  const book = {
    title: titleInput.value,
    author: authorInput.value,
  };
  bookList.push(book);
  localStorage.setItem('books', JSON.stringify(bookList));
  e.preventDefault();
  titleInput.value = '';
  authorInput.value = '';
  displayBooks();
}

getBooks();
displayBooks();

form.addEventListener('submit', addBook);
