import Unsplash from './UnsplashService.js';

class PhotoRenderer {

    constructor (grid) {
        this.grid = grid
        this.photoService = new Unsplash()
    }

    async notify({ category }) {

        if (this.grid) {
            const items = this.grid.querySelectorAll('.item')

            try {
                const { results: photos } = await this.photoService.getPhotos(category)
                
                // Render Photos
                Array.from(items).forEach((item, i) => {

                    if (item.id === 'first__item') return 

                    const image = new Image()
                    image.src = photos[i].urls.regular
                    image.classList.add('image')

                    image.onload = () => {image.classList.add('fade_in')} 

                    item.innerHTML = ''
                    item.appendChild(image)
                })
            } catch (err) {
                console.log(err)
            }
        }
    }
}

export default PhotoRenderer