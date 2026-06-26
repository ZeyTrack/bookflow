
function validateLoginForm() {

    clearErrors();

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username.trim() === "" ) {
        showError("username-error", "Username is required");
        return false;
    }

    if (password.trim() === ""||  password.length < 8) {
        showError("password-error", "Password must be at least 8 characters long");
        return false;
    }

    return true;
}

function validateSignUpForm() {

    clearErrors();

    var username = document.getElementsByName("username")[0].value;
    var email = document.getElementsByName("email")[0].value;
    var password = document.getElementsByName("password")[0].value;
    var confirmPassword = document.getElementsByName("confirmPassword")[0].value;
    var isAdmin = document.querySelector('input[name="is_admin"]:checked');

    if (username.trim() === ""  ) {
        showError("username-error", "Username is required");
        return false;
    }

    if (email.trim() === ""|| !email.includes("@") ){
        showError("email-error", "Please enter a valid email address.");
        return false;
    }

    

    if (confirmPassword.trim() === "" ) {
        showError("confirmPassword-error", "Please confirm your password");
        return false;
    }

    if (!isAdmin) {
        showError("is_admin-error", "Please select whether you are an admin or user");
        return false;
    }
    

    return true;
}


function showError(inputId, errorMessage) {
    var errorElement = document.getElementById(inputId);
    errorElement.innerText = errorMessage;
    errorElement.style.display = "block";
}


function clearErrors() {
    var errorElements = document.querySelectorAll(".error");
    errorElements.forEach(function(element) {
        element.innerText = "";
        element.style.display = "none";
    });
}