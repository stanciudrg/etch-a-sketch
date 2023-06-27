// Variables

let mainContainer = document.querySelector('.main-container');
let gridsContainer = document.querySelector('.grids-container');
let gridSquareX;
let gridSquareY;
let squareCount = 32;

// The main loop draws 16 squares on the x axis, while the nested loop draws 16
// squares on the y axis for each square on the x axis.

for (let i = 0; i < squareCount; i++) {

    gridSquareX = document.createElement('div');
    gridSquareX.classList.add('x-grid-square');
    gridsContainer.appendChild(gridSquareX);

    for (let j = 0; j < squareCount; j++) {

        gridSquareY = document.createElement('div');
        gridSquareY.classList.add('y-grid-square');
        gridSquareX.appendChild(gridSquareY)

    };

}

// The event listener verifies whether the click button is being held down to determine 
// whether the color of each square hovered by the mouse should be changed.

gridsContainer.addEventListener('mousemove', (e) => {
    if (mouseDown) {
        e.preventDefault();
        e.target.classList.add('clicked');
    }
});

// mouseDown is true while the left click button of the mouse is being held down and false
// in any other instances.

gridsContainer.addEventListener('mousedown', (e) => {
    e.preventDefault();
    mouseDown = true;
});

gridsContainer.addEventListener('mouseup', (e) => {
    e.preventDefault();
    mouseDown = false;
});

gridsContainer.addEventListener('mouseleave', (e) => {
    e.preventDefault();
    mouseDown = false;
});

// Event listener for touch devices

gridsContainer.addEventListener('touchstart', (e) => {
    e.target.classList.add('clicked');
});
