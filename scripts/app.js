function init() {

  // * Variables
  //calls the grid container
  const grid = document.querySelector('.grid')
  
  // var the width so you can manipulate the size whenever
  const width = 12
  const height = width * 2
  const cellCount = height * width
  const cells = []

  // * Make a grid
  // needs an argument for position
  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      //
      grid.appendChild(cell)
      cells.push(cell)
    }
  }

  createGrid()
 
}

window.addEventListener('DOMContentLoaded', init)