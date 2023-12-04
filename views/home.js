document.getElementById('next').onclick = function(){
    let lists = document.querySelectorAll('.item');
    document.getElementById('slide').appendChild(lists[0]);
}
document.getElementById('prev').onclick = function(){
    let lists = document.querySelectorAll('.item');
    document.getElementById('slide').prepend(lists[lists.length - 1]);
}
function nextSlide() {
    let lists = document.querySelectorAll('.item');
    document.getElementById('slide').appendChild(lists[0]);
}

function startAutoSlide() {
    // Set the interval in milliseconds (e.g., 3000ms = 3 seconds)
    const interval = 5000;
    return setInterval(nextSlide, interval);
}

// Start auto-sliding when the page loads
let autoSlideInterval = startAutoSlide();


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
