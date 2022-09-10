const cells = document.querySelectorAll("[class^='cell']")

cells.forEach(cell => {
  cell.addEventListener("mousedown", () => {
    cell.textContent = "X"
    cell.classList.remove("hover:bg-zinc-400")
    cell.style.cursor = "default"
  })
})
