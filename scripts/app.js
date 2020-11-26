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
  let shapeCounter = 0
  const boxShapes = [
    {
      name: 'boxShape',
      position2: 1,
      position3: 12,
      position4: 13,
      shapeWidth: 2,
      shapeHeight: 2 
    }
  ]
  const zShapes = [
    {
      rotation: 1,
      name: 'Zshape',
      position2: 12,
      position3: 13,
      position4: 25,
      shapeWidth: 2,
      shapeHeight: 3,
    },
    {
      rotation: 2,
      name: 'Zshape',
      position2: 1,
      position3: 11,
      position4: 12,
      shapeWidth: 3,
      shapeHeight: 2,
    }
  ]



  const shapes = [ boxShapes, zShapes]
    
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

    const horizontalPosition = currPosition % gridWidth
    const verticalPosition = Math.floor(currPosition / gridWidth)
    console.log(horizontalPosition)
    const shapeNumber = shapeCounter
    switch (event.keyCode) {
      case 39: //arrow right
        if (horizontalPosition < gridWidth - shapes[currShape].shapeWidth) tryMove(1)
        break
      case 37: //arrow left
        if (horizontalPosition > 0) tryMove(-1)
        break
      case 32: //spaceBar
        // if try move succesfull remove

        while (shapeCounter === shapeNumber) {
          tryMove(gridWidth)
        }
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
    // addShape()
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
    removeShape()
    if (currPosition + shapes[currShape].position4 >= bottomRow[0].dataset.index) {
      storeShape()
      return
    }
    if (cells[newPosition].classList.value === '' && cells[newPosition2].classList.value === '' && cells[newPosition3].classList.value === '' && cells[newPosition4].classList.value === '') {
      currPosition = newPosition
      addShape()
    } else if (change === 0) {
      currPosition = -1
      console.log('game end')
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
    shapeCounter++
    console.log('newShape' + shapeCounter)
  }

  function endGame() {
  }
  function storeShape() {
    // push shape into cells array with its classList 
    addShape()
    //check for complete lines 
    // add another shape from the start position
    newShape()
  }

  function startGame() {

    newShape()
    timer = setInterval(() => {
      document.addEventListener('keyup', handleKeyUp)
      if (currPosition === -1) {
        return
      }

      tryMove(gridWidth)
      console.log(currPosition)
    }, 250)
    console.log('im outside')
  }


  createGrid()
  nextShapeGrid()
  start.addEventListener('click', startGame)


}

window.addEventListener('DOMContentLoaded', init)