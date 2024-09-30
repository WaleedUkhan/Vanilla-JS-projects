// Array to store tasks

let tasks = [
  {
    title: "Buy groceries",
    description: "Milk, Eggs, Bread",
    dueDate: "2024-09-10",
  },
  {
    title: "Complete Project",
    description: "Finish coding project",
    dueDate: "2024-09-12",
  },
  {
    title: "Gym Workout",
    description: "Leg day at the gym",
    dueDate: "2024-09-08",
  },
];

// Variable to track the index of the task being edited
let editIndex = -1;

// Function to display tasks
function displayTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = ""; // Clear the existing list

  // Iterate over the tasks array and create HTML elements for each task
  tasks.forEach((task, index) => {
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item"); // Add class for styling

    taskItem.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p><strong>Due Date:</strong> ${task.dueDate}</p>
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
    taskList.appendChild(taskItem);
  });
}

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault(); // Prevent form from refreshing the page

  const title = document.getElementById("task-title").value;
  const description = document.getElementById("task-desc").value;
  const dueDate = document.getElementById("task-due-date").value;

  if (editIndex === -1) {
    // If no task is being edited, add a new task
    const newTask = { title, description, dueDate };
    tasks.push(newTask);
  } else {
    // If a task is being edited, update the existing task
    tasks[editIndex] = { title, description, dueDate };
    editIndex = -1; // Reset the edit index after editing
  }

  // Refresh the task list
  displayTasks();

  // Clear the form
  document.getElementById("task-form").reset();
}

// Function to edit a task
function editTask(index) {
  const task = tasks[index];

  // Populate the form with the task details
  document.getElementById("task-title").value = task.title;
  document.getElementById("task-desc").value = task.description;
  document.getElementById("task-due-date").value = task.dueDate;

  // Set the edit index to the task's index
  editIndex = index;
}

// Function to delete a task with confirmation


function deleteTask(index) {
  const task = tasks[index];
  const confirmation = confirm(
    `Are you sure you want to delete the task: "${task.title}"?`
  );

  if (confirmation) {
    tasks.splice(index, 1); // Remove the task from the array
    displayTasks(); // Refresh the task list
  }
}

// Attach form submit event listener
document
  .getElementById("task-form")
  .addEventListener("submit", handleFormSubmit);

// Initial call to display tasks when the page loads
displayTasks();
