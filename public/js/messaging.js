const user_id = localStorage.getItem('id');
document.addEventListener("DOMContentLoaded", function () {
    const messageListContainer = document.getElementById("message-list");
    const messageInput = document.getElementById("messageInput");
    const sendButton = document.getElementById("sendButton");
    

    // Define currentUrl based on the base URL of the current page
    const currentUrl = window.location.origin;

    sendButton.addEventListener("click", function () {
        sendMessage();
    });

    messageInput.addEventListener("keydown", function (event) {
        // Pressing Enter key sends the message
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    async function sendMessage() {
        const messageText = messageInput.value.trim();
        const userId = localStorage.getItem("id"); // Retrieve the user ID from localStorage

        if (messageText !== "" && userId) {
            // Send the message to the server
            try {
                const response = await fetch(currentUrl + '/api/messages/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        user_id: userId,
                        message_text: messageText,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to send message');
                }

                const responseData = await response.json();

                // Fetch user details to display the sender's username
                const userResponse = await fetch(currentUrl + `/api/user/${user_id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    },
                });

                if (!userResponse.ok) {
                    throw new Error('Failed to fetch user details');
                }

                const user = await userResponse.json();

                // Create a new message element with user information
                const messageElement = document.createElement("div");
                messageElement.className = "message";
                messageElement.innerHTML = `
                    <strong>You</strong>: ${messageText}
                `;

                // Append the message to the message list container
                messageListContainer.appendChild(messageElement);

                // Clear the input field
                messageInput.value = '';

                console.log('Message sent successfully:', responseData);
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const messageList = document.getElementById("message-list");

    // Fetch all messages from the server
    fetch('/api/messages/')
        .then(response => response.json())
        .then(messages => {
            // Process messages and update the UI
            displayMessages(messages);
        })
        .catch(error => {
            console.error("Error fetching messages:", error);
        });

    function displayMessages(messages) {
        // Clear existing messages
        messageList.innerHTML = "";
        const userId = localStorage.getItem("id");

        // Display each message
        messages.forEach(message => {
            const messageContainer = document.createElement("div");
            messageContainer.className = "message-container";

            const messageElement = document.createElement("div");
            messageElement.className = "message";
            if (message.user_id == userId) {
                messageElement.innerHTML = `
                    <strong>You</strong>: ${message.message_text}
                `;

                const messageEditButton = document.createElement("button");
                messageEditButton.className = "btn btn-warning btn-sm";
                messageEditButton.innerHTML = `Edit`;
                messageElement.appendChild(messageEditButton);

                messageEditButton.addEventListener("click", function () {
                    editMessage();
                });
            }
            else {
                messageElement.textContent = `${message.user_id}: ${message.message_text}`;
            }

            messageContainer.appendChild(messageElement);
            messageList.appendChild(messageContainer);
        });
    }
});


const messageInput = document.getElementById('messageInput');
        const sendButton = document.getElementById('sendButton');
        const chatbox = document.getElementById('chatbox');

        // Function to send a message
        function sendMessage() {
            const message = messageInput.value.trim();

            if (message !== '') {
                // Display user message in the chatbox
                displayMessage('You: ' + message);

                // Clear the input field
                messageInput.value = '';

                // Here you can send the message to a server for processing
                // and handle the response asynchronously
            }
        }

        // Function to display messages in the chatbox
        function displayMessage(message) {
            const messageElement = document.createElement('p');
            messageElement.textContent = message;
            chatbox.appendChild(messageElement);

            // Scroll to the bottom of the chatbox
            chatbox.scrollTop = chatbox.scrollHeight;
        }

        // Event listener for sending a message when the button is clicked
        sendButton.addEventListener('click', sendMessage);

        // Event listener for sending a message when the Enter key is pressed
        messageInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                sendMessage();
            }
        });


        function editMessage() {
            
        }