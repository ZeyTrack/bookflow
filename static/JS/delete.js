document.addEventListener("DOMContentLoaded", function () {
    const deleteBookForm = document.getElementById("deleteBookForm");

    deleteBookForm.addEventListener("submit", function(event) {
        event.preventDefault();

        
        const titleToDelete = document.getElementById("title").value.trim().toLowerCase();

       
        let books = JSON.parse(localStorage.getItem("books")) || {};

        
        for (const category in books) {
            
            books[category] = books[category].filter(book => book.title.toLowerCase() !== titleToDelete);
        }

    
        localStorage.setItem("books", JSON.stringify(books));

      
        window.location.href = "Categories.html";
    });
});