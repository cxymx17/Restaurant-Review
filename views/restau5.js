// Update the URL to match your actual server address
const apiUrl = 'http://localhost:3000/api/reviews';

// Function to fetch reviews
async function fetchReviews(selectedCategoryId) {
  try {
    const response = await fetch(`${apiUrl}?categoryID=${selectedCategoryId}`);
    const reviews = await response.json();
    renderReviews(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
  }
}

// Call the fetchReviews function with the selectedCategoryId when the page loads
document.addEventListener('DOMContentLoaded', function () {
  const reviewsContainer = document.querySelector('.reviewsContainer');

  // Get the selected category ID from the hidden input
  const selectedCategoryId = document.querySelector('input[name="categoryID"]').value;

  // Fetch and render reviews for the selected category
  fetchReviews(selectedCategoryId);
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

// Call the fetchReviews function when the page loads
document.addEventListener('DOMContentLoaded', fetchReviews);


document.addEventListener('DOMContentLoaded', function () {
    const submitButton = document.getElementById('send');
  
    if (submitButton) {
      submitButton.addEventListener('click', async function () {
        const title = document.getElementById('titleTextArea').value;
        const body = document.getElementById('bodyTextArea').value;
        const recommendation = document.querySelector('input[name="recommendation"]:checked')?.value || '';
        const fileInput = document.getElementById('file');
        const file = fileInput.files[0];
  
        // Use FormData to handle the file upload
        const formData = new FormData();
        formData.append('title', title);
        formData.append('body', body);
        formData.append('recommendation', recommendation);
        formData.append('file', file);
  
        try {
          // Send the review data to the server
          const response = await fetch('/submitReview', {
            method: 'POST',
            body: formData,
          });
  
          if (response.ok) {
            console.log('Review submitted successfully');
            // You might want to redirect the user or update the UI here
          } else {
            console.error('Failed to submit review');
          }
        } catch (error) {
          console.error('Error submitting review:', error);
        }
      });
    }
  });


   // Assuming you have elements with class 'helpfulButton' and 'unhelpfulButton'
const helpfulButtons = document.querySelectorAll('.helpfulUnhelpfulButton helpfulButton');
const unhelpfulButtons = document.querySelectorAll('.helpfulUnhelpfulButton unhelpfulButton');

helpfulButtons.forEach(button => {
    button.addEventListener('click', async () => {
        const reviewId = button.closest('.reviewCard').dataset.reviewId;
        try {
            const response = await fetch(`/api/reviews/${reviewId}/helpful`, {
                method: 'PUT'
            });
            if (response.ok) {
                console.log('Marked as helpful');
                const countElement = button.closest('.reviewCard').querySelector('.helpfulUnhelpfulCount');
                countElement.textContent = parseInt(countElement.textContent) + 1; // Update count in UI
            } else {
                console.error('Failed to mark as helpful');
            }
        } catch (error) {
            console.error('Error marking as helpful:', error);
        }
    });
});

unhelpfulButtons.forEach(button => {
    button.addEventListener('click', async () => {
        const reviewId = button.closest('.reviewCard').dataset.reviewId;
        try {
            const response = await fetch(`/api/reviews/${reviewId}/unhelpful`, {
                method: 'PUT'
            });
            if (response.ok) {
                console.log('Marked as unhelpful');
                const countElement = button.closest('.reviewCard').querySelector('.helpfulUnhelpfulCount');
                countElement.textContent = parseInt(countElement.textContent) + 1; // Update count in UI
            } else {
                console.error('Failed to mark as unhelpful');
            }
        } catch (error) {
            console.error('Error marking as unhelpful:', error);
        }
    });
});