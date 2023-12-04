const apiUrl = 'http://localhost:3000/api/reviews';

async function fetchReviews(searchQuery = '') {
  try {
    const response = await fetch(`${apiUrl}?search=${searchQuery}`);
    const reviews = await response.json();
    renderReviews(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
  }
}

// Call the fetchReviews function with the searchQuery when the page loads
document.addEventListener('DOMContentLoaded', function () {
  const reviewsContainer = document.querySelector('.reviewsContainer');

  // Get the search query from the URL
  const searchQuery = new URLSearchParams(window.location.search).get('search');

  // Fetch and render reviews for the search query
  fetchReviews(searchQuery);
});

// Function to dynamically render reviews on the page
function renderReviews(reviews) {
  const reviewsContainer = document.querySelector('.reviewsContainer');
  // Clear existing content
  reviewsContainer.innerHTML = '';

  // Loop through reviews and create HTML elements for each
  reviews.forEach((review) => {
    const card = document.createElement('div');
    card.classList.add('card');

    // Create card content based on review properties
    // (you can customize this part based on your review structure)
    card.innerHTML = `
      <h3>${review.title}</h3>
      <p>${review.body}</p>
      <div class="rating">
        <p>Rating: ${review.rating ? 'recommended' : 'not recommended'}</p>
      </div>
      <div class="establishmentProfile">
        <img src="${review.image}" alt="Review Image">
      </div>
      <!-- Add more properties as needed -->

      <!-- Add helpful/unhelpful buttons, edit/delete buttons, etc. -->
    `;

    reviewsContainer.appendChild(card);
  });
}

// Event listener for the search button
document.addEventListener('DOMContentLoaded', function () {
  const searchButton = document.querySelector('.search-container button');
  searchButton.addEventListener('click', function () {
    const searchQuery = document.getElementById('search').value;
    // Redirect to the result page with the search query
    window.location.href = `/result?search=${searchQuery}`;
  });
});
