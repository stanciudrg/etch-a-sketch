// Variables

let mainContainer = document.querySelector('.main-container');
let gridsContainer = document.querySelector('.grids-container');
let gridSquareX;
let gridSquareY;
let squareCount = 16;
let squareColor = '#000000';
let mouseDown;
let penButton = document.querySelector('.pen-button');
let eraserButton = document.querySelector('.eraser-button');
let randomButton = document.querySelector('.random-button');
let gridLinesButton = document.querySelector('.grid-lines-button');
let clearButton = document.querySelector('.clear-button');
let slider = document.querySelector('.slider');
let sliderOutput = document.querySelector('.slider-output');
let colorPicker = document.querySelector('.color-picker');
drawSketch();

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
            gridSquareY.style.backgroundColor = 'rgb(255, 255, 255)';
            gridSquareX.appendChild(gridSquareY)

        };

    }
}

function generateRandomColor() {

    function generateRandomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min)
    };

    let { hue, saturation, lightness } = {
        hue: generateRandomNumber(0, 360),
        saturation: 100,
        lightness: generateRandomNumber(50, 80)
    };

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

// The event listener verifies whether the click button is being held down to determine 
// whether the color of each square hovered by the mouse should be changed.

gridsContainer.addEventListener('mouseover', (e) => {
    e.preventDefault();
    if (mouseDown && randomButton.classList.contains('selected')) {
        e.target.style.backgroundColor = generateRandomColor();
    } else if (mouseDown) {
        e.target.style.backgroundColor = squareColor;
    }
});

// Event listener for touch devices

gridsContainer.addEventListener('touchstart', (e) => {
    e.target.style.backgroundColor = squareColor;
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

slider.addEventListener('input', (e) => {
    sliderOutput.textContent = `${e.target.value} x ${e.target.value}`;
    squareCount = e.target.value;
    gridsContainer.innerHTML = "";
    drawSketch();
    if (!gridLinesButton.classList.contains('selected')) {
        gridsContainer.childNodes.forEach((gridSquareX) => gridSquareX.childNodes.forEach((gridSquareY) => gridSquareY.classList.add('grid-lines')));
    }
});

colorPicker.addEventListener('input', (e) => {
    squareColor = e.target.value;
});

colorPicker.addEventListener('click', (e) => {
    squareColor = colorPicker.value;
    penButton.classList.add('selected');
    eraserButton.classList.remove('selected');
    randomButton.classList.remove('selected');
})

penButton.addEventListener('click', (e) => {
    squareColor = colorPicker.value;;
    penButton.classList.add('selected');
    eraserButton.classList.remove('selected');
    randomButton.classList.remove('selected');
    colorPicker.style.cursor = 'pointer';
    colorPicker.style.pointerEvents = 'auto';
});

eraserButton.addEventListener('click', (e) => {
    squareColor = '#FFFFFF';
    eraserButton.classList.add('selected');
    penButton.classList.remove('selected');
    randomButton.classList.remove('selected');
    colorPicker.style.cursor = 'pointer';
    colorPicker.style.pointerEvents = 'auto';
});

randomButton.addEventListener('click', (e) => {
    randomButton.classList.add('selected');
    penButton.classList.remove('selected');
    eraserButton.classList.remove('selected');
    colorPicker.style.cursor = 'default';
    colorPicker.style.pointerEvents = 'none';
});

gridLinesButton.addEventListener('click', (e) => {
    gridLinesButton.classList.toggle('selected');
    gridsContainer.childNodes.forEach((gridSquareX) => gridSquareX.childNodes.forEach((gridSquareY) => gridSquareY.classList.toggle('grid-lines')))
});

clearButton.addEventListener('click', (e) => {
    gridsContainer.innerHTML = "";
    drawSketch();
    if (!gridLinesButton.classList.contains('selected')) {
        gridsContainer.childNodes.forEach((gridSquareX) => gridSquareX.childNodes.forEach((gridSquareY) => gridSquareY.classList.add('grid-lines')));
    }
    if (eraserButton.classList.contains('selected')) {
        penButton.classList.add('selected');
        eraserButton.classList.remove('selected');
        squareColor = colorPicker.value;
    }
});

clearButton.addEventListener('mousedown', (e) => {
    clearButton.classList.toggle('selected');
});

clearButton.addEventListener('mouseup', (e) => {
    clearButton.classList.remove('selected');
});

clearButton.addEventListener('mouseleave', (e) => {
    clearButton.classList.remove('selected');
});