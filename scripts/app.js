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

  function removeShape() {

    cells[currPosition].classList.remove(`${shapes[currShape].name}`)
    cells[currPosition + shapes[currShape].position2].classList.remove(`${shapes[currShape].name}`)
    cells[currPosition + shapes[currShape].position3].classList.remove(`${shapes[currShape].name}`)
    cells[currPosition + shapes[currShape].position4].classList.remove(`${shapes[currShape].name}`)

  }

  function addShape() {
    cells[currPosition].classList.add(`${shapes[currShape].name}`)
    cells[currPosition + shapes[currShape].position2].classList.add(`${shapes[currShape].name}`)
    cells[currPosition + shapes[currShape].position3].classList.add(`${shapes[currShape].name}`)
    cells[currPosition + shapes[currShape].position4].classList.add(`${shapes[currShape].name}`)
    // console.log(cells[position].classList.value === '')
  }
  function generateRandomShapeIndex() {
    return Math.floor(Math.random() * 2)
  }

  function handleKeyUp(event) {

    removeShape()
    const horizontalPosition = currPosition % gridWidth
    const verticalPosition = Math.floor(currPosition / gridWidth)
    console.log(horizontalPosition)
    switch (event.keyCode) {
      case 39: //arrow right
        if (horizontalPosition < gridWidth - shapes[currShape].shapeWidth) tryMove(1)
        break
      case 37: //arrow left
        if (horizontalPosition > 0) tryMove(-1)
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
    addShape()
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

  function storeShape() {
    // push shape into cells array with its classList 
    addShape()
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

  function tryMove(change) {
    const newPosition = currPosition + change
    const newPosition2 = newPosition + shapes[currShape].position2
    const newPosition3 = newPosition + shapes[currShape].position3
    const newPosition4 = newPosition + shapes[currShape].position4
    if (cells[newPosition].classList.value === '' && cells[newPosition2].classList.value === '' && cells[newPosition3].classList.value === '' && cells[newPosition4].classList.value === '') {
      currPosition = newPosition
      addShape()
    } else if (change === 0){
      currPosition = -1
    } else if (change === gridWidth) {
      storeShape()
    }
    // else if (change === gridWidth) {
    //   storeShape()
    // } else if (change === 0) {
    
    // }

    // if 5 is in filled array 
    // if new position cells are empty or not current shape class list
  }

  function newShape() {
    currShape = generateRandomShapeIndex()
    currPosition = 5
    tryMove(0)
  }

  function endGame() {
  }

  function startGame() {

    newShape()
    // addShape(currPosition)
    timer = setInterval(() => {
      document.addEventListener('keyup', handleKeyUp)
      // addShape(currPosition)
      if (currPosition + shapes[currShape].position4 >= bottomRow[0].dataset.index) {
        storeShape()
      } else if (currPosition === -1) {
        return
      }
      
      removeShape()
      tryMove(gridWidth)
      console.log(currPosition)
    }, 80)
    console.log('im outside')
  }


  createGrid()
  nextShapeGrid()
  start.addEventListener('click', startGame)


}

window.addEventListener('DOMContentLoaded', init)