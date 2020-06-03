import GlobalState from './modules/GlobaState.js'
import PhotoRenderer from './modules/PhotoRenderer.js'
import UpdateView from './modules/UpdateView.js'

const state = new GlobalState()

// Modifiers
function handleChangeCategory (e) {
    // Remove inserted grid
    const gridContainer = document.getElementById('grids__container')
    const insertedGrids = document.querySelectorAll('.inserted_grid')

    if (Array.from(insertedGrids).length) {
        Array.from(insertedGrids).forEach(grid => {
            gridContainer.removeChild(grid)
        })
    }
    state.changeCategory(e.target.id)
}

function handleChangeView (e) {
    state.changeView(e.target.id)
}

function handleShowMore (e) {

    const gridConfig = {
        columns: [
            { items: 3 },
            { items: 3 },
            { items: 4},
        ]
    }

    // Create a new grid
    const newGrid = document.createElement('div')
    newGrid.classList.add('grid', 'inserted_grid', state.view)
    newGrid.classList.add('fade_out')

    gridConfig.columns.forEach(col => {
        const newCol = document.createElement('div')
        newCol.classList.add('column')

        for (let i = 1; i <= col.items; i++ ) {
            const newItem = document.createElement('div')
            newItem.classList.add('item')
            newCol.appendChild(newItem)
        }

        newGrid.appendChild(newCol)
    })

    document.getElementById('grids__container').appendChild(newGrid)
    
    state.subscribe(new PhotoRenderer(newGrid))
    state.updateGrid()

    setTimeout(() => {
        newGrid.classList.remove('fade_out')
    },10)
}

// Subscribers
state.subscribe(new PhotoRenderer(document.getElementById('default__grid')))
state.subscribe(new UpdateView(document.getElementById('grids__container')))

async function main () {
    const categoryRadios = document.querySelectorAll('input[name="category"]')
    Array.from(categoryRadios).forEach(radio => {
        radio.addEventListener('click', handleChangeCategory)
    })

    const viewRadios = document.querySelectorAll('input[name="view"]')
    Array.from(viewRadios).forEach(radio => {
        radio.addEventListener('click', handleChangeView)
    })

    // First load
    document.getElementById('All').click()

    document.getElementById('more__button').addEventListener('click', handleShowMore)

    // Disable grid__view

    
    window.addEventListener('resize', () => {
        if (screen.width <= 1024) {
            document.getElementById('list__view').click()
            state.changeView('list__view')
        }
    })

    window.addEventListener('load', () => {
        if (screen.width <= 1024) {
            document.getElementById('list__view').click()
            state.changeView('list__view')
        }
    })
}



main()
