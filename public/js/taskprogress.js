// Fetch tasks and populate the table
const user_id = localStorage.getItem('id');
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
        const taskId = task.task_id; // Get the task ID

        // Store the task_id in localStorage when the row is clicked
        row.addEventListener('click', function() {
            localStorage.setItem('selectedTaskId', responseData.taskId);
            console.log(responseData.taskId);
        });

        row.setAttribute('data-task-id', taskId);

        // Create cells for each column
        const idCell = document.createElement('td');
        idCell.textContent = taskId; // Use the task ID
        row.appendChild(idCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = task.title;
        nameCell.classList.add('task-title');
        row.appendChild(nameCell);

        const descCell = document.createElement('td');
        descCell.textContent = task.description;
        descCell.classList.add('task-description');
        row.appendChild(descCell);

        const pointsCell = document.createElement('td'); 
        pointsCell.textContent = task.points;
        pointsCell.classList.add('task-points');
        row.appendChild(pointsCell);

        const actionsCell = document.createElement('td'); 

        // Create Edit button
        const editButton = document.createElement('button'); 
        editButton.type = 'button';
        editButton.className = 'btn btn-primary edit-button'; 
        editButton.textContent = 'Edit';
        actionsCell.appendChild(editButton);

        // Create Complete button
        const completeButton = document.createElement('button'); 
        completeButton.type = 'button';
        completeButton.className = 'btn btn-success complete-button'; 
        completeButton.textContent = 'Complete';
        actionsCell.appendChild(completeButton);

        row.appendChild(actionsCell);

        // Append the row to the table body
        tasksBody.appendChild(row);
    });

    // Add event listeners to Edit buttons
    document.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', handleEditButtonClick);
    });

    // Add event listeners to Complete buttons
    document.querySelectorAll('.complete-button').forEach(button => {
        button.addEventListener('click', handleCompleteButtonClick);
    });
})
.catch(error => {
    console.error('Error fetching tasks:', error);
});

// Function to handle the click event of the Edit button
function handleEditButtonClick(event) {
    // Retrieve task details from the row
    const row = event.target.closest('tr');
    const taskId = row.getAttribute('data-task-id');
    const title = row.querySelector('.task-title').textContent;
    const description = row.querySelector('.task-description').textContent;
    const points = row.querySelector('.task-points').textContent;

    // Populate form fields with task details
    document.getElementById('editTaskForm').setAttribute('data-task-id', taskId);
    document.getElementById('editTitle').value = title;
    document.getElementById('editDescription').value = description;
    document.getElementById('editPoints').value = points;

    // Show the edit task modal
    const editTaskModal = new bootstrap.Modal(document.getElementById('editTaskModal'));
    editTaskModal.show();
}
// Function to handle the click event of the Edit button
// Function to handle the click event of the Edit button
function handleEditButtonClick(event) {
    // Retrieve task details from the row
    const row = event.target.closest('tr');
    const taskId = row.getAttribute('data-task-id');
    const title = row.querySelector('.task-title').textContent;
    const description = row.querySelector('.task-description').textContent;
    const points = row.querySelector('.task-points').textContent;

    // Populate form fields with task details
    document.getElementById('editTaskForm').setAttribute('data-task-id', taskId);
    document.getElementById('editTitle').value = title;
    document.getElementById('editDescription').value = description;
    document.getElementById('editPoints').value = points;

    // Show the edit task modal
    const editTaskModal = new bootstrap.Modal(document.getElementById('editTaskModal'));
    
    // Set taskId as a data attribute of the modal
    editTaskModal.taskId = taskId;
    
    editTaskModal.show();
}

// Handle form submission to update the task
document.getElementById('submitedit').addEventListener('click', function() {
    // Retrieve taskId from the modal
    const taskIdToUpdate = document.getElementById('editTaskForm').getAttribute('data-task-id');
    
    const updatedTaskData = {
        title: document.getElementById('editTitle').value,
        description: document.getElementById('editDescription').value,
        points: document.getElementById('editPoints').value
    };

    // Send a PUT request to update the task
    fetch(`/api/task/${taskIdToUpdate}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTaskData)
    })
    .then(response => {
        if (response.ok) {
            // Handle successful response
            console.log('Task updated successfully.');
            // You can perform any additional actions here, such as updating UI
        } else {
            // Handle errors
            console.error('Error updating task:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Error updating task:', error);
    });

    // Hide the modal after saving changes
    const editTaskModal = new bootstrap.Modal(document.getElementById('editTaskModal'));
    editTaskModal.hide();
});

// Function to handle the click event of the Complete button
function handleCompleteButtonClick(event) {
    // Retrieve task details from the row
    const row = event.target.closest('tr');
    const taskId = row.getAttribute('data-task-id');
    const points = row.querySelector('.task-points').textContent;

    const Data = {
        taskId: taskId,
        points: points
    };

    // Send a POST request to your controller.js endpoint
    fetch('api/taskprogress', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Data)
    })
    .then(response => {
        if (response.ok) {
            // Handle successful response
            console.log('Task completed successfully.');
            // You can perform any additional actions here, such as updating UI
        } else {
            // Handle errors
            console.error('Error completing task:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Error completing task:', error);
    });
    
    const data2 = {
        user_id: user_id,
        task_id: taskId,
        completion_date: new Date().toISOString().slice(0, 19).replace('T', ' ')
    }

    fetch('api/progress', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data2)
    })
    .then(response => {
        if (response.ok) {
            // Handle successful response
            console.log('Task progress added.');
            // You can perform any additional actions here, such as updating UI
            window.location.href = "completedtask.html";
        } else {
            // Handle errors
            console.error('Error progres task:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Error compleeee:', error);
    });
}
