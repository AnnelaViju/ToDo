document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    const taskTitle = document.getElementById('taskTitle');
    const taskDueDate = document.getElementById('taskDueDate');
    const taskAssignee = document.getElementById('taskAssignee');
    const taskLabels = document.getElementById('taskLabels');

    // Add task to localStorage
    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const newTask = {
            title: taskTitle.value,
            dueDate: taskDueDate.value,
            assignee: taskAssignee.value || 'Unassigned',
            labels: taskLabels.value || 'None'
        };

        // Retrieve tasks from localStorage or create an empty array
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        
        // Add the new task to the array
        tasks.push(newTask);
        
        // Save the updated tasks array back to localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // Clear the form after submission
        taskForm.reset();
    });
});
