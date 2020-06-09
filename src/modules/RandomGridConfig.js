function gridRandomConfig (columns = 3, items = 10) {
  let gridConfig = []
  let totalItems
  while (totalItems !== items) {
    gridConfig = []
    for (let i = 0; i < columns; i++) {
      const min = parseInt(items / columns - 1)
      const max = parseInt(items / columns + 1)
      const random = parseInt(Math.random()*max+min)
      gridConfig.push(random)
    }  
    totalItems = gridConfig.reduce((a, b) => a + b, 0)
  }
  return gridConfig
}

export default gridRandomConfig
