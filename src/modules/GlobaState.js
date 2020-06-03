import Observable from './Observable.js'

class GlobalState extends Observable{
    constructor() {
        super()
        this.category = ''
        this.view = 'grid__view'
    }

    changeCategory(newCategory){
        if (this.category !== newCategory) {
            this.category = newCategory
            this.notify(this)
        }
    }

    changeView(newView){
        if (this.view !== newView) {
            this.view = newView
            this.notify(this)
        }
    }

    updateGrid(){
        this.notify(this)
    }
}

export default GlobalState