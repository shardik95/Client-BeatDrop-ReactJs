let _singleton=Symbol()

class HostPlaylistService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new HostPlaylistService(_singleton);
        return this[_singleton]
    }

    addPlaylistToParty(playlistId,partyId){
        return fetch("https://beatdrop.herokuapp.com/api/party/PID/playlist/PYD".replace("PID",partyId).replace("PYD",playlistId),{
            method:'post'
        }).then(response=>response.json())
    }

    getPlaylistForParty(partyId){
        return fetch("https://beatdrop.herokuapp.com/api/party/PID/playlist".replace("PID",partyId))
            .then(response=>response.json())
    }

    deletePlaylist(id){
        return fetch("https://beatdrop.herokuapp.com/api/hostplaylist/"+id,{
            method:'delete'
        }).then(response=>response.json())
    }

}

export default HostPlaylistService;