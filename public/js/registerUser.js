  document.addEventListener("DOMContentLoaded", function () {
      const registerform = document.getElementById("registerform");
      const warningCard = document.getElementById("warningCard");
      const warningText = document.getElementById("warningText");
    
      registerform.addEventListener("submit", function (event) {
        event.preventDefault();
    
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("repeatpassword").value;

 
        // Perform signup logic
        if (password === confirmPassword) {
          // Passwords match, proceed with signup
          console.log("Signup successful");
          console.log("Username:", username);
          console.log("Email:", email);
          console.log("Password:", password);
          warningCard.classList.add("d-none");

          const data = {
            username: username,
            email: email,
            password: password,
          };

          
          async function fetchData() {
            try {
              const response = await fetch(currentUrl);
              
              const responseStatus = response.status
              if (responseStatus == 200) {
                // Check if signup was successful
               /* if (responseData.token) {
                  // Store the token in local storage
                  localStorage.setItem("token", responseData.token);
                  // Redirect or perform further actions for logged-in user
                  window.location.href = "login.html";
                }*/
                window.location.href = "login.html";
              } else {
                warningCard.classList.remove("d-none");
                warningText.innerText = responseData.message;
              }


            } catch (error) {
              console.error("Fetch error:", error);
            }
          }
          fetchData();
          
          // Perform signup request
         // fetchMethod(currentUrl + "/api/register", callback, "POST", data);
    
          // Reset the form fields
          registerform.reset();
        } else {
          // Passwords do not match, handle error
          warningCard.classList.remove("d-none");
          warningText.innerText = "Passwords do not match";
        }
      });
    });