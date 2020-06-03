class Observable {
    constructor() {
        this.observers = []
    }

    subscribe(c) {
        this.observers.push(c)
    }

    unsubscribe(c) {
        this.observers = this.observers.filter(observer => observer instanceof c != true)
    }

    notify(state) {
        this.observers.forEach(observer => {
            observer.notify(state)
        })
    }
}

export default Observable