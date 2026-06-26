document.addEventListener("DOMContentLoaded", function() {
  const editBookForm = document.getElementById("editBookForm");
  editBookForm.addEventListener("submit", function(event) {
      event.preventDefault();

      const cover = document.getElementById("cover").files[0];
      const id = document.getElementById("id1").value;
      const title = document.getElementById("bookt").value;
      const author = document.getElementById("author").value;
      const category = document.getElementById("book").value;
      const description = document.querySelector("textarea[name='desc']").value;

      let books = JSON.parse(localStorage.getItem("books")) || {};

      for (const cat in books) {
          books[cat] = books[cat].map(book => {
              if (book.title.toLowerCase() === title.toLowerCase()) {
          
                  return { ...book, id, author, description, category };
              } else {
                  return book;
              }
          });
      }

      localStorage.setItem("books", JSON.stringify(books));

   
      window.location.href = "Categories.html";
  });
});
