// Get references to HTML elements
const signupForm = document.querySelector('.signup-form');
const usernameInput = document.getElementById('usernameInput');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');

// Add event listener to signup form submission
signupForm.addEventListener('submit', handleSignup);

// Function to handle signup form submission
function handleSignup(event) {
  event.preventDefault(); // Prevent form submission

  const username = usernameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;

  // Perform signup form validation
  if (username.trim() === '' || email.trim() === '' || password.trim() === '') {
    alert('Please fill in all fields.');
    return;
  }

  // Perform signup form submission
  // Replace the following code with your backend API call or database integration
  console.log('Signup form submitted!');
  console.log('Username:', username);
  console.log('Email:', email);
  console.log('Password:', password);

  // Clear input fields
  usernameInput.value = '';
  emailInput.value = '';
  passwordInput.value = '';
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