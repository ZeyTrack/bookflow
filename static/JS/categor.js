document.addEventListener("DOMContentLoaded", function () {



	const bookData = {
	
	 };
	
		
			const bookDataFromStorage = JSON.parse(localStorage.getItem('books')) || {};
	
	
	
	
			
		
			function populateBooks(category, books) {
				const categoryList = document.getElementById("categories-list");
				const categoryItem = document.createElement("li");
				categoryItem.className = "category-item";
				const categoryDetails = document.createElement("div");
				categoryDetails.className = "category-details";
				const categoryHeading = document.createElement("h2");
				categoryHeading.className = "category";
				categoryHeading.textContent = category;
				const bookList = document.createElement("ul");
				bookList.className = "book-list";
		
				books.forEach((book) => {
					const bookItem = document.createElement("li");
					bookItem.className = "book-item";
					const bookDetails = document.createElement("div");
					bookDetails.className = "book-details";
					const bookImage = document.createElement("img");
					bookImage.src = book.image;
					bookImage.width = 150;
					const bookTitle = document.createElement("b");
					bookTitle.textContent = book.title;
					const bookAuthor = document.createElement("small");
					bookAuthor.textContent = "by " + book.author;
					const bookDescription = document.createElement("h5");
					bookDescription.textContent = book.description;
					const borrowButton = document.createElement("button");
					borrowButton.textContent = "Borrow";
					borrowButton.className = "borrow-button";
				
					bookDetails.appendChild(bookTitle);
					bookDetails.appendChild(document.createElement("br"));
					bookDetails.appendChild(bookAuthor);
					bookDetails.appendChild(document.createElement("br"));
					bookDetails.appendChild(bookDescription);
					bookDetails.appendChild(borrowButton);
					bookItem.appendChild(bookImage);
					bookItem.appendChild(bookDetails);
					bookList.appendChild(bookItem);
				});
				
		
				categoryDetails.appendChild(categoryHeading);
				categoryDetails.appendChild(bookList);
				categoryItem.appendChild(categoryDetails);
				categoryList.appendChild(categoryItem);
			}
			  
			for (const category in bookData) {
				populateBooks(category, bookData[category]);
			}
			
			for (const category in bookDataFromStorage) {
				if (Array.isArray(bookDataFromStorage[category])) {
					populateBooks(category, bookDataFromStorage[category]);
				}
			}
			
	
			
			
			
			
			
	
			const borrowButtons = document.querySelectorAll(".borrow-button");
	
		borrowButtons.forEach(button => {
			button.addEventListener("click", function () {
				const bookId = this.dataset.bookId; // Get the book ID from data attribute
	
				fetch(`/borrow-book/${bookId}/`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'X-CSRFToken': getCookie('csrftoken') // CSRF token for security
					},
					body: JSON.stringify({ book_id: bookId }) // Send the book ID to the server
				})
				.then(response => response.json())
				.then(data => {
					if (data.success) {
						this.textContent = "Borrowed";
						this.disabled = true;
					} else {
						alert(data.error);
					}
				})
				.catch(error => console.error('Error:', error));
			});
		});
	
		function getCookie(name) {
			let cookieValue = null;
			if (document.cookie && document.cookie !== '') {
				const cookies = document.cookie.split(';');
				for (let i = 0; i < cookies.length; i++) {
					const cookie = cookies[i].trim();
					if (cookie.substring(0, name.length + 1) === (name + '=')) {
						cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
						break;
					}
				}
			}
			return cookieValue;
		}
	});