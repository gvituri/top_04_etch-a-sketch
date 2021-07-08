/* Pseudocoding 
    making the grid using lose divs

    const gridHolder = document.querySelector("#grid-holder");
const gridSize = 500;
const celNumber = 16;
const cellSize = gridSize/celNumber;

gridHolder.cssText = `display: flex; flex-direction: row; flex-wrap: wrap;height: ${gridSize}px; width: ${gridSize}px`;

for (i = 0; i < (celNumber*celNumber); i++) {
    const div = document.createElement("div");
    div.style.cssText =`box-sizing: border-box;display: inline-block; height: ${cellSize}px; width: ${cellSize}px;border: 1px solid black; background-color: pink`;
    gridHolder.appendChild(div);

     div.style.cssText = `box-sizing: border-box; display: inline-block; height: ${cellSize}px; width: ${cellSize}px;border: 1px solid black; background-color: blue`;
}
  
Will try now to use a grid and place the divs inside each grid cel

*/
const body = document.querySelector("body");


const gridHolder = document.querySelector("#grid-holder");

let gridSize = prompt("Please Enter de grid size value:");
console.log("gridSize received: ",typeof(gridSize), gridSize);

createGrid(gridHolder, Number(gridSize));

function createGrid(gridHolder, gridSize) {
    console.log("gridSize in createGrid: ",typeof(gridSize), gridSize);

    if(Number.isNaN(gridSize)|| gridSize == 0) {
        gridSize = 10;

        console.log("gridSize after treating: ",typeof(gridSize), gridSize);
    } else if(gridSize > 100) {
        gridSize = 100;
        alert("Grid cannot be greater than 100 cels, sorry!");
    }

    const gridDiv = document.createElement("div");
    gridDiv.style.cssText =`height: 100%; width: 100%; box-sizing: border-box; border-top: 1px solid grey; border-left: 1px solid gray; display: grid; grid-template-rows: repeat(${gridSize} 1fr); 
        grid-template-columns: repeat(${gridSize} 1fr);`;
    gridHolder.appendChild(gridDiv);

    for(i = 0; i < gridSize; i++) {
        for(j = 0; j < gridSize; j++) {
            const gridCell= document.createElement("div");
            gridCell.setAttribute("class", "clear-cell");
            gridCell.style["grid-area"] =`${i+1}/${j+1}`;
            gridDiv.appendChild(gridCell);

            gridCell.addEventListener("mouseenter", e => {
                gridCell.removeAttribute("class");
                gridCell.setAttribute("class", "painted-cell");
                gridCell.style["background-color"] = "black";
            });
        }
    }
}





