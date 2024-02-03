document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
        if (responseStatus == 200) {
            // Check if login was successful
            if (responseData.token) {
                // Store the token in local storage
                localStorage.setItem("token", responseData.token);
                localStorage.setItem("id", responseData.user_id);
                localStorage.setItem('loggedIn', 'true');
                console.log(responseData.user_id);
                alert("Login Successfully.")
                // Redirect or perform further actions for logged-in user
                window.location.href = "profile.html";
            }
        } else {
            warningCard.classList.remove("d-none");
            warningText.innerText = "Username or Password Incorrect"
        }
    };

    const loginForm = document.getElementById("loginForm");

    const warningCard = document.getElementById("warningCard");
    const warningText = document.getElementById("warningText");

    loginForm.addEventListener("submit", function (event) {
        console.log("loginForm.addEventListener");
        event.preventDefault();

        // Fetch values entered by the user in the username and password input fields.
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Create object data containing user's login details
        const data = {
            username: username,
            password: password
        }
        
        // Perform login request
        fetchMethod(currentUrl + "/api/login", callback, "POST", data);

        // Reset the form fields
        loginForm.reset();
    });
});