// Get references to HTML elements
const routinesList = document.getElementById('routinesList');
const routineInput = document.getElementById('routineInput');
const addButton = document.getElementById('addButton');

// Add event listener to the add button
addButton.addEventListener('click', addRoutine);

// Function to add a new routine
function addRoutine() {
  const routineName = routineInput.value;

  if (routineName.trim() !== '') {
    // Create a new list item
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <h2 class="routine-name">${routineName}</h2>
      <ul class="task-list"></ul>
      <div class="task-form">
        <input type="text" placeholder="Enter a task">
        <button class="add-task-button">Add Task</button>
      </div>
      <div class="routine-complete">
        <input type="checkbox" class="routine-completed">
        <label>Completed</label>
      </div>
      <div class="routine-finish">
        <button class="finish-button">Finish</button>
      </div>
    `;

    // Append the list item to the routines list
    routinesList.appendChild(listItem);

    // Clear the input field
    routineInput.value = '';

    const taskForm = listItem.querySelector('.task-form');
    const taskInput = listItem.querySelector('.task-form input');
    const addTaskButton = listItem.querySelector('.task-form .add-task-button');
    const taskList = listItem.querySelector('.task-list');
    const routineCompletedCheckbox = listItem.querySelector('.routine-completed');
    const finishButton = listItem.querySelector('.finish-button');

    // Add event listener to add task button
    addTaskButton.addEventListener('click', addTask);

    // Function to add a new task
    function addTask() {
      const taskName = taskInput.value;

      if (taskName.trim() !== '') {
        // Create a new task list item
        const taskListItem = document.createElement('li');
        taskListItem.classList.add('task-list-item');
        taskListItem.innerHTML = `
          <span class="task-name">${taskName}</span>
          <input type="checkbox" class="task-completed">
        `;

        // Append the task list item to the task list
        taskList.appendChild(taskListItem);

        // Clear the task input field
        taskInput.value = '';
      }
    }

    // Add event listener to routine completion checkbox
    routineCompletedCheckbox.addEventListener('change', toggleRoutineCompletion);

    // Function to toggle routine completion
    function toggleRoutineCompletion() {
      const taskCompletedCheckboxes = listItem.querySelectorAll('.task-completed');
      const routineCompleted = this.checked;

      for (let i = 0; i < taskCompletedCheckboxes.length; i++) {
        taskCompletedCheckboxes[i].checked = routineCompleted;
      }
    }

    // Add event listener to finish button
    finishButton.addEventListener('click', finishRoutine);

    // Function to mark routine as finished
    function finishRoutine() {
      listItem.classList.add('finished');
      finishButton.disabled = true;
      routineCompletedCheckbox.disabled = true;
    }
  }
}
// Function to add a new routine
function addRoutine() {
  const routineNameInput = document.getElementById('routineNameInput');
  const routineName = routineNameInput.value.trim();

  if (routineName !== '') {
    const routineList = document.getElementById('routineList');
    const newRoutineItem = document.createElement('li');
    newRoutineItem.innerHTML = `
      <h2>${routineName}</h2>
      <ul class="task-list" id="${routineName}-tasks"></ul>
      <input type="text" id="${routineName}-taskInput" placeholder="Enter a task">
      <button type="button" onclick="addTask('${routineName}')">Add Task</button>
    `;
    routineList.appendChild(newRoutineItem);

    routineNameInput.value = '';
  }
}

// Function to add a new task to a routine
function addTask(routineName) {
  const taskInput = document.getElementById(`${routineName}-taskInput`);
  const taskName = taskInput.value.trim();

  if (taskName !== '') {
    const routineTasks = document.getElementById(`${routineName}-tasks`);
    const newTaskItem = document.createElement('li');
    newTaskItem.innerText = taskName;
    routineTasks.appendChild(newTaskItem);

    taskInput.value = '';
  }
}
// Login form submission handling
function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Perform client-side validation
  if (username === '' || password === '') {
    alert('Please enter both username and password');
    return;
  }

  // Make an AJAX request to the server to handle login
  axios.post('/api/login', { username, password })
    .then(response => {
      // Login successful, redirect to dashboard or perform necessary actions
      window.location.href = '/dashboard';
    })
    .catch(error => {
      // Login failed, display error message
      if (error.response) {
        alert('Login failed: ' + error.response.data.message);
      } else {
        alert('An error occurred during login. Please try again later.');
      }
    });
}

// Sign-up form submission handling
function signup() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const email = document.getElementById('email').value;

  // Perform client-side validation
  if (username === '' || password === '' || email === '') {
    alert('Please enter all required fields');
    return;
  }

  // Make an AJAX request to the server to handle sign-up
  fetch('/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password, email }),
  })
    .then(response => {
      // Sign-up successful, redirect to login or perform necessary actions
      window.location.href = '/login';
    })
    .catch(error => {
      // Sign-up failed, display error message
      alert('Sign-up failed: ' + error.message);
    });
}


function login() {
  // ... authenticate the user ...

  if (rememberMeChecked) {
    // Set a long-lived authentication token in a cookie or local storage
  }
}
// Initialize the Google Sign-In API with your client ID
function initializeGoogleSignIn() {
  google.accounts.id.initialize({
    client_id: '',
    callback: handleGoogleSignIn,
    auto_select: true,
  });
}

// Handle the Google sign-in response
function handleGoogleSignIn(response) {
  // Process the response, for example, send the user's ID token to your server for authentication
  const idToken = response.credential;
  // ... send the ID token to the server for authentication ...

  // Redirect the user to the desired page or perform other actions
  window.location.href = '/dashboard';
}

// Call the initialization function when the Google Sign-In API script has loaded
window.onload = initializeGoogleSignIn;
const firebaseConfig = {
  // Your Firebase project's configuration object
};

firebase.initializeApp(firebaseConfig);

// Handle Google sign-in
function handleGoogleSignIn() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(result => {
      // Handle successful sign-in
      const user = result.user;
      // ... do something with the user information ...
    })
    .catch(error => {
      // Handle sign-in error
      console.error(error);
    });
}
// Global variable to store the tasks
let tasks = [];

// Function to add a task to the task list
function addTask() {
  const taskInput = document.createElement('input');
  taskInput.type = 'text';
  taskInput.placeholder = 'Task';
  taskInput.required = true;

  const taskItem = document.createElement('li');
  taskItem.appendChild(taskInput);

  const taskList = document.getElementById('task-list');
  taskList.appendChild(taskItem);
}

// Function to handle form submission and create a new routine
function createRoutine(event) {
  event.preventDefault();

  // Get the routine name and description
  const routineName = document.getElementById('routine-name').value;
  const routineDescription = document.getElementById('routine-description').value;

  // Get all the tasks
  const taskInputs = document.querySelectorAll('#task-list input');
  tasks = Array.from(taskInputs).map(input => input.value);

  // Create the routine object
  const routine = {
    name: routineName,
    description: routineDescription,
    tasks: tasks,
    completed: false
  };

  // Clear the form
  document.getElementById('routine-form').reset();
  tasks = []; // Reset the tasks array

  // Add the routine to the list
  addRoutineToList(routine);
}

// Function to add a routine to the routine list
function addRoutineToList(routine) {
  const routineList = document.getElementById('routine-list');

  const routineItem = document.createElement('div');
  routineItem.classList.add('routine-item');

  const routineName = document.createElement('h3');
  routineName.textContent = routine.name;
  routineItem.appendChild(routineName);

  const routineDescription = document.createElement('p');
  routineDescription.textContent = routine.description;
  routineItem.appendChild(routineDescription);

  const taskList = document.createElement('ul');
  routine.tasks.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.textContent = task;
    taskList.appendChild(taskItem);
  });
  routineItem.appendChild(taskList);

  const completeButton = document.createElement('button');
  completeButton.textContent = 'Complete';
  completeButton.addEventListener('click', () => {
    completeRoutine(routineItem);
  });
  routineItem.appendChild(completeButton);

  routineList.appendChild(routineItem);
}

// Function to mark a routine as completed
function completeRoutine(routineItem) {
  routineItem.classList.add('completed');
}

// Event listener for form submission
document.getElementById('routine-form').addEventListener('submit', createRoutine);
// Function to mark a routine as completed
function completeRoutine(routineItem) {
  routineItem.classList.add('completed');
}

// Event delegation to handle the click event on "Complete" buttons
document.addEventListener('click', function(event) {
  if (event.target.matches('.complete-button')) {
    const routineItem = event.target.closest('.routine-card');
    completeRoutine(routineItem);
  }
});
document.getElementById("login-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission
  // Handle form submission logic here
  
  return false; // Prevent form from clearing
});
// Set background image for homepage
document.querySelector(".container.homepage").style.backgroundImage = "url(path/to/homepage-image.jpg)";

// Set background image for sign-up page
document.querySelector(".container.signup-page").style.backgroundImage = "url(path/to/signup-page-image.jpg)";

