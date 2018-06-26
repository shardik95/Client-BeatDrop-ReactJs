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

    getFeaturedPlaylists(playlistId,token){
        return fetch("https://api.spotify.com/v1/users/spotify/playlists/"+playlistId,{
            headers:{
                'Authorization':'Bearer '+token
            }
        }).then(response=>response.json())
    }

    searchTracks(query,token){
        return fetch("https://api.spotify.com/v1/search?q=QUERY&type=track".replace("QUERY", query), {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response => (response.json()))
    }

    getRelatedArtist(artistId,token){
       return fetch("https://api.spotify.com/v1/artists/AID/related-artists".replace("AID",artistId),{
            headers:{
                'Authorization':'Bearer '+token
            }
        }).then(response=>response.json())
    }

    getAlbumsForArtist(artistId,token){
        return fetch('https://api.spotify.com/v1/artists/AID/albums'.replace('AID',artistId),{
            headers:{
                'Authorization':'Bearer '+token
            }
        }).then((response)=>response.json())
    }

    getTopTracksForArtist(artistId,token){
        return fetch('https://api.spotify.com/v1/artists/AID/top-tracks?country=US'.replace('AID',artistId),{
            headers:{
                'Authorization':'Bearer '+token
            }
        }).then((response)=>response.json())
    }

    getAlbums(albumId,accessToken){
        return fetch('https://api.spotify.com/v1/albums/'+albumId,{
            headers:{
                'Authorization':'Bearer '+accessToken
            }
        }).then(response=>response.json())
    }

    getArtists(artistId,accessToken){
       return fetch('https://api.spotify.com/v1/artists/'+artistId,{
            headers:{
                'Authorization':'Bearer '+accessToken
            }
        }) .then((response)=>response.json())
    }

    browseCategories(accessToken){
        return fetch("https://api.spotify.com/v1/browse/categories", {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(response=>response.json())
    }

    browseFeaturedPlaylist(accessToken){
        return fetch("https://api.spotify.com/v1/browse/featured-playlists",{
            headers:{
                'Authorization':'Bearer '+accessToken
            }
        }).then(response=>(response.json()))
    }

    browseNewReleases(accessToken){
        return fetch("https://api.spotify.com/v1/browse/new-releases",{
            headers:{
                'Authorization':'Bearer '+accessToken
            }
        }).then(response=>(
            response.json()
        ))
    }

    searchArtist(query,token){
        return fetch("https://api.spotify.com/v1/search?q=QUERY&type=artist".replace("QUERY", query), {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response => (response.json()))
    }

    searchAlbum(query,token){
        return fetch("https://api.spotify.com/v1/search?q=QUERY&type=album".replace("QUERY", query), {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response => (response.json()))
    }

    getTrackById(trackId,accessToken){
        return fetch('https://api.spotify.com/v1/tracks/'+trackId,{
            headers:{
                'Authorization':'Bearer '+accessToken
            }
        }).then(response=>response.json())
    }

}

export default SpotifyService;