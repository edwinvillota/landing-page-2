import GlobalState from './modules/GlobalState.js'
import UpdateView from './modules/UpdateView.js'
import RandomGridConfig from './modules/RandomGridConfig.js'
import GridRenderer from './modules/GridRenderer.js'

const state = new GlobalState()

// Modifiers
function handleChangeCategory (e) {
    const gridContainer = document.getElementById('grids__container')
    const insertedGrids = document.querySelectorAll('.inserted_grid')

    if (Array.from(insertedGrids).length) {
        Array.from(insertedGrids).forEach(grid => {
            gridContainer.removeChild(grid)
        })
    }
    state.changeCategory(e.target.id)
    handleShowMore()
}

function handleChangeView (e) {
    state.changeView(e.target.id)
}

function handleShowMore (e) {
    const gridConfig = {
        page: state.page + 1,
        columns: RandomGridConfig(3, 10) 
    }
    state.clearGrids()
    state.addGrid(gridConfig)
    state.incrementPage()
}

function handleLoadPage() {
    // First load
    const defaultGrid = {
        page: 0,
        columns: [3,3,4]
    }
    state.changeCategory('All')
    state.addGrid(defaultGrid)
    state.incrementPage()

}

// Subscribers
state.subscribe(new GridRenderer())
state.subscribe(new UpdateView(document.getElementById('grids__container')))

async function main () {

    // Listen events
    const categoryRadios = document.querySelectorAll('input[name="category"]')
    Array.from(categoryRadios).forEach(radio => {
        radio.addEventListener('click', handleChangeCategory)
    })

    const viewRadios = document.querySelectorAll('input[name="view"]')
    Array.from(viewRadios).forEach(radio => {
        radio.addEventListener('click', handleChangeView)
    })
    document.getElementById('more__button').addEventListener('click', handleShowMore)

    window.addEventListener('load', handleLoadPage)

}



main()
