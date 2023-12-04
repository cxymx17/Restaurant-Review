const registerButton = document.getElementById("register");
const loginButton = document.getElementById("login");
const container = document.getElementById("card");

registerButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

loginButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

function updatePreview(event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const preview = document.getElementById('avatar-preview');
      preview.src = e.target.result;
    }

    reader.readAsDataURL(file);
  }
}

// Add this function to handle the alert
function showAlert(message) {
  const alertContainer = document.getElementById('alert-container');
  const alertMessage = document.getElementById('alert-message');

  alertMessage.textContent = message;
  alertContainer.style.display = 'block';

  // Hide the alert after a certain duration (e.g., 3 seconds)
  setTimeout(() => {
    alertContainer.style.display = 'none';
  }, 3000);
}

document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('login-form');

  if (loginForm) {
    loginForm.addEventListener('submit', async function (event) {
      event.preventDefault();

      // Perform form validation and submit
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const rememberMeCheckbox = document.getElementById('checkbox');

      if (!username || !password) {
        showAlert('Username and password are required.');
        return;
      }

      // Submit the form using Fetch API
      try {
        const response = await fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.status === 200) {
          // Successful login
          showAlert('Login successful');

          // Check if "Remember me" is selected
          if (rememberMeCheckbox && rememberMeCheckbox.checked) {
            // Store a persistent token in localStorage
            localStorage.setItem('rememberedUsername', username);
            localStorage.setItem('rememberMeToken', 'your_persistent_token_here');
          }

          window.location.href = '/home';
        } else {
          // Display an error alert
          showAlert(data.error || 'Invalid username or password.');
        }
      } catch (error) {
        console.error('Error during login:', error);
        showAlert('Internal Server Error. Please try again later.');
      }
    });

    // Check for the presence of a persistent token on page load
    const rememberedUsername = localStorage.getItem('rememberedUsername');
    const rememberMeToken = localStorage.getItem('rememberMeToken');
    
    if (rememberedUsername && rememberMeToken) {
      // Automatically populate the username and mark the checkbox as checked
      document.getElementById('username').value = rememberedUsername;
      document.getElementById('checkbox').checked = true;
    }
  }
});

function validateRegistrationForm() {
  const fullname = document.getElementsByName('fullname')[0].value;
  const username = document.getElementsByName('username')[0].value;
  const password = document.getElementsByName('password')[0].value;

  // Validate required fields
  if (!fullname || !username || !password) {
    alert('All fields (except Description) are required for registration.');
    return false;
  }

  return true;
}

document.addEventListener('DOMContentLoaded', function () {
  const registrationForm = document.getElementById('registration-form');

  if (registrationForm) {
    registrationForm.addEventListener('submit', function (event) {
      event.preventDefault();

      // Call the validateRegistrationForm function
      const isValid = validateRegistrationForm();

      if (isValid) {
        // If the form is valid, you can proceed with form submission
        registrationForm.submit();
      }
    });
  }
});

