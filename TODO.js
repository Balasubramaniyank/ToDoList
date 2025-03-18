document.addEventListener("DOMContentLoaded", loadTasks);
document.getElementById("task-form").addEventListener("submit", addTask);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        createTaskElement(task);
    });
}

function createTaskElement(task) {
    const taskList = document.getElementById("task-list");

    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    li.classList.toggle("completed", task.completed); // Apply the completed class

    li.innerHTML = `
        <span>${task.title} (${task.category})</span>
        <button class="complete" onclick='completeTask("${task.id}")'>${task.completed ? 'Undo' : 'Complete'}</button>
        <button class="edit" onclick='editTask("${task.id}")'>Edit</button>
        <button class="delete" onclick='deleteTask("${task.id}")'>Delete</button>
    `;
    taskList.appendChild(li);
}

function addTask(event) {
    event.preventDefault();
    const taskInput = document.getElementById("task-input");
    const categorySelect = document.getElementById("category-select");
    const task = {
        id: Date.now(),
        title: taskInput.value,
        category: categorySelect.value,
        completed: false // New property for task completion
    };
    
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    createTaskElement(task);
    taskInput.value = '';
}

function completeTask(taskId) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const task = tasks.find(task => task.id == taskId);
    
    if (task) {
        task.completed = !task.completed; // Toggle the completed status
        localStorage.setItem("tasks", JSON.stringify(tasks));
        reloadTasks();
    }
}

function editTask(taskId) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const task = tasks.find(task => task.id == taskId);
    
    if (task) {
        const newTitle = prompt("Edit task title:", task.title);
        if (newTitle) {
            task.title = newTitle;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            reloadTasks();
        }
    }
}

function deleteTask(taskId) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const updatedTasks = tasks.filter(task => task.id != taskId);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    reloadTasks();
}

function reloadTasks() {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = '';
    loadTasks();
}
