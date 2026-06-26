
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('login-error'); // Get the error message element

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        if (!validateLoginForm()) {
            return; 
        }

        const username = loginForm.username.value;
        const password = loginForm.password.value;

        const userData = JSON.parse(localStorage.getItem(username));

        if (userData && userData.password === password) {
            if (userData.isAdmin === "yes") {
               
               
                window.location.href = "AdminHome.html";  
            } else {
              
               
            
                window.location.href = "UserHome.html"; 
            }
        } else {
           
            loginError.style.display = 'block'; 
        }
    });
});
