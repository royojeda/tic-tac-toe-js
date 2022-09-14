const Player = (symbol) => {
  return { symbol }
}

const Board = () => {
  let emptySymbol = null
  let contents = []

  const insertAt = (symbol, index) => {
    contents[index] = symbol
  }

  const setup = (symbol) => {
    emptySymbol = symbol
    contents = [symbol, symbol, symbol, symbol, symbol, symbol, symbol, symbol, symbol]
  }

  const isFull = () => {
    return !contents.includes(emptySymbol)
  }

  const hasPatterns = (patterns) => {
    return patterns.some((pattern) => {
      return contents[pattern[0]] !== emptySymbol &&
             contents[pattern[0]] === contents[pattern[1]] &&
             contents[pattern[1]] === contents[pattern[2]]
    })
  }

  return { insertAt, setup, isFull, get contents() { return contents }, hasPatterns }
}

const Display = () => {
  const cells = document.querySelectorAll("[class^='cell']")
  const backdrop = document.querySelector(".backdrop")
  const announcement = document.querySelector(".announcement")
  const closeModalButton = document.querySelector(".closeModalButton")
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

  const announceWinner = (winner) => {
    if (winner) {
      announcement.textContent = `${winner} wins!`
    } else {
      announcement.textContent = "Draw!"
    }

    closeModalButton.addEventListener("click", () => {
      closeModal()
    })
    openModal()
  }

  const openModal = () => {
    backdrop.classList.replace("opacity-0", "opacity-100")
    backdrop.classList.remove("z-[-1]")
  }

  const closeModal = () => {
    backdrop.classList.replace("opacity-100", "opacity-0")
    backdrop.classList.add("z-[-1]")
    Game.setup()
  }

  return { setup, insertAt, announceWinner }
}

const Game = (() => {
  const emptySymbol = "\u00a0"
  const playerOne = Player("X")
  const playerTwo = Player("O")
  const board = Board()
  const display = Display()
  const winningPatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
                           [0, 3, 6], [1, 4, 7], [2, 5, 8],
                           [0, 4, 8], [2, 4, 6]]
  let turn = 1

  const currentPlayer = () => {
    return (turn % 2) === 0 ? playerTwo : playerOne
  }

  const switchPlayers = () => {
    turn++
  }

  const setup = () => {
    turn = 1
    board.setup(emptySymbol)
    display.setup(board.contents, playTurn)
  }

  const playTurn = (event) => {
    board.insertAt(currentPlayer().symbol, event.target.dataset.index)
    display.insertAt(currentPlayer().symbol, event.target.dataset.index)
    checkEndConditions()
    switchPlayers()
  }

  const checkEndConditions = () => {
    if (board.hasPatterns(winningPatterns)) {
      display.announceWinner(currentPlayer().symbol)
    } else {
      if (board.isFull()) {
        display.announceWinner()
      }
    }
  }

  return { setup }
})()

Game.setup()
