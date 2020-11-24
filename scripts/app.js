function init() {

  // * Variables
  //calls the grid container
  const grid = document.querySelector('.grid')
  const tetrisShape = document.querySelector('.shape')
  const start = document.querySelector('#start')

  // var the width so you can manipulate the size whenever
  const gridWidth = 12
  const gridHeight = gridWidth * 2
  const cellCount = gridHeight * gridWidth
  const cells = []
  const shapeWidth = 4
  const shapeCellCount = shapeWidth * shapeWidth
  const shapeCells = []
  let startPosition = 5
  let currShape = generateRandomShapeIndex()
  let timer
  const bottomRow = []
  

  const shapes = [
    {
      name: 'boxShape',
      position2: 1,
      position3: 12,
      position4: 13,
      shapeWidth: 2

    },
    {
      name: 'Zshape',
      position2: 12,
      position3: 13,
      position4: 25,
      shapeWidth: 2
    }
  ]


  // * Make a grid
  // needs an argument for position
  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.setAttribute('data-index', i)
      cell.textContent = i
      cells.push(cell)
      // console.log(bottomRow[2].dataset.index)
      if (i >= cellCount - gridWidth) {
        bottomRow.push(cell)
      }
      grid.appendChild(cell)
    }
    // addShape(startPosition)
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
    console.log(horizontalPosition)
    switch (event.keyCode) {
      case 39: //arrow right
        if (horizontalPosition < gridWidth - shapes[currShape].shapeWidth) startPosition++
        break
      case 37: //arrow left
        if (horizontalPosition > 0) startPosition--
        break
      case 32: //spaceBar
        if (verticalPosition > 0) startPosition += gridHeight * (gridWidth - 2)
        break
      case 40: //arrow down
        if (currShape === 1) {
          if (verticalPosition < gridHeight - 3) {
            startPosition += gridWidth
          }
        } else if (verticalPosition < gridHeight - 2) {
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
  function newShape(startPosition) {
    startPosition = 5
    currShape = generateRandomShapeIndex()
    addShape(startPosition)
    timer = setInterval(() => {
      if (startPosition + shapes[currShape].position4 > bottomRow[0].dataset.index) {
        nullShape()
        return
      }
      removeShape(startPosition)
      startPosition += gridWidth
      addShape(startPosition)

    }, 500)
  }
  function nullShape() {
    console.log('game is over BIATCH')
    clearInterval(timer)
  }

  function startGame() {
    addShape(startPosition)
    
    timer = setInterval(() => {
      if (startPosition + shapes[currShape].position4 > bottomRow[0].dataset.index) {
        nullShape()
        return
      }
      removeShape(startPosition)
      startPosition += gridWidth
      addShape(startPosition)

    }, 500)
    // newShape(startPosition)
    document.addEventListener('keyup', handleKeyUp)
  }


  createGrid()
  nextShapeGrid()
  start.addEventListener('click', startGame)


}

window.addEventListener('DOMContentLoaded', init)