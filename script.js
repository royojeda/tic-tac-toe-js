const emptySymbol = "\u00a0"

const Player = (symbol) => {
  return { symbol }
}

const Board = () => {
  let contents = []

  const insertAt = (symbol, index) => {
    contents[index] = symbol
  }

  const setup = () => {
    contents = [emptySymbol, emptySymbol, emptySymbol, emptySymbol, emptySymbol, emptySymbol, emptySymbol, emptySymbol, emptySymbol]
  }

  const isFull = () => {
    return !contents.includes(emptySymbol)
  }

  return { insertAt, setup, isFull, get contents() { return contents } }
}

const Display = () => {
  const cells = document.querySelectorAll("[class^='cell']")
  let listener = null

  const setup = (contents, listenerFunction) => {
    listener = listenerFunction
    cells.forEach(cell => {
      cell.textContent = contents[cell.dataset.index]
      cell.classList.add("hover:bg-zinc-400")
      cell.style.cursor = "pointer"
      cell.addEventListener("mousedown", listener)
    })
  }

  const insertAt = (symbol, index) => {
    const cell = cells[index]
    cell.textContent = symbol
    cell.classList.remove("hover:bg-zinc-400")
    cell.style.cursor = "default"
    cell.removeEventListener("mousedown", listener)
  }

  return { setup, insertAt }
}

const Game = (() => {
  const playerOne = Player("X")
  const playerTwo = Player("O")
  const board = Board()
  const display = Display()
  let turn = 1

  const currentPlayer = () => {
    return (turn % 2) === 0 ? playerTwo : playerOne
  }

  const switchPlayers = () => {
    turn++
  }

  const setup = () => {
    turn = 1
    board.setup()
    display.setup(board.contents, playTurn)
  }

  const playTurn = (event) => {
    board.insertAt(currentPlayer().symbol, event.target.dataset.index)
    display.insertAt(currentPlayer().symbol, event.target.dataset.index)
    if (board.isFull()) {
      console.log("board is full")
    }
    switchPlayers()
  }

  const play = () => {
    setup()
  }

  return { play, setup }
})()

Game.play()
