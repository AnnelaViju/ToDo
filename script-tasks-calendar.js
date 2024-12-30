document.addEventListener('DOMContentLoaded', function() {
    // Retrieve tasks from localStorage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Load tasks in the task list (for the "Tasks" tab)
    function loadTasksForList() {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = ''; // Clear the current list

        tasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `
                <h3>${task.title}</h3>
                <div class="task-details">
                    <span><strong>Due Date:</strong> ${task.dueDate}</span>
                    <span><strong>Assigned to:</strong> ${task.assignee}</span>
                    <span><strong>Labels:</strong> ${task.labels}</span>
                </div>
            `;
            taskList.appendChild(li);
        });
    }

    loadTasksForList(); // Call to load tasks on page load

    // Initialize FullCalendar (FullCalendar 6.x)
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: tasks.map(task => ({
            title: task.title,
            start: task.dueDate, // Use task dueDate as event start time
            description: task.labels, // Optional: Add more task info to calendar events
        })),
        eventClick: function(info) {
            alert('Task: ' + info.event.title + '\nDue Date: ' + info.event.start.toLocaleDateString());
        }
    });

    // Function to trigger the rendering of FullCalendar after tab switch
    function renderCalendar() {
        // Only render if it's not rendered already
        if (!calendar.rendered) {
            calendar.render();
        }
    }

    // Function to toggle between tasks and calendar tabs
    window.showTab = function(tabName) {
        const tasksTab = document.getElementById('tasks-tab');
        const calendarTab = document.getElementById('calendar-tab');

        if (tabName === 'tasks') {
            tasksTab.style.display = 'block';
            calendarTab.style.display = 'none';
        } else {
            tasksTab.style.display = 'none';
            calendarTab.style.display = 'block';

            // Render FullCalendar when the calendar tab is shown
            renderCalendar();
        }
    };

    // Call the showTab function for default tab visibility
    showTab('tasks'); // Start with task tab visible by default
});
