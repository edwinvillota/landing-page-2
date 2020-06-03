class UpdateView {
    constructor (gridContainer) {
        this.container = gridContainer
    }

    async notify({ view }) {
        if (this.container) {
            const grids = this.container.querySelectorAll('.grid')

            switch (view) {
                case 'grid__view':
                    Array.from(grids).forEach(grid => {
                        grid.classList.replace('list__view', 'grid__view')
                    })
                    break;
                case 'list__view':
                    Array.from(grids).forEach(grid => {
                        grid.classList.replace('grid__view', 'list__view')
                    })
                    break;
                default:
                    break;
            }
        }
    }
}

export default UpdateView