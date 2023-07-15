// Get references to HTML elements
const loginForm = document.querySelector('.login-form');
const usernameInput = document.getElementById('usernameInput');
const passwordInput = document.getElementById('passwordInput');

// Add event listener to login form submission
loginForm.addEventListener('submit', handleLogin);

// Function to handle login form submission
function handleLogin(event) {
  event.preventDefault(); // Prevent form submission

  const username = usernameInput.value;
  const password = passwordInput.value;

  // Perform login form validation
  if (username.trim() === '' || password.trim() === '') {
    alert('Please enter your username and password.');
    return;
  }

  // Perform login form submission
  // Replace the following code with your backend API call or authentication logic
  console.log('Login form submitted!');
  console.log('Username:', username);
  console.log('Password:', password);

  // Clear input fields
  usernameInput.value = '';
  passwordInput.value = '';
}
