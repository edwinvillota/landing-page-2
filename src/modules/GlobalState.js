import Observable from './Observable.js'

class GlobalState extends Observable{
    constructor() {
        super()
        this.category = ''
        this.view = 'grid__view'
        this.page = 0
        this.grids = []
    }

    changeCategory(newCategory){
        if (this.category !== newCategory) {
            this.category = newCategory
            this.page = 0
            this.grids = []
            this.notify(this)
        }
    }

    changeView(newView){
        if (this.view !== newView) {
            this.view = newView
            this.notify(this)
        }
    }

    addGrid(newGrid){
        this.grids.push(newGrid)
        this.notify(this)
    }

    clearGrids(){
        this.grids = []
        this.notify(this)
    }

    updateGrid(){
        this.notify(this)
    }

    incrementPage(){
        this.page = this.page + 1
    }
}

export default GlobalState