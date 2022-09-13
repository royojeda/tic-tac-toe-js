const emptySymbol = "\u00a0"

const Player = (symbol) => {
  return { symbol }
}

const Board = (() => {
  let contents = []

  const getContentAt = (index) => {
    return contents[index]
  }

  const insertAt = (symbol, index) => {
    contents[index] = symbol
  }

  const reset = () => {
    contents = [emptySymbol, emptySymbol, emptySymbol, emptySymbol, emptySymbol, emptySymbol, emptySymbol, emptySymbol, emptySymbol]
  }

  return { getContentAt, insertAt, reset }
})()

const Game = (() => {
  const cells = document.querySelectorAll("[class^='cell']")

  const playerOne = Player("X")
  const playerTwo = Player("O")

  let turn = 1

  const currentPlayer = () => {
    return (turn % 2) === 0 ? playerTwo : playerOne
  }

  const switchPlayers = () => {
    turn += 1
  }

  const setup = () => {
    turn = 1

    Board.reset()

    cells.forEach(cell => {
      cell.textContent = Board.getContentAt(cell.dataset.index)
      cell.classList.add("hover:bg-zinc-400")
      cell.style.cursor = "pointer"
      cell.addEventListener("mousedown", placeSymbol)
    })
  }

  const placeSymbol = (event) => {
    const cell = event.target
    Board.insertAt(currentPlayer().symbol, cell.dataset.index)

    cell.textContent = Board.getContentAt(cell.dataset.index)
    cell.classList.remove("hover:bg-zinc-400")
    cell.style.cursor = "default"
    cell.removeEventListener("mousedown", placeSymbol)

    switchPlayers()
  }

  const play = () => {
    setup()
  }

  return { play, setup }
})()

Game.play()
