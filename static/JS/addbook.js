document.addEventListener("DOMContentLoaded", function () {
    
    function addBookToCategory(category, book) {
        console.log("Adding book to category:", category);
        const books = JSON.parse(localStorage.getItem('books')) || {};
        console.log("Existing books:", books);
        if (!Array.isArray(books[category])) {
            books[category] = [];
        }
        books[category].push(book);
        localStorage.setItem('books', JSON.stringify(books));
        console.log("Updated books:", books);
    }
    

    const addBookForm = document.getElementById('addBookForm');

    addBookForm.addEventListener('submit', function(event) {
        event.preventDefault();
    
        const img = document.getElementById("img").files[0];
        const id = document.getElementById("id1").value;
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const category = document.getElementById("book").value;
        const description = document.getElementById("description").value;
    
        const reader = new FileReader();
        reader.onload = function(event) {
            const newBook = {
                id: id,
                title: title,
                author: author,
                category: category, 
                description: description,
                image: event.target.result
            };
    
            addBookToCategory(category, newBook);
    
         
            window.location.href = "categories.html";
        };
        reader.readAsDataURL(img);
    });
});