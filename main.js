document.addEventListener("DOMContentLoaded", () => {
    loadFromLocalStorage(); 
    renderBooks(); 
  });

let books = [];

const saveToLocalStorage = () => {
    localStorage.setItem("books", JSON.stringify(books));
  };
  
  const loadFromLocalStorage = () => {
    const storedBooks = localStorage.getItem("books");
    if (storedBooks) {
      books = JSON.parse(storedBooks);
    }
  };  

const generateId = () => +new Date();
const findBookById = (id) => books.find((book) => book.id === id);
const findBookIndexById = (id) => books.findIndex((book) => book.id === id);

const renderBooks = () => {
  const incompleteBookList = document.getElementById("incompleteBookList");
  const completeBookList = document.getElementById("completeBookList");

  incompleteBookList.innerHTML = "";
  completeBookList.innerHTML = "";

  books.forEach((book) => {
    const bookElement = document.createElement("div");
    bookElement.className = "p-3 mb-3";
    bookElement.setAttribute("data-bookid", book.id);
    bookElement.setAttribute("data-testid", "bookItem");

    bookElement.innerHTML = `
      <h3 data-testid="bookItemTitle">${book.title}</h3>
      <p data-testid="bookItemAuthor"><strong>Penulis:</strong> ${book.author}</p>
      <p data-testid="bookItemYear"><strong>Tahun:</strong> ${book.year}</p>
      <div>
        <button class="btn btn-success" data-testid="bookItemIsCompleteButton">
          ${book.isComplete ? "Belum selesai dibaca" : "Selesai dibaca"}
        </button>
        <button class="btn btn-danger" data-testid="bookItemDeleteButton">Hapus Buku</button>
        <button class="btn btn-warning" data-testid="bookItemEditButton">Edit Buku</button>
      </div>
    `;

    const isCompleteButton = bookElement.querySelector(
      '[data-testid="bookItemIsCompleteButton"]'
    );
    isCompleteButton.addEventListener("click", () => toggleBookStatus(book.id));

    const deleteButton = bookElement.querySelector(
      '[data-testid="bookItemDeleteButton"]'
    );
    deleteButton.addEventListener("click", () => deleteBook(book.id));

    const editButton = bookElement.querySelector(
      '[data-testid="bookItemEditButton"]'
    );
    editButton.addEventListener("click", () => editBook(book.id));

    if (book.isComplete) {
      completeBookList.appendChild(bookElement);
    } else {
      incompleteBookList.appendChild(bookElement);
    }
  });
};

const addBook = (title, author, year, isComplete) => {
  const newBook = {
    id: generateId(),
    title,
    author,
    year: parseInt(year, 10),
    isComplete,
  };
  books.push(newBook);
  saveToLocalStorage();
  renderBooks();
};

const toggleBookStatus = (id) => {
  const book = findBookById(id);
  if (book) {
    book.isComplete = !book.isComplete;
    saveToLocalStorage();
    renderBooks();
  }
};

const deleteBook = (id) => {
  const index = findBookIndexById(id);
  if (index !== -1) {
    books.splice(index, 1);
    saveToLocalStorage();
    renderBooks();
  }
};

const editBook = (id) => {
  const book = findBookById(id);
  if (book) {
    const newTitle = prompt("Masukkan judul baru:", book.title) || book.title;
    const newAuthor = prompt("Masukkan penulis baru:", book.author) || book.author;
    const newYear = prompt("Masukkan tahun baru:", book.year) || book.year;

    book.title = newTitle;
    book.author = newAuthor;
    book.year = parseInt(newYear, 10);

    saveToLocalStorage();
    renderBooks();
  }
};

document.getElementById("bookForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("bookFormTitle").value;
  const author = document.getElementById("bookFormAuthor").value;
  const year = document.getElementById("bookFormYear").value;
  const isComplete = document.getElementById("bookFormIsComplete").checked;

  addBook(title, author, year, isComplete);
  document.getElementById("bookForm").reset();
});

document.getElementById("searchBook").addEventListener("submit", (event) => {
  event.preventDefault();

  const query = document.getElementById("searchBookTitle").value.toLowerCase();
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(query)
  );

  const incompleteBookList = document.getElementById("incompleteBookList");
  const completeBookList = document.getElementById("completeBookList");

  incompleteBookList.innerHTML = "";
  completeBookList.innerHTML = "";

  filteredBooks.forEach((book) => {
    const bookElement = document.createElement("div");
    bookElement.className = "p-3 mb-3";
    bookElement.setAttribute("data-bookid", book.id);
    bookElement.setAttribute("data-testid", "bookItem");

    bookElement.innerHTML = `
      <h3 data-testid="bookItemTitle">${book.title}</h3>
      <p data-testid="bookItemAuthor"><strong>Penulis:</strong> ${book.author}</p>
      <p data-testid="bookItemYear"><strong>Tahun:</strong> ${book.year}</p>
      <div>
        <button class="btn btn-success" data-testid="bookItemIsCompleteButton">
          ${book.isComplete ? "Belum selesai dibaca" : "Selesai dibaca"}
        </button>
        <button class="btn btn-danger" data-testid="bookItemDeleteButton">Hapus Buku</button>
        <button class="btn btn-warning" data-testid="bookItemEditButton">Edit Buku</button>
      </div>
    `;
    const isCompleteButton = bookElement.querySelector(
        '[data-testid="bookItemIsCompleteButton"]'
      );
      isCompleteButton.addEventListener("click", () => toggleBookStatus(book.id));
  
      const deleteButton = bookElement.querySelector(
        '[data-testid="bookItemDeleteButton"]'
      );
      deleteButton.addEventListener("click", () => deleteBook(book.id));
  
      const editButton = bookElement.querySelector(
        '[data-testid="bookItemEditButton"]'
      );
      editButton.addEventListener("click", () => editBook(book.id));
  
      if (book.isComplete) {
        completeBookList.appendChild(bookElement);
      } else {
        incompleteBookList.appendChild(bookElement);
      }

    if (book.isComplete) {
      completeBookList.appendChild(bookElement);
    } else {
      incompleteBookList.appendChild(bookElement);
    }
  });
});

