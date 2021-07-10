const gridHolder = document.querySelector("#grid-holder");
const brushSelect = document.querySelector("#brush-select");
const clearButton = document.querySelector("#clear-btn");
const resizeGridButton = document.querySelector("#resize-grid-btn");
const cellPool = document.querySelector("#cell-pool");

createCells();
createGrid(gridHolder);
clearButton.onclick = clearGrid;
resizeGridButton.onclick = resizeGrid;

function createCells(){
    for(j = 0; j < 10000; j++) {
        const gridCell= document.createElement("div");
        gridCell.setAttribute("class", "unused-cell");
        cellPool.appendChild(gridCell);
    }
}

function createGrid(gridHolder) {
    let gridSize = getGridSize();

    gridHolder.style["grid-template-rows"] = `repeat(${gridSize} 1fr)`;
    gridHolder.style["grid-template-columns"] = `repeat(${gridSize} 1fr)`;

    for(i = 1; i <= gridSize; i++) {
        for(j = 1; j <= gridSize; j++) {
            const gridCell= document.querySelector(".unused-cell");

            gridCell.style["grid-area"] =`${i}/${j}`;
            gridCell.style["background-color"] = "rgb(255, 255, 255)";

            gridCell.removeAttribute("class");
            gridCell.setAttribute("class", "used-cell");

            gridHolder.appendChild(gridCell);

            gridCell.addEventListener("mouseenter", e => {
                gridCell.setAttribute("id", "current-cell");
                paintCell();
            });
        }
    }
}

function clearGrid() {
    const allCells = Array.from(document.querySelectorAll(".used-cell"));
    
    allCells.forEach(cell => {
        cell.style["background-color"] = "rgb(255, 255, 255)";
    });
}

function resizeGrid() {
    const allCells = Array.from(document.querySelectorAll(".used-cell"));
    
    allCells.forEach(cell => {
        cell.removeAttribute("class");
        cell.setAttribute("class", "unused-cell");
        storeCell(cell);
    });

    function storeCell(cell) {
        cellPool.appendChild(cell)
    }

    createGrid(gridHolder);
}

function getGridSize() {
    let gridSize = Number(prompt("Please enter the desired grid size (from 1 to 100):"));

    if(Number.isNaN(gridSize)|| gridSize == 0) {
        gridSize = 10;

        alert("Oh, you cheeky! I can't work whith that value, so you'll get a 10x10 grid.");
    } else if(gridSize > 100) {
        gridSize = 100;
        alert("Oh, you cheeky! I can't work whith that value, so you'll get a 100x100 grid.");
    }
    return gridSize;
}

function paintCell() {
    const currentCell = document.querySelector("#current-cell");
    const currentBrush = brushSelect.value;

    let currentCellColor = currentCell.style.backgroundColor;
    currentCellColor = currentCellColor.replace("rgb(","").replaceAll(",","").replace(")","");
    const currentRGBValue = currentCellColor.split(" ");

    let r = Number(currentRGBValue[0]);
    let g = Number(currentRGBValue[1]);
    let b = Number(currentRGBValue[2]);

    switch(currentBrush) {
        case "pen":
            r = 0;
            g = 0;
            b = 0;
            break;
        case "shadow-air-brush":
            r -= 20;
            g -= 20;
            b -= 20;
            break;
        case "light-air-brush":
            r += 20;
            g += 20;
            b += 20;
            break;    
        case "magic-pencil":
            r = Math.floor(Math.random() * 256);
            g = Math.floor(Math.random() * 256);
            b = Math.floor(Math.random() * 256);
            break;
        case "negativator":
            r = 255 - r;
            g = 255 - g;
            b = 255 - b;
            break;
        case "eraser":
            r = 255;
            g = 255;
            b = 255;
            break;
        default:
    }
    
    const newCellColor = "rgb(" + r + "," + g + "," + b + ")";
    currentCell.style["background-color"] = newCellColor;   
    currentCell.removeAttribute("id");
}