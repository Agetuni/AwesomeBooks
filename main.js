let bookList = new Array();
getBooks()
displayBooks();
const form = document.querySelector(".addBook");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const deleteBook = document.querySelectorAll('.deleteBook');
form.addEventListener("submit", addBook);
deleteBook.forEach(element => {
    element.addEventListener('click', function(){
        var title= this.dataset.title;
        var remove =bookList.filter(b=>b.title !== title);
        localStorage.setItem("books", JSON.stringify(remove));
       location.reload();
       
    });
});
function addBook(e) {
  let book = {
    title: titleInput.value,
    author: authorInput.value,
  };
  bookList.push(book);
  localStorage.setItem("books", JSON.stringify(bookList));
  e.preventDefault();
  location.reload();
}
function getBooks() {
  var books = JSON.parse(localStorage.getItem("books"));
  if (books !== null) {
    bookList = books;
  }
}
function displayBooks() {
    const bookElement = document.querySelector("#books");
  if (bookList.length !== 0) {
    booksHtml = "";
    for (const book of bookList) {
      booksHtml +=
        "<p>" +
        book.title +
        "</p> <p>" +
        book.author +
        '</p><button data-title='+book.title+' class="deleteBook">Remove</button> <hr>';
    }
    bookElement.innerHTML = booksHtml; 
   
  }
}