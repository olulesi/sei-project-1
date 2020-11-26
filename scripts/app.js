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
  let currRotation = 0
  const bottomRow = []
  let timer 
  let shapeCounter = 0



  const shapes = [
    [
      {
        name: 'boxShape',
        position2: 1,
        position3: 12,
        position4: 13,
        shapeWidth: 2,
        shapeHeight: 2
      }
    ],
    [
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
    ],
    [
      {
        rotation: 1,
        name: 'Ishape',
        position2: -1,
        position3: -2,
        position4: -3,
        shapeWidth: 1,
        shapeHeight: 1,
        
      },
      {
        rotation: 2,
        name: 'Ishape',
        position2: 12,
        position3: 24,
        position4: 36,
        shapeWidth: 1,
        shapeHeight: 4,
      },
      {
        rotation: 3,
        name: 'Ishape',
        position2: 1,
        position3: 2,
        position4: 3,
        shapeWidth: 1,
        shapeHeight: 1,
      }
    ],
    [
      {
        rotation: 1,
        name: 'Tshape',
        position2: -1,
        position3: 1,
        position4: 12,
        shapeWidth: 2,
        shapeHeight: 3,
        
      },
      {
        rotation: 2,
        name: 'Tshape',
        position2: 12,
        position3: 13,
        position4: 24,
        shapeWidth: 2,
        shapeHeight: 2,
      },
      {
        rotation: 3,
        name: 'Tshape',
        position2: 11,
        position3: 12,
        position4: 13,
        shapeWidth: 2,
        shapeHeight: 3,
      },
      {
        rotation: 4,
        name: 'Tshape',
        position2: 11,
        position3: 12,
        position4: 24,
        shapeWidth: 1,
        shapeHeight: 2,
      }
    ]
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

    cells[currPosition].classList.remove(`${shapes[currShape][currRotation].name}`)
    cells[currPosition + shapes[currShape][currRotation].position2].classList.remove(`${shapes[currShape][currRotation].name}`)
    cells[currPosition + shapes[currShape][currRotation].position3].classList.remove(`${shapes[currShape][currRotation].name}`)
    cells[currPosition + shapes[currShape][currRotation].position4].classList.remove(`${shapes[currShape][currRotation].name}`)

  }

  function addShape() {
    cells[currPosition].classList.add(`${shapes[currShape][currRotation].name}`)
    cells[currPosition + shapes[currShape][currRotation].position2].classList.add(`${shapes[currShape][currRotation].name}`)
    cells[currPosition + shapes[currShape][currRotation].position3].classList.add(`${shapes[currShape][currRotation].name}`)
    cells[currPosition + shapes[currShape][currRotation].position4].classList.add(`${shapes[currShape][currRotation].name}`)
    // console.log(cells[position].classList.value === '')
  }
  function generateRandomShapeIndex() {
    return Math.floor(Math.random() * 3)
  }

  function generateRandomRotation() {
    return Math.floor(Math.random() * shapes[currShape].length)
  }

  function handleKeyUp(event) {

    const horizontalPosition = currPosition % gridWidth
    // const verticalPosition = Math.floor(currPosition / gridWidth)
    // console.log(horizontalPosition)
    const shapeNumber = shapeCounter
    switch (event.keyCode) {
      case 39: //arrow right
        if (horizontalPosition < gridWidth - shapes[currShape][[currRotation]].shapeWidth) tryMove(1)
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

      case 38: // arrow up
        removeShape()
        if (currRotation === shapes[currShape].length - 1) {
          currRotation = 0
        } else {
          currRotation++
        }
        addShape()
        break
      case 40: //arrow down
        removeShape()
        if (currRotation === 0) {
          currRotation = shapes[currShape].length - 1
        } else {
          currRotation--
        }
        addShape()
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
    for (let r = 1; r <= gridHeight; r++) {
      for (let c = 1; c <= gridWidth; c++) {
        const cellPosition = ((r - 1) * gridWidth) + (c - 1)
        if (cells[cellPosition].classList.value === '')
          break
        else if (c === gridWidth) {
          clearRow(r)
          r--
        }
      }
    }
  }

  function moveRowDown(row) {
    for (let r = row; r <= gridHeight; r++) {
      for (let c = 1; c <= gridWidth; c++) {
        const cellPosition = ((r - 1) * gridWidth) + (c - 1)
        if (cells[cellPosition].classList.value === '')
          break
        else if (c === gridWidth) {
          clearRow(r)
          r--
        }
      }
    }
  }

  function clearRow(row) {
    for (let c = 1; c <= gridWidth; c++) {
      const cellPosition = ((row - 1) * gridWidth + (c - 1))
      cells[cellPosition].classList.value = ''
    }
  }
  // r and c = 1
  // for row r in grid height 
  // for cell c in grid width
  // cells posiiton  = (r-1) * gridwidth + (c-1)
  // if cell position = empty
  //break
  // else if c === gridwidth
  // clear row
  // move down 

  function tryMove(change) {
    const newPosition = currPosition + change
    const newPosition2 = newPosition + shapes[currShape][currRotation].position2
    const newPosition3 = newPosition + shapes[currShape][currRotation].position3
    const newPosition4 = newPosition + shapes[currShape][currRotation].position4
    removeShape()
    if (currPosition + shapes[currShape][currRotation].position4 >= bottomRow[0].dataset.index) {
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
    currShape = 3
    currRotation = generateRandomRotation()
    currPosition = 5
    tryMove(0)
    shapeCounter++
    console.log('newShape' + shapeCounter)
  }

  // function endGame() {
  // }
  function storeShape() {
    // push shape into cells array with its classList 
    addShape()
    //check for complete lines 
    completedLines()
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
    }, 150)
    console.log('im outside')
  }


  createGrid()
  nextShapeGrid()
  start.addEventListener('click', startGame)


}

window.addEventListener('DOMContentLoaded', init)