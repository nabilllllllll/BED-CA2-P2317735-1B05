// Fetch tasks and populate the table
fetch('/api/task', {
    method: 'GET'
})
.then(response => response.json())
.then(tasks => {
    console.log('Received tasks:', tasks); // Log the received tasks
    const tasksBody = document.getElementById('tasksBody');

    // Loop through tasks and create table rows
    tasks.forEach(task => {
        // Create a new row for each task
        const row = document.createElement('tr');

        // Create cells for each column
        const idCell = document.createElement('td');
        idCell.textContent = task.task_id;
        row.appendChild(idCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = task.title;
        row.appendChild(nameCell);

        const descCell = document.createElement('td');
        descCell.textContent = task.description; 
        row.appendChild(descCell);

        const pointsCell = document.createElement('td'); 
        pointsCell.textContent = task.points;
        row.appendChild(pointsCell);

        const actionsCell = document.createElement('td'); 

        const startButton = document.createElement('button'); 
        startButton.type = 'button';
        startButton.className = 'btn btn-success start-button'; 
        startButton.textContent = 'Start';
        actionsCell.appendChild(startButton);

        row.appendChild(actionsCell);

        // Append the row to the table body
        tasksBody.appendChild(row);
    });

    // Add event listeners to buttons after they are created
    document.querySelectorAll('.start-button').forEach(button => {
        button.addEventListener('click', function() {
            // Check if the user is logged in before navigating
            if (localStorage.getItem('loggedIn') === 'true') {
                window.location.href = 'taskprogress.html'; // Change the link as needed
            } else {
                // If not logged in, redirect user to login page
                window.location.href = 'login.html';
            }
        });
    });
})
.catch(error => {
    console.error('Error fetching tasks:', error);
});
