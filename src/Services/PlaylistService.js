let _singleton=Symbol()

class PlaylistService{
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new PlaylistService(_singleton);
        return this[_singleton]
    }

    getPlaylistForUser(userId){
        return fetch("http://localhost:8080/api/user/UID/playlist".replace("UID",userId))
            .then(response=>(
                response.json()
            ))
    }

    createPlaylist(userId,playlist){
        return fetch("http://localhost:8080/api/user/UID/playlist".replace("UID",userId),{
            method:'post',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(playlist)
        })
            .then(response=>(
                response.json()
            ))
    }

    addSongToPlaylist(playlistId,trackId,song){
        return fetch("http://localhost:8080/api/playlist/PID/track/TID".replace("PID",playlistId)
            .replace("TID",trackId),{
            method:'post',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(song)
        })
    }

    getSongsForPlaylist(playlistId){
        return fetch("http://localhost:8080/api/playlist/PID/song".replace("PID",playlistId))
            .then(response=>(response.json()))
    }

}
export default PlaylistService