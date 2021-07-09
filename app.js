const gridHolder = document.querySelector("#grid-holder");
const brushSelect = document.querySelector("#brush-select");

createGrid(gridHolder);

function createGrid(gridHolder) {
    let gridSize = getGridSize();

    gridHolder.style["grid-template-rows"] = `repeat(${gridSize} 1fr)`;
    gridHolder.style["grid-template-columns"] = `repeat(${gridSize} 1fr)`;

    for(i = 1; i <= gridSize; i++) {
        for(j = 1; j <= gridSize; j++) {
            const gridCell= document.createElement("div");
            gridCell.setAttribute("class", "cell");
            gridCell.style["grid-area"] =`${i}/${j}`;
            gridCell.style["background-color"] = "rgb(255, 255, 255)";
            gridHolder.appendChild(gridCell);

            gridCell.addEventListener("mouseenter", e => {
                gridCell.setAttribute("id", "current-cell");
                paintCell();
            });
        }
    }
    /*create the needed amount of cells and position them correctly*/
}

function resizeGrid() {
    /*delete the current grid*/
    createGrid();
}

function getGridSize() {
    let gridSize = Number(prompt("Please enter the desired grid size (from 1 to 100):"));
    console.log("gridSize received: ", typeof(gridSize), gridSize);

    if(Number.isNaN(gridSize)|| gridSize == 0) {
        gridSize = 10;

        alert("Oh, you cheeky! I can't work whith that value, so you'll get a 10x10 grid.");
    } else if(gridSize > 100) {
        gridSize = 100;
        alert("Oh, you cheeky! I can't work whith that value, so you'll get a 100x100 grid.");
    }

    console.log("gridSize after treating: ",typeof(gridSize), gridSize);

    return gridSize;
}

function paintCell() {
    const currentCell = document.querySelector("#current-cell");
    const currentBrush = brushSelect.value;

    let celColor = currentCell.style.backgroundColor;
    celColor = celColor.replace("rgb(","").replaceAll(",","").replace(")","");
    const colorString = celColor.split(" ");

    let r = Number(colorString[0]);
    let g = Number(colorString[1]);
    let b = Number(colorString[2]);

    switch(currentBrush) {
        case "pen":
            r = 0;
            g = 0;
            b = 0;
            break;
        case "air-brush":
            r -= 20;
            g -= 20;
            b -= 20;
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
    
    const currentCollor = "rgb(" + r + "," + g + "," + b + ")";
    currentCell.style["background-color"] = currentCollor;   
    currentCell.removeAttribute("id");
}