fetch('/api/progress', {
    method: 'GET'
})
.then(response => response.json())
.then(tasks => {
    
    const tasksBody = document.getElementById('tasksBody');

    // Loop through tasks and create table rows
    tasks.forEach(task => {
        // Create a new row for each task
        const row = document.createElement('tr');

        // Create cells for each column

        // Create and set content for the cell for progress_id
        const completedTaskCell = document.createElement('td');
        completedTaskCell.textContent = task.progress_id;
        row.appendChild(completedTaskCell);

        // Create and set content for the cell for task_id
        const idCell = document.createElement('td');
        idCell.textContent = task.task_id;
        row.appendChild(idCell);

        // Create and set content for the cell for title
        const titleCell = document.createElement('td');
        let taskTitle;

        fetch("/api/task/" + task.task_id, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(thisTask => {;
            console.log(thisTask.title);
            taskTitle = thisTask.title;
            titleCell.textContent = taskTitle;
            row.appendChild(titleCell);
            
            // Create and set content for the cell for title
            const completionDateCell = document.createElement('td');
            completionDateCell.textContent = task.completion_date;
            console.log(task.completion_date);
            row.appendChild(completionDateCell);
        })



        // Append the row to the table body
        tasksBody.appendChild(row);
    });


})
.catch(error => {
    console.error('Error fetching user data:', error);
});
