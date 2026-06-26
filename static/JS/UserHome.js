let welcomeMessage = `Welcome to <span>BookNest</span>, where every visit brings you
closer to your next favorite book! Explore our vast collection,
enjoy the journey through stories that spark your imagination, and
cherish each moment in our community of passionate readers. Happy
reading!`;

document.getElementById("welcomeMessage").innerHTML = welcomeMessage;

class Book {
	constructor(coverSource, title, author, available, description) {
		this.coverSource = coverSource;
		this.title = title;
		this.author = author;
		this.available = available;
		this.description = description;
	}
}

let allBooks = [
	new Book("C:/Users/DELL\Desktop/django-v5/static/Images/62816044.jpg", "House of Flame and Shadow", " Sarah J. Maas", "Yes", " Bryce Quinlan never expected to see a world other than Midgard, but now that she has, all she wants is to get back. Everything she loves is in Midgard: her family, her friends, her mate. Stranded in a strange new world, she's going to need all her wits about her to get home again. And that's no easy feat when she has no idea who to trust."),
	new Book("Images/2.jpg", "Book 2", "Tawfik", "No", "Book 2 Description"),
	new Book("Images/3.jpg", "Book 3", "Garry", "No", "Book 3 Description"),
	new Book("Images/4.jpg", "Book 4", "Marquiz", "No", "Book 4 Description"),
	new Book("Images/5.jpg", "Book 5", "Ali", "No", "Book 5 Description"),
	new Book(
		"Images/6.jpg",
		"Book 6",
		"Mill Gebson",
		"Yes",
		"Book 6 Description"
	),
	new Book("Images/7.jpg", "Book 7", "Adrain", "Yes", "Book 7 Description"),
	new Book("Images/8.jpg", "Book 8", "Kevin", "No", "Book 8 Description"),
	new Book("Images/9.jpg", "Book 9", "Mark", "Yes", "Book 9 Description"),
];

for (let i = 0; i < 4; i++) {
	document.getElementById("collection").innerHTML += `<div class="image">
        <img id="book1" src=${allBooks[i].coverSource} alt="" />
        <div class="image-content">
            <button>Add to Favorite books</button>
            <h3 id="bookTitle">${allBooks[i].title}</h3>
            <p id="bookAuthor">${allBooks[i].author}</p>
            <p id="bookDescription">${allBooks[i].description}</p>
            <p id="bookAvailability">${allBooks[i].available}</p>
        </div>
    </div>`;
}

function collectionAddMoreBooks() {
	for (let i = 4; i < allBooks.length; i++) {
		document.getElementById("collection").innerHTML += `<div class="image">
            <img id="book1" src=${allBooks[i].coverSource} alt="" />
            <div class="image-content">
                <button>Add to My Books</button>
                <h3 id="bookTitle">${allBooks[i].title}</h3>
                <p id="bookAuthor">${allBooks[i].author}</p>
                <p id="bookDescription">${allBooks[i].description}</p>
                <p id="bookAvailability">${allBooks[i].available}</p>
            </div>
        </div>`;
	}
	let button = document.getElementById("collectionMore");
	button.style.visibility = "hidden";
}

let counter = parseInt(localStorage.getItem("bookCounter")) || 0;

const container = document.getElementById("collection");
container.addEventListener("click", function (event) {
	if (event.target.tagName === "BUTTON") {
		const button = event.target;
		const bookContent = button.closest(".image-content");
		const coverSource = bookContent.parentElement.querySelector("img").src;
		const title = bookContent.querySelector("h3").innerHTML;
		const author = bookContent.querySelector("#bookAuthor").innerHTML;
		const description = bookContent.querySelector("#bookDescription").innerHTML;
		const available = bookContent.querySelector("#bookAvailability").innerHTML;

		const book = {
			coverSource,
			title,
			author,
			description,
			available,
		};

		counter++;
		localStorage.setItem("bookCounter", counter);
		const key = `book${counter}`;
		localStorage.setItem(key, JSON.stringify(book));
	}
});



