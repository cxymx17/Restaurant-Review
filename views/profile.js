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


/*
document.addEventListener('DOMContentLoaded', () => {
  const deleteButtons = document.querySelectorAll('.deleteButton');

  deleteButtons.forEach(deleteButton => {
    deleteButton.addEventListener('click', async () => {
      const reviewId = deleteButton.dataset.reviewId;
      const confirmDelete = confirm('Are you sure you want to delete this review?');
      
      if (confirmDelete) {
        try {
          const response = await fetch(`/reviews/${reviewId}`, {
            method: 'DELETE'
          });

          if (response.ok) {
            console.log('Review deleted successfully');
            // Optionally, update the UI or remove the deleted review from the page
          } else {
            console.error('Failed to delete review');
          }
        } catch (error) {
          console.error('Error deleting review:', error);
        }
      }
    });
  });
});
*/
document.addEventListener('DOMContentLoaded', () => {
  const deleteButtons = document.querySelectorAll('.deleteButton');

  deleteButtons.forEach(deleteButton => {
    deleteButton.addEventListener('click', async () => {
      const reviewId = deleteButton.dataset.reviewId;
      const confirmDelete = confirm('Are you sure you want to delete this review?');
      
      if (confirmDelete) {
        try {
          const response = await fetch(`/reviews/${reviewId}`, {
            method: 'DELETE'
          });

          if (response.ok) {
            console.log('Review deleted successfully');
            // Remove the deleted review's DOM element from the UI
            deleteButton.closest('.card').remove();
          } else {
            console.error('Failed to delete review');
          }
        } catch (error) {
          console.error('Error deleting review:', error);
        }
      }
    });
  });
});


// Event listener for the search button
document.addEventListener('DOMContentLoaded', function () {
  const searchButton = document.querySelector('.search-container button');
  searchButton.addEventListener('click', searchReviews);
});

// restau1.js or wherever you handle the search
async function searchReviews() {
  const searchQuery = document.getElementById('search').value;

  try {
    // Redirect to the result page with the search query
    window.location.href = `/result?search=${searchQuery}`;
  } catch (error) {
    console.error('Error redirecting to result page:', error);
  }
}




// Call the fetchUserProfile function when the page loads
document.addEventListener('DOMContentLoaded', fetchUserProfile);
