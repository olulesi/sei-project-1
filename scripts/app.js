function init() {

  // * Variables
  //calls the grid container
  const grid = document.querySelector('.grid')
  const tetrisShape = document.querySelector('.shape')
  const start = document.querySelector('#start')

  // var the width so you can manipulate the size whenever
  const gridWidth = 12
  const gridHeight = gridWidth * 2
  const cellCount = gridHeight *  gridWidth
  const cells = []
  const shapeWidth = 4
  const shapeCellCount = shapeWidth * shapeWidth 
  const shapeCells = []
  let startPosition = 6
  const currShape = generateRandomShapeIndex()
  

  const shapes = [
    {
      name: 'boxShape',
      position2: 1,
      position3: 12,
      position4: 13,

    },
    {
      name: 'Zshape',
      position2: 12,
      position3: 13,
      position4: 25,
    }
  ]
  

  // * Make a grid
  // needs an argument for position
  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.setAttribute('data-index', i)
      // cell.textContent = i
      cells.push(cell)
      grid.appendChild(cell)
    }
    addShape(startPosition)
  }

  function removeShape(position) {
    
    cells[position].classList.remove(`${shapes[currShape].name}`)
    cells[position + shapes[currShape].position2].classList.remove(`${shapes[currShape].name}`)
    cells[position + shapes[currShape].position3].classList.remove(`${shapes[currShape].name}`)
    cells[position + shapes[currShape].position4].classList.remove(`${shapes[currShape].name}`)
    
  }

  function addShape(position) {
    cells[position].classList.add(`${shapes[currShape].name}`)
    cells[position + shapes[currShape].position2].classList.add(`${shapes[currShape].name}`)
    cells[position + shapes[currShape].position3].classList.add(`${shapes[currShape].name}`)
    cells[position + shapes[currShape].position4].classList.add(`${shapes[currShape].name}`)
  }
  function generateRandomShapeIndex() {
    return Math.floor(Math.random() * 2)
  }

  function handleKeyUp(event) {

    removeShape(startPosition)

    const horizontalPosition = startPosition % gridWidth
    const verticalPosition = Math.floor(startPosition / gridWidth)
    console.log(verticalPosition)
    switch (event.keyCode) {
      case 39: //arrow right
        if (horizontalPosition < gridWidth - 2) startPosition++
        break
      case 37: //arrow left
        if (horizontalPosition > 0) startPosition--
        break
      case 38: //arrow up
        if (verticalPosition > 0) startPosition -= gridWidth
        break
      case 40: //arrow down
        if (currShape === 1) {
          if (verticalPosition < gridHeight - 3) {
            startPosition += gridWidth
          }
        }
        else if (verticalPosition < gridHeight - 2) {
          startPosition += gridWidth
        }
        break
      default:
        console.log('INVALID KEY')
    }

    addShape(startPosition)
    
  }

  function nextShapeGrid() {
    for (let i = 0; i < shapeCellCount; i++) {
      const nextShapeCell = document.createElement('div')
      nextShapeCell.textContent = i
      nextShapeCell.setAttribute('data-index', i)
      tetrisShape.appendChild(nextShapeCell)
      shapeCells.push(nextShapeCell)
    }
  }


  function startGame() {
    document.addEventListener('keyup', handleKeyUp)
  }


  createGrid()
  nextShapeGrid()
  start.addEventListener('click', startGame)
  

}

window.addEventListener('DOMContentLoaded', init)