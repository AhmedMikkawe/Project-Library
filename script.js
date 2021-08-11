let booksLibrary = [];

function loadBooks() {
    if (localStorage.getItem('books') == null){
        localStorage.setItem("books", JSON.stringify(booksLibrary));
    }else{
        booksLibrary = JSON.parse(localStorage.getItem("books"));
        showBooks();
    }
}
function addBookToArray(array) {
        localStorage.setItem("books", JSON.stringify(array));
}
function showBooks() {
    const tableBody = document.querySelector('#tableBody');
    for (let i = 0; i <booksLibrary.length;i++){
        let book = booksLibrary[i];
        const tr = document.createElement("tr");
        tr.setAttribute('data-index',i);
        const tdTitle = document.createElement("td");
        const tdAuthor = document.createElement("td");
        const tdPages = document.createElement("td");
        const tdRead = document.createElement("td");
        const removeBtn = document.createElement('button');
        const editBtn = document.createElement('button');
        removeBtn.addEventListener('click',function () {
            removeBook(tr);
        });
        editBtn.addEventListener('click',function (){
            editBook(tr);
        });
        removeBtn.innerText="Remove";
        editBtn.innerText="Edit";

        tdTitle.innerText = book.title;
        tdAuthor.innerText = book.author;
        tdPages.innerText = book.pages;
        tdRead.innerText = book.read;
        tr.appendChild(tdTitle);
        tr.appendChild(tdAuthor);
        tr.appendChild(tdPages);
        tr.appendChild(tdRead);
        tr.appendChild(editBtn);
        tr.appendChild(removeBtn);
        tableBody.appendChild(tr)
    }
}
function reloadBooks(){
    const tableBody = document.querySelector('#tableBody');
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }
    showBooks();
}
class Book {
    constructor(title,author,pages,read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

function addBookToLibrary() {
    let title = document.querySelector('#bookTitle').value;
    let author = document.querySelector('#bookAuthor').value;
    let pages = document.querySelector('#bookPages').value;
    let readOrNot = document.querySelector('#bookRead').checked;
    if (title != ''&& pages != ''){
        let newBook = new Book(title,author,pages,readOrNot);
        let existsBook = booksLibrary.find(function(book, index) {
            if(book.title == newBook.title)
                return true;
        });
        if (existsBook){
            alert("Book Already Exists");
        }else{
            booksLibrary.push(newBook);
            addBookToArray(booksLibrary);
            reloadBooks();
            document.querySelector('#bookTitle').value = '';
            document.querySelector('#bookAuthor').value = '';
            document.querySelector('#bookPages').value = '';
            document.querySelector('#bookRead').checked = false;
        }
    }else{
        alert("title and number of pages can't be empty");
    }
}
function removeBook(tr){
    for (let i =0 ; i < booksLibrary.length; i++){
        if (i == tr.getAttribute('data-index')){
            booksLibrary.splice(i,1);
            addBookToArray(booksLibrary)
            reloadBooks();
        }
    }
}
function editBook(tr){
    for (let i =0 ; i < booksLibrary.length; i++){
        let book = booksLibrary[i];
        if (i == tr.getAttribute('data-index')){
            if (book.read == false){
                book.read = true;
            }else{
                book.read = false;
            }
            addBookToArray(booksLibrary);
            reloadBooks();
        }
    }
}
document.querySelector('#newBook').addEventListener('click',()=>{
    if (document.querySelector('#newBook').innerText == 'New Book'){
        document.querySelector('#form').classList.remove('hidden');
        document.querySelector('#newBook').innerText = 'X'
    }else{
        document.querySelector('#form').classList.add('hidden');
        document.querySelector('#newBook').innerText = 'New Book';
    }
});
document.querySelector('#addBook').addEventListener('click',addBookToLibrary);
loadBooks();