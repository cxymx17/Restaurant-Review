// profile.js

// Assuming you have an API endpoint for fetching user profile data
const apiUrl = 'http://localhost:3000/api/profile';

// Function to fetch and render user profile
async function fetchUserProfile() {
  try {
    const response = await fetch(apiUrl);
    const user = await response.json();

    console.log('Fetched user profile:', user);

    // Call a function to dynamically render the user profile on the page
    renderUserProfile(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
  }
}

// Function to dynamically render user profile on the page
function renderUserProfile(user) {
  const profileContainer = document.querySelector('.profileContainer');
  // Clear existing content
  profileContainer.innerHTML = '';

  // Create HTML elements for user profile
  const profileCard = document.createElement('div');
  profileCard.classList.add('profileCard');

  // Customize this part based on your user data structure
  profileCard.innerHTML = `
    <h2>${user.fullname}</h2>
    <p>${user.username}</p>
    <p>${user.description}</p>
    <!-- Add more properties as needed -->
  `;

  profileContainer.appendChild(profileCard);
}


// Call the fetchUserProfile function when the page loads
document.addEventListener('DOMContentLoaded', fetchUserProfile);
