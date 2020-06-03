import { API } from '../secret/index.js'

const fetchConfig = {
    method: 'GET',
    mode: 'cors',
    headers: {
        'Authorization': `Client-ID SEIIO0KYj43vgGNj7RGibopj6zO6Z5z_9ff582ZCOFY`
    }
}

class Unsplash {

    static service 

    constructor () {
        if(!!Unsplash.service) {
            return Unsplash.service
        } 

        this.baseURL = 'https://api.unsplash.com'
        this.fetchConfig = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Authorization': `Client-ID ${API.accessKey}`
            }
        }
        Unsplash.service = this
    }

    async getPhotos (keyword, page = 1) {
        let enpoint 

        if ( keyword ) {
            enpoint = `${this.baseURL}/search/photos?page=${page}&query=${keyword}`
        } else {
            enpoint = `${this.baseURL}/photos?page=${page}`
        }

        try {
            const data = await fetch(enpoint, this.fetchConfig).then(response => response.json())
            return data
        } catch (err) {
            console.log(err)
        }
    }
}

export default Unsplash