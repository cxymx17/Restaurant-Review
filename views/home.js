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

