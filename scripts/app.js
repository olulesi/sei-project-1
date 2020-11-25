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
  let currPosition = 5
  let currShape = 0
  const bottomRow = []
  let timer




  const shapes = [
    {
      name: 'boxShape',
      position2: 1,
      position3: 12,
      position4: 13,
      shapeWidth: 2,
      shapeHeight: 3


    },
    {
      name: 'Zshape',
      position2: 12,
      position3: 13,
      position4: 25,
      shapeWidth: 2,
      shapeHeight: 3

    }
  ]

  // * Make a grid
  // needs an argument for position
  function createGrid() {

    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.setAttribute('data-index', i)
      cell.setAttribute('color', '')
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

    removeShape(currPosition)
    const horizontalPosition = currPosition % gridWidth
    const verticalPosition = Math.floor(currPosition / gridWidth)
    console.log(horizontalPosition)
    switch (event.keyCode) {
      case 39: //arrow right
        if (horizontalPosition < gridWidth - shapes[currShape].shapeWidth && !(currPosition + shapes[currShape].position4 > bottomRow[0].dataset.index)) currPosition++
        break
      case 37: //arrow left
        if (horizontalPosition > 0 && !(currPosition + shapes[currShape].position4 > bottomRow[0].dataset.index)) currPosition--
        break
      case 32: //spaceBar
        // if try move succesfull remove
        if (verticalPosition > 0) currPosition += gridHeight * (gridWidth - 2)
        break
      case 40: //arrow down
        if (currShape === 1) {
          if (verticalPosition < gridHeight - 3) {
            currPosition += gridWidth
          }
        } else if (verticalPosition < gridHeight - 2) {
          currPosition += gridWidth
        }
        break
      default:
        console.log('INVALID KEY')
    }
    addShape(currPosition)
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

  function nullShape() {
    console.log('shape stops here')
    clearInterval(timer)
  }

  function storeShape(currPosition) {
    // push shape into cells array with its classList 
    addShape(currPosition)
    //check for complete lines 

    // add another shape from the start position
    newShape()
  }




  function completedLines() {
    // r and c = 1
    // for row r in grid height 
    // for cell c in grid width
    // cells posiiton  = (r-1) * gridwidth + (c-1)
    // if cell position = empty
    //break
    // else if c === gridwidth
    // clear row
    // move down 
  }

  function tryMove(currPosition) {
    const newPosition = currPosition
    const newPosition2 = newPosition + shapes[currShape].position2
    const newPosition3 = newPosition + shapes[currShape].position3
    const newPosition4 = newPosition + shapes[currShape].position4
    if (cells[newPosition].classList.value === '' && cells[newPosition2].classList.value === '' && cells[newPosition3].classList.value === '' && cells[newPosition4].classList.value === '') {
      currPosition = newPosition
      addShape(currPosition)
    } 
    // else if (change === gridWidth) {
    //   storeShape(currPosition)
    // } else if (change === 0) {}
    nullShape()
    return

    // if 5 is in filled array 
    // if new position cells are empty or not current shape class list
  }

  function newShape() {
    currShape = generateRandomShapeIndex()
    currPosition = 5
    tryMove(currPosition, 0)
    addShape(currPosition)
  }

  function startGame() {

    // newShape()
    addShape(currPosition)
    timer = setInterval(() => {
      // addShape(currPosition)
      if (currPosition + shapes[currShape].position4 > bottomRow[0].dataset.index) {
        nullShape()
        return
      }
      
      removeShape(currPosition)
      currPosition += gridWidth
      addShape(currPosition)
      // tryMove(currPosition, gridWidth)

    }, 500)
    document.addEventListener('keyup', handleKeyUp)
  }


  createGrid()
  nextShapeGrid()
  start.addEventListener('click', startGame)


}

window.addEventListener('DOMContentLoaded', init)