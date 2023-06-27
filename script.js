// Variables

let mainContainer = document.querySelector('.main-container');
let gridsContainer = document.querySelector('.grids-container');
let gridSquareX;
let gridSquareY;
let squareCount = 32;

// The main loop draws 16 squares on the x axis, while the nested loop draws 16
// on the y axis for each square on the x axis.

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
