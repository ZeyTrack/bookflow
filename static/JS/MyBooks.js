// Retrieve all books from local storage
let myBooks = [];
let counter = parseInt(localStorage.getItem("bookCounter"));
for (let i = 1; i <= counter; i++) {
	const key = `book${i}`;
	const book = JSON.parse(localStorage.getItem(key));
	if (book) {
		myBooks.push(book);
	}
}

renderBooks();
function remove(index) {
	myBooks.splice(index, 1);
	renderBooks();

	const key = `book${index + 1}`;
	localStorage.removeItem(key);

	const counter = parseInt(localStorage.getItem("bookCounter")) || 0;
	localStorage.setItem("bookCounter", counter - 1);
}

function renderBooks() {
	const collection = document.getElementById("collection");
	collection.innerHTML = "";

	for (let i = 0; i < myBooks.length; i++) {
		collection.innerHTML += `<div class="image">
            <img id="book${i}" src="${myBooks[i].coverSource}" alt="" />
            <div class="image-content">
                <button onclick="remove(${i})">Remove</button>
                <h3 id="bookTitle">${myBooks[i].title}</h3>
                <p id="bookAuthor">${myBooks[i].author}</p>
                <p id="bookDescription">${myBooks[i].description}</p>
                <p id="bookAvailability">${myBooks[i].available}</p>
            </div>
        </div>`;
	}
}
