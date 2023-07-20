// Variables

let currentMode = 'pen';
let squareCount = 16;
let squareColor = '#000000';
let mouseDown;

// mouseDown is true while the left click button of the mouse is being held down and false
// in any other instances.

document.addEventListener('mousedown', (e) => { mouseDown = true; });

document.addEventListener('mouseup', (e) => { mouseDown = false; });

document.addEventListener('mouseleave', (e) => { mouseDown = false; });

// Prevents dragging

document.addEventListener('dragstart', (e) => { e.preventDefault() });

//Grids container

let gridsContainer = document.querySelector('.grids-container');
gridsContainer.addEventListener('mousedown', (e) => { mouseDown = true; });
gridsContainer.addEventListener('mousedown', (paintByMouse));
gridsContainer.addEventListener('mouseover', paintByMouse);


// Grids container - Event listener for touch devices

gridsContainer.addEventListener('touchmove', paintByTouch)


// Color picker

let colorPicker = document.querySelector('.color-picker');
colorPicker.addEventListener('click', pickColor);


// Pen mode button

let penButton = document.querySelector('.pen-button');
penButton.addEventListener("click", () => changeMode('pen'));


// Eraser mode button

let eraserButton = document.querySelector('.eraser-button');
eraserButton.addEventListener("click", () => changeMode('eraser'));


// Random mode button

let randomButton = document.querySelector('.random-button');
randomButton.addEventListener("click", () => changeMode('random'));


// Progressive mode button

let progressiveButton = document.querySelector('.progressive-button');
progressiveButton.addEventListener("click", () => changeMode('progressive'));


// Size slider button

let slider = document.querySelector('.slider');

slider.addEventListener('input', (e) => {
    squareCount = e.target.value;
    let sliderOutput = document.querySelector('.slider-output');
    sliderOutput.textContent = `${e.target.value} x ${e.target.value}`;
    slider.addEventListener('mouseup', clearGrid);
    slider.addEventListener('touchend', clearGrid);
});


// Grid lines toggler button

let gridLinesButton = document.querySelector('.grid-lines-button');
gridLinesButton.addEventListener('click', toggleGridLines);


// Clear button

let clearButton = document.querySelector('.clear-button');
clearButton.addEventListener('click', clearGrid);

clearButton.addEventListener('mousedown', (e) => {
    clearButton.classList.toggle('selected');
});

clearButton.addEventListener('touchstart', (e) => {
    clearButton.classList.toggle('selected');
});

clearButton.addEventListener('mouseup', (e) => {
    clearButton.classList.remove('selected');
});

clearButton.addEventListener('touchend', (e) => {
    clearButton.classList.remove('selected');
})

clearButton.addEventListener('mouseleave', (e) => {
    clearButton.classList.remove('selected');
});


// FUNCTIONS 

// The main loop draws 16 squares on the x axis, while the nested loop draws 16
// squares on the y axis for each square on the x axis.

function drawSketch() {

    for (let i = 0; i < squareCount; i++) {

        gridSquaresX = document.createElement('div');
        gridSquaresX.classList.add('x-grid-squares');
        gridsContainer.appendChild(gridSquaresX);

        for (let j = 0; j < squareCount; j++) {

            gridSquaresY = document.createElement('div');
            gridSquaresY.classList.add('y-grid-squares');
            gridSquaresY.style.backgroundColor = 'rgb(255, 255, 255)';
            gridSquaresX.appendChild(gridSquaresY)
        };
    }

    if (gridLinesButton.classList.contains('selected')) {
        gridsContainer.childNodes.forEach((gridSquaresX) => gridSquaresX.childNodes.forEach((gridSquaresY) => gridSquaresY.classList.add('grid-lines')));
    }

}


// The functions verify whether the click button is being held down to determine 
// whether the color of each square hovered by the mouse should be changed based on the selected mode.


function paintByMouse(e) {
    if (mouseDown && currentMode === 'random') {
        generateRandomColor(e.target);
    } else if (mouseDown && currentMode === 'progressive') {
        darkenColor(e.target);
    }
    else if (mouseDown) {
        e.target.style.backgroundColor = squareColor;
    }
}

function paintByTouch(e) {
    let touch = e.touches[0];
    let target = document.elementFromPoint(touch.clientX, touch.clientY);
    if (target && target.classList.contains('y-grid-squares')) {
        if (currentMode === 'random') {
            generateRandomColor(target);
        } else if (currentMode === 'progressive') {
            darkenColor(target);
        } else {
            target.style.backgroundColor = squareColor;
        }
    }
}

function changeMode(mode) {

    switch (mode) {
        case 'pen':
            squareColor = colorPicker.value;
            penButton.classList.add('selected');
            eraserButton.classList.remove('selected');
            randomButton.classList.remove('random-selected');
            progressiveButton.classList.remove('progressive-selected');
            colorPicker.style.cursor = 'pointer';
            colorPicker.style.pointerEvents = 'auto';
            currentMode = 'pen';
            break;
        case 'eraser':
            squareColor = '#FFFFFF';
            eraserButton.classList.add('selected');
            penButton.classList.remove('selected');
            randomButton.classList.remove('random-selected');
            progressiveButton.classList.remove('progressive-selected');
            colorPicker.style.cursor = 'pointer';
            colorPicker.style.pointerEvents = 'auto';
            currentMode = 'eraser';
            break;
        case 'random':
            randomButton.classList.add('random-selected');
            penButton.classList.remove('selected');
            eraserButton.classList.remove('selected');
            progressiveButton.classList.remove('progressive-selected');
            colorPicker.style.cursor = 'default';
            colorPicker.style.pointerEvents = 'none';
            currentMode = 'random';
            break;
        case 'progressive':
            progressiveButton.classList.add('progressive-selected');
            penButton.classList.remove('selected');
            eraserButton.classList.remove('selected');
            randomButton.classList.remove('random-selected');
            colorPicker.style.cursor = 'default';
            colorPicker.style.pointerEvents = 'none';
            currentMode = 'progressive';
            break;
    }
}

function pickColor() {

    changeMode('pen')

    colorPicker.addEventListener('input', (e) => {
        squareColor = e.target.value;
    })

}

function generateRandomColor(target) {

    let { hue, saturation, lightness } = {
        hue: Math.round(Math.random() * (360 - 0) + 0),
        saturation: 100,
        lightness: Math.round(Math.random() * (80 - 50) + 50)
    };

    target.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

}

function darkenColor(target) {

    let progressiveColor = 100;

    function darken() {

        let { hue, saturation, lightness } = {
            hue: 0,
            saturation: 0,
            lightness: progressiveColor -= 10
        }

        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;

    }

    switch (target.style.backgroundColor) {
        case 'rgb(255, 255, 255)':
            progressiveColor = 100;
            target.style.backgroundColor = darken();
            break;
        case 'rgb(230, 230, 230)':
            progressiveColor = 90;
            target.style.backgroundColor = darken();
            break;
        case 'rgb(204, 204, 204)':
            progressiveColor = 80;
            target.style.backgroundColor = darken();
            break;
        case 'rgb(179, 179, 179)':
            progressiveColor = 70;
            target.style.backgroundColor = darken();
            break;
        case 'rgb(153, 153, 153)':
            progressiveColor = 60;
            target.style.backgroundColor = darken();
            break;
        case 'rgb(128, 128, 128)':
            progressiveColor = 50;
            target.style.backgroundColor = darken();
            break;
        case 'rgb(102, 102, 102)':
            progressiveColor = 40;
            target.style.backgroundColor = darken();
            break;
        case 'rgb(77, 77, 77)':
            progressiveColor = 30;
            target.style.backgroundColor = darken();
            break;
        case 'rgb(51, 51, 51)':
            progressiveColor = 20;
            target.style.backgroundColor = darken();
            break;
        case 'rgb(26, 26, 26)':
            progressiveColor = 10;
            target.style.backgroundColor = darken();
            break;
        case 'rgb(0, 0, 0)':
            progressiveColor = 0;
            target.style.backgroundColor = darken();
            break;
        default:
            progressiveColor = 100;
            target.style.backgroundColor = darken();
    }

}

function toggleGridLines() {

    gridLinesButton.classList.toggle('selected');
    gridsContainer.childNodes.forEach((gridSquaresX) => gridSquaresX.childNodes.forEach((gridSquaresY) => gridSquaresY.classList.toggle('grid-lines')))

}


function clearGrid() {

    gridsContainer.innerHTML = "";
    drawSketch();

    if (currentMode === 'eraser') {
        changeMode('pen')
    }

}

drawSketch();