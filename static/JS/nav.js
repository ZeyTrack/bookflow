let nav = `  


<div class="cont">
   <div class="navbar">
   <div class="logo">
       <h1>BookNest</h1>
   </div>

   <div class="search-wrapper">

       <i class="search-icon fas fa-search"></i>
     
       <input type="text" id="searchInput" placeholder="Search books...">
   </div>
     
        
        {% for message in messages %}
        <div class="alert alert-{{ message.tags }} alert-dismissible fade show" role="alert">
            <strong>{{ message }}</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        {% endfor %}

        {% if  user.is_authenticated %}
        <h3>hello {{username}}</h3>
        <h4>u are log sec</h4>
        <button class="log_btn" log_bttype="submit"></button> <a href="/signout">Log Out </a> </button>
         {% else %}
         <button class="log_btn" type="submit"></button> <a href="/signup">Sign up </a> </button>
         <button class="log_btn" type="submit"></button> <a href="/Login">Log in</a> </button>
         {% endif %}
         <na v>
            <ul class="links">
               <li class="activ"><a href="UserHome.html">Home</a> </li> 
               <li><a href="MyBooks.html">My Books</a>  </li> 
               <li> <a href="Categories.html">Categories</a>  </li>            
               <li> <a href="Profile.html">Profile</a>  </li>            
            </ul>
               
           </nav>
           

     `;
     document.addEventListener("DOMContentLoaded", function() {
        const logoutBtn = document.getElementById("logoutBtn");
        const loginBtn = document.getElementById("loginBtn");
    
        // Function to handle login/logout button toggling
        function toggleButtons(isAuthenticated) {
            if (isAuthenticated) {
                logoutBtn.style.display = "inline-block"; // Show logout button if authenticated
                loginBtn.style.display = "none"; // Hide login button if authenticated
            } else {
                loginBtn.style.display = "inline-block"; // Show login button if not authenticated
                logoutBtn.style.display = "none"; // Hide logout button if not authenticated
            }
        }
    
        // Event listener for login button
        loginBtn.addEventListener("click", function() {
            // Redirect user to login page
            window.location.href = "{% url 'Login' %}";
        });
    
        // Event listener for logout button
        logoutBtn.addEventListener("click", function() {
            // Call the logout API
            fetch("{% url 'signout' %}", {
                method: 'POST',
                // Add CSRF token if needed
                headers: {
                    'X-CSRFToken': '{{ csrf_token }}'
                }
            }).then(response => {
                // Check response and handle accordingly
                if (response.ok) {
                    // User logged out successfully
                    toggleButtons(false); // Update button display after logout
                } else {
                    // Handle error
                    console.error("Failed to logout:", response.statusText);
                }
            }).catch(error => {
                console.error("Error occurred during logout:", error);
            });
        });
    
        // Fetch authentication status from backend
        fetch("/check-authentication-status")
        .then(response => response.json())
        .then(data => {
            // Toggle buttons based on authentication status
            toggleButtons(data.isAuthenticated);
        })
        .catch(error => {
            console.error("Error occurred while fetching authentication status:", error);
        });
    });

document.getElementById("app-header").innerHTML = nav;

function searchBooks() {
  const searchQuery = document.getElementById("searchInput").value.toLowerCase();
  
  document.getElementById("collection").innerHTML = "";
  
  allBooks.forEach(book => {
      const title = book.title.toLowerCase();
      const author = book.author.toLowerCase();

      if (title.includes(searchQuery) || author.includes(searchQuery)) {
          
          document.getElementById("collection").innerHTML += `<div class="image">
              <img src=${book.coverSource} alt="" />
              <div class="image-content">
                  <button>Add to My Books</button>
                  <h3>${book.title}</h3>
                  <p>${book.author}</p>
                  <p>${book.description}</p>
                  <p>${book.available}</p>
              </div>
          </div>`;
      }
  });
  
}

document.getElementById("searchInput").addEventListener("input", searchBooks);

document.addEventListener("DOMContentLoaded", function () {

    function searchBooks() {
        const searchQuery = document.getElementById("searchInput").value.toLowerCase();
        const bookItems = document.querySelectorAll(".book-item");

        bookItems.forEach(bookItem => {
            const bookTitle = bookItem.querySelector("b").textContent.toLowerCase();
            const bookAuthor = bookItem.querySelector("small").textContent.toLowerCase();
            const bookDescription = bookItem.querySelector("h5").textContent.toLowerCase();

            if (bookTitle.includes(searchQuery) || bookAuthor.includes(searchQuery) || bookDescription.includes(searchQuery)) {
                bookItem.style.display = "block"; // Show the book item if it matches the search query
            } else {
                bookItem.style.display = "none"; // Hide the book item if it doesn't match the search query
            }
        });
    }

    document.getElementById("searchInput").addEventListener("input", searchBooks);

});
