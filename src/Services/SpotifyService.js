let _singleton=Symbol()

class SpotifyService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new SpotifyService(_singleton);
        return this[_singleton]
    }

    getAccessToken(){
       return fetch("https://beatdrop.herokuapp.com/api/accessToken")
            .then(response=>(response.json()))
    }

}

export default SpotifyService;