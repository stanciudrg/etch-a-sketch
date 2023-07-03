// Variables

let gridsContainer = document.querySelector('.grids-container');
let squareCount = 16;
let squareColor = '#000000';
let progressiveColor = 100;
let gridSquareX;
let gridSquareY;
let penButton = document.querySelector('.pen-button');
let eraserButton = document.querySelector('.eraser-button');
let randomButton = document.querySelector('.random-button');
let progressiveButton = document.querySelector('.progressive-button');
let gridLinesButton = document.querySelector('.grid-lines-button');
let clearButton = document.querySelector('.clear-button');
let mouseDown;
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

function darkenColor() {

    function darken() {
        progressiveColor -= 10;
        return progressiveColor;
    }


    let { hue, saturation, lightness } = {
        hue: 0,
        saturation: 0,
        lightness: darken()
    }

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;

}

// The event listener verifies whether the click button is being held down to determine 
// whether the color of each square hovered by the mouse should be changed.

gridsContainer.addEventListener('mouseover', (e) => {
    e.preventDefault();
    if (mouseDown && randomButton.classList.contains('random-selected')) {
        e.target.style.backgroundColor = generateRandomColor();
    } else if (mouseDown && progressiveButton.classList.contains('progressive-selected')) {
        switch (e.target.style.backgroundColor) {
            case 'rgb(255, 255, 255)':
                progressiveColor = 100;
                e.target.style.backgroundColor = darkenColor();
                break;
            case 'rgb(230, 230, 230)':
                progressiveColor = 90;
                e.target.style.backgroundColor = darkenColor();
                break;
            case 'rgb(204, 204, 204)':
                progressiveColor = 80;
                e.target.style.backgroundColor = darkenColor();
                break;
            case 'rgb(179, 179, 179)':
                progressiveColor = 70;
                e.target.style.backgroundColor = darkenColor();
                break;
            case 'rgb(153, 153, 153)':
                progressiveColor = 60;
                e.target.style.backgroundColor = darkenColor();
                break;
            case 'rgb(128, 128, 128)':
                progressiveColor = 50;
                e.target.style.backgroundColor = darkenColor();
                break;
            case 'rgb(102, 102, 102)':
                progressiveColor = 40;
                e.target.style.backgroundColor = darkenColor();
                break;
            case 'rgb(77, 77, 77)':
                progressiveColor = 30;
                e.target.style.backgroundColor = darkenColor();
                break;
            case 'rgb(51, 51, 51)':
                progressiveColor = 20;
                e.target.style.backgroundColor = darkenColor();
                break;
            case 'rgb(26, 26, 26)':
                progressiveColor = 10;
                e.target.style.backgroundColor = darkenColor();
                break;
            case 'rgb(0, 0, 0)':
                progressiveColor = 0;
                e.target.style.backgroundColor = darkenColor();
                break;
            default:
                progressiveColor = 100;
                e.target.style.backgroundColor = darkenColor();
        }
    }
    else if (mouseDown) {
        e.target.style.backgroundColor = squareColor;
    }
});

gridsContainer.addEventListener('mousedown', (e) => {
    e.preventDefault();
    if (randomButton.classList.contains('random-selected')) {
        e.target.style.backgroundColor = generateRandomColor();
    } else if (progressiveButton.classList.contains('progressive-selected')) {
        switch (e.target.style.backgroundColor) {
            case 'rgb(255, 255, 255)':
                progressiveColor = 100;
                e.target.style.backgroundColor = darkenColor();
                break;
            case 'rgb(230, 230, 230)':
                progressiveColor = 90;
                e.target.style.backgroundColor = darkenColor();
                break;
            case 'rgb(204, 204, 204)':
                progressiveColor = 80;
                e.target.style.backgroundColor = darkenColor();
                break;
            case 'rgb(179, 179, 179)':
                progressiveColor = 70;
                e.target.style.backgroundColor = darkenColor();
                break;
            case 'rgb(153, 153, 153)':
                progressiveColor = 60;
                e.target.style.backgroundColor = darkenColor();
                break;
            case 'rgb(128, 128, 128)':
                progressiveColor = 50;
                e.target.style.backgroundColor = darkenColor();
                break;
            case 'rgb(102, 102, 102)':
                progressiveColor = 40;
                e.target.style.backgroundColor = darkenColor();
                break;
            case 'rgb(77, 77, 77)':
                progressiveColor = 30;
                e.target.style.backgroundColor = darkenColor();
                break;
            case 'rgb(51, 51, 51)':
                progressiveColor = 20;
                e.target.style.backgroundColor = darkenColor();
                break;
            case 'rgb(26, 26, 26)':
                progressiveColor = 10;
                e.target.style.backgroundColor = darkenColor();
                break;
            case 'rgb(0, 0, 0)':
                progressiveColor = 0;
                e.target.style.backgroundColor = darkenColor();
                break;
            default:
                progressiveColor = 100;
                e.target.style.backgroundColor = darkenColor();
        }
    } else {
        e.target.style.backgroundColor = squareColor;
    }
});

// Event listener for touch devices

gridsContainer.addEventListener('touchmove', (e) => {
    let touch = e.touches[0];
    let square = document.elementFromPoint(touch.clientX, touch.clientY);
    if (square && square.classList.contains('y-grid-square')) {
        if (randomButton.classList.contains('random-selected')) {
            square.style.backgroundColor = generateRandomColor();
        } else if (progressiveButton.classList.contains('progressive-selected')) {
            switch (square.style.backgroundColor) {
                case 'rgb(255, 255, 255)':
                    progressiveColor = 100;
                    square.style.backgroundColor = darkenColor();
                    break;
                case 'rgb(230, 230, 230)':
                    progressiveColor = 90;
                    square.style.backgroundColor = darkenColor();
                    break;
                case 'rgb(204, 204, 204)':
                    progressiveColor = 80;
                    square.style.backgroundColor = darkenColor();
                    break;
                case 'rgb(179, 179, 179)':
                    progressiveColor = 70;
                    square.style.backgroundColor = darkenColor();
                    break;
                case 'rgb(153, 153, 153)':
                    progressiveColor = 60;
                    square.style.backgroundColor = darkenColor();
                    break;
                case 'rgb(128, 128, 128)':
                    progressiveColor = 50;
                    square.style.backgroundColor = darkenColor();
                    break;
                case 'rgb(102, 102, 102)':
                    progressiveColor = 40;
                    square.style.backgroundColor = darkenColor();
                    break;
                case 'rgb(77, 77, 77)':
                    progressiveColor = 30;
                    square.style.backgroundColor = darkenColor();
                    break;
                case 'rgb(51, 51, 51)':
                    progressiveColor = 20;
                    square.style.backgroundColor = darkenColor();
                    break;
                case 'rgb(26, 26, 26)':
                    progressiveColor = 10;
                    square.style.backgroundColor = darkenColor();
                    break;
                case 'rgb(0, 0, 0)':
                    progressiveColor = 0;
                    square.style.backgroundColor = darkenColor();
                    break;
                default:
                    progressiveColor = 100;
                    square.style.backgroundColor = darkenColor();
            }
        } else {
            square.style.backgroundColor = squareColor;
        }
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
    progressiveButton.classList.remove('progressive-selected');
    randomButton.classList.remove('random-selected');
})

penButton.addEventListener('click', (e) => {
    squareColor = colorPicker.value;;
    penButton.classList.add('selected');
    eraserButton.classList.remove('selected');
    randomButton.classList.remove('random-selected');
    progressiveButton.classList.remove('progressive-selected');
    colorPicker.style.cursor = 'pointer';
    colorPicker.style.pointerEvents = 'auto';
});

eraserButton.addEventListener('click', (e) => {
    squareColor = '#FFFFFF';
    eraserButton.classList.add('selected');
    penButton.classList.remove('selected');
    randomButton.classList.remove('random-selected');
    progressiveButton.classList.remove('progressive-selected');
    colorPicker.style.cursor = 'pointer';
    colorPicker.style.pointerEvents = 'auto';
});

randomButton.addEventListener('click', (e) => {
    randomButton.classList.add('random-selected');
    penButton.classList.remove('selected');
    eraserButton.classList.remove('selected');
    progressiveButton.classList.remove('progressive-selected');
    colorPicker.style.cursor = 'default';
    colorPicker.style.pointerEvents = 'none';
});

progressiveButton.addEventListener('click', (e) => {
    progressiveButton.classList.add('progressive-selected');
    penButton.classList.remove('selected');
    eraserButton.classList.remove('selected');
    randomButton.classList.remove('random-selected');
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