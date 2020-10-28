// greeting system
let date = new Date(),
    greeting = document.querySelector('.greeting');
if (date.getHours() < 12 && date.getHours() >= 0) {
    greeting.textContent = "Good Morning,";
} else if (date.getHours() > 12 && date.getHours() <= 15) {
    greeting.textContent = "Good Afternoon,";
} else {
    greeting.textContent = "Good Evening,";
}

// Tiles Transition
let tiles = document.querySelectorAll('.category');
let categories = ['first-category', 'second-category', 'third-category', 'fourth-category', 'fifth-category'];
let currentIndex = 0;
let imageIndex = 1;

function tilesTransition() {
    if (imageIndex === 4) {
        imageIndex = 1;
        currentIndex += 1;
    }
    if (currentIndex === categories.length) {
        currentIndex = 0;
    }
    tiles[currentIndex].style.backgroundImage = `url(../img/${categories[currentIndex]}-${imageIndex}.jpg)`;
    setTimeout(tilesTransition, 2000);
    imageIndex += 1;

}
tilesTransition();