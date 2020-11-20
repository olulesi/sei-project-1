function init() {

  // * Variables
  //calls the grid container
  const grid = document.querySelector('.grid')
  const tetrisShape = document.querySelector('.shape')
  // var the width so you can manipulate the size whenever
  const gridWidth = 12
  const gridHeight = gridWidth * 2
  const cellCount = gridHeight *  gridWidth
  const cells = []
  const shapeWidth = 4
  const shapeCellCount = shapeWidth * shapeWidth 
  const shapeCells = []

  // * Make a grid
  // needs an argument for position
  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      // cell.textContent = i
      //
      grid.appendChild(cell)
      cells.push(cell)
    }
  }

  function tetrisShapeGrid() {
    for (let i = 0; i < shapeCellCount; i++) {
      const shapeCell = document.createElement('div')
      // cell.textContent = i
      //
      tetrisShape.appendChild(shapeCell)
      shapeCells.push(shapeCell)
    }
  }

  createGrid()
  tetrisShapeGrid()
 
}

window.addEventListener('DOMContentLoaded', init)