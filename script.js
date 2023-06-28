// Variables

let mainContainer = document.querySelector('.main-container');
let gridsContainer = document.querySelector('.grids-container');
let gridSquareX;
let gridSquareY;
let squareCount = 16;
let squareColor = '#000000';
let mouseDown;
let slider = document.querySelector('.slider');
let sliderOutput = document.querySelector('.slider-output');
drawSketch();
let colorPicker = document.querySelector('.color-picker');

// The main loop draws 16 squares on the x axis, while the nested loop draws 16
// squares on the y axis for each square on the x axis.

function drawSketch() {
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
}

// The event listener verifies whether the click button is being held down to determine 
// whether the color of each square hovered by the mouse should be changed.

gridsContainer.addEventListener('mousemove', (e) => {
    if (mouseDown) {
        e.preventDefault();
        e.target.style.backgroundColor = squareColor;
    }
});

// mouseDown is true while the left click button of the mouse is being held down and false
// in any other instances.

document.addEventListener('dragstart', (e) => {
    e.preventDefault()
});

document.addEventListener('mousedown', (e) => {
    mouseDown = true;
});

document.addEventListener('mouseup', (e) => {
    mouseDown = false;
});

document.addEventListener('mouseleave', (e) => {
    mouseDown = false;
});

// Event listener for touch devices

gridsContainer.addEventListener('touchstart', (e) => {
    e.target.style.backgroundColor = squareColor;
});

slider.addEventListener('input', (e) => {
    sliderOutput.textContent = `${e.target.value} x ${e.target.value}`;
    squareCount = e.target.value;
    gridsContainer.innerHTML = "";
    drawSketch();
});

colorPicker.addEventListener('input', (e) => {
    squareColor = e.target.value;
});
