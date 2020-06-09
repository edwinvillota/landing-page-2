import Unsplash from './UnsplashService.js'

class GridRenderer {
  constructor () {
    this.photoService = new Unsplash()
  }

  async notify({ grids, view, category, page }) {

    
    grids.forEach(async (gridConfig) => {
      // Create a new grid
      const gridsContainer = document.getElementById('grids__container')
      const newGrid = document.createElement('div')
      newGrid.classList.add('grid', 'inserted_grid', view)
      gridsContainer.appendChild(newGrid)
      //newGrid.classList.add('fade_out')

      try {
        const response = await this.photoService.getPhotos(category, gridConfig.page)

        const photos = response.results || response
        
        let totalItems = 0

        const columns = page ? gridConfig.columns : [3,3,4]

        columns.forEach(items => {
            const newCol = document.createElement('div')
            newCol.classList.add('column', page || 'default')

            if (page !== 0) {
              newCol.style.gridTemplateRows = `repeat($items, 1fr)`
            }
  
            for (let i = 1; i <= items; i++ ) {
                const newItem = document.createElement('div')
                newItem.classList.add('item')
                newCol.appendChild(newItem)

                const image = new Image()
                image.src = photos[totalItems].urls.regular
                image.classList.add('image')

                image.onload = () => { image.classList.add('fade_in') }

                newItem.innerHTML = ''
                newItem.appendChild(image)

                totalItems += 1
            }
  
            newGrid.appendChild(newCol)
        })
        
      } catch (e) {
        console.log(e)
      }
    })
  }
}

export default GridRenderer