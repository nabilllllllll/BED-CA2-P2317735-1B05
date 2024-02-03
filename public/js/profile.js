    const user_id = localStorage.getItem('id');

    // Make API call to fetch user data
    fetch(`/api/user/${user_id}`)
        .then(response => response.json())
        .then(user => {
            const usernameElement = document.getElementById('username');
            const emailElement = document.getElementById('email');
            const pointsElement = document.getElementById('points');
         
            usernameElement.textContent = user.username;
            emailElement.textContent = user.email;
            pointsElement.textContent = user.points;
            console.log(user.points);
        
            })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });