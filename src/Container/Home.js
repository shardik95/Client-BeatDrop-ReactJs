import React from 'react';
//import Script from 'react-load-script'
import {Link,Route} from 'react-router-dom';
import Login from "./Login";


class Home extends React.Component{

    constructor(props){
        super(props);
        this.state={
            accessToken:"",
            query:"",
            tracks:[],
            artists:[],
            albums:[],
            TrackIndex:3,
            TrackButton:'See All',
            albumIndex:3,
            albumButton:'See All',
            artistIndex:3,
            artistButton:'See All'
        }
        this.searchAll=this.searchAll.bind(this);
        this.millisToMinutesAndSeconds=this.millisToMinutesAndSeconds.bind(this);
        this.setTrackButton=this.setTrackButton.bind(this);
        this.setAlbumButton=this.setAlbumButton.bind(this);
        this.setArtistButton=this.setArtistButton.bind(this);

    }


    componentDidMount(){

        fetch("http://localhost:8080/api/accessToken")
            .then(response=>(
                response.json()
            )).then(response=>(
                this.setState({accessToken:response.access_token})
        ))
        /*window.onSpotifyWebPlaybackSDKReady = () => {
            const token = 'BQCG2AVa-ag2EjVG1wzPRVAo4XgnxK8xeXKbwZfMTY27h7SY3zFVAUa9KNMXTAva3DreZUFo8oAeOoHJI7LFJ63HKScxnezoOOGHnAP5haXhRvud8PNaTXcPBIELoYRReroszKQMhT9sVkFB9s5aeEePVIXXeNcG1NEx-AhCeUteb9OvtmdjVw';
            const player = new window.Spotify.Player({
                name: 'Web Playback SDK Quick Start Player',
                getOAuthToken: cb => { cb(token); }
            });

            // Error handling
            player.addListener('initialization_error', ({ message }) => { console.error(message); });
            player.addListener('authentication_error', ({ message }) => { console.error(message); });
            player.addListener('account_error', ({ message }) => { console.error(message); });
            player.addListener('playback_error', ({ message }) => { console.error(message); });

            // Playback status updates
            player.addListener('player_state_changed', state => { console.log(state); });

            // Ready
            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
            });

            // Not Ready
            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            // Connect to the player!
            player.connect().then(success => {
                if (success) {
                    console.log('The Web Playback SDK successfully connected to Spotify!');
                }
            })
        }*/

    }

    searchAll(){

        fetch("https://api.spotify.com/v1/search?q=QUERY&type=track".replace("QUERY",this.state.query),{
            headers:{
                'Authorization':'Bearer '+this.state.accessToken
            }
        }).then(response=>(
            response.json()
        )).then(object=>(
            this.setState({tracks:object.tracks.items})
        ))

        fetch("https://api.spotify.com/v1/search?q=QUERY&type=artist".replace("QUERY",this.state.query),{
            headers:{
                'Authorization':'Bearer '+this.state.accessToken
            }
        }).then(response=>(
            response.json()
        )).then(object=>(
            this.setState({artists:object.artists.items})
        ))

        fetch("https://api.spotify.com/v1/search?q=QUERY&type=album".replace("QUERY",this.state.query),{
            headers:{
                'Authorization':'Bearer '+this.state.accessToken
            }
        }).then(response=>(
            response.json()
        )).then(object=>(
            this.setState({albums:object.albums.items})
        ))
    }



    millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    setTrackButton(){
        if(this.state.TrackButton==='See All'){
            this.setState({TrackButton:'See Less',TrackIndex:this.state.tracks.length})
        }
        else{
            this.setState({TrackButton:'See All',TrackIndex:3})
        }
    }

    setAlbumButton(){
        if(this.state.albumButton==='See All'){
            this.setState({albumButton:'See Less',albumIndex:this.state.albums.length})
        }
        else{
            this.setState({albumButton:'See All',albumIndex:3})
        }
    }

    setArtistButton(){
        if(this.state.artistButton==='See All'){
            this.setState({artistButton:'See Less',artistIndex:this.state.artists.length})
        }
        else{
            this.setState({artistButton:'See All',artistIndex:3})
        }
    }

    render(){
        let searchElement;
        return(
            <div>
                <nav className="navbar navbar-light bg-light">
                    <Link to="/"><a className="navbar-brand">
                        <i className="fa fa-lg fa-music" />&nbsp;&nbsp;BeatDrop</a></Link>
                    <form className="form-inline">
                        <input className="form-control mr-sm-2" type="search" style={{marginRight:"20px"}} placeholder="Search tracks"
                               ref={node=>searchElement=node} onChange={()=>this.setState({query:searchElement.value})}/>
                        <button className="btn btn-dark" style={{marginRight:"25px"}} onClick={()=>this.searchAll()} type="button">Search</button>

                        <Link to="/login"><button className="btn btn-outline-primary" style={{marginRight:"10px"}} type="button">Login</button></Link>

                        <button className="btn btn-outline-primary" style={{marginRight:"5px"}} type="button">SignUp</button>
                    </form>
                </nav>
                {/*<Script
                    url="https://sdk.scdn.co/spotify-player.js"
                />*/}
                <br/>
                {this.state.tracks.length>0 &&
                    <div>
                         <div className="container-fluid">
                             <h3 className="float-left">Tracks</h3>
                             <button className="float-right btn btn-dark" onClick={()=>this.setTrackButton()}>
                             {this.state.TrackButton} </button>
                         </div>
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th>
                                </th>
                                <th>
                                    Name
                                </th>
                                <th>
                                    Artist
                                </th>
                                <th>
                                    Duration
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                                    {this.state.tracks.map((track,index) => (
                                        index<this.state.TrackIndex &&
                                        <tr key={index}>
                                            <td>
                                                {track.album.images.length>0 &&
                                                    <img src={track.album.images[0].url} alt="tracks" height="60px" width="60px"/>}
                                            </td>
                                            <td>
                                                {track.name}
                                            </td>
                                            <td>
                                                {track.artists.map(artist=>(
                                                    artist.name
                                                ))}
                                            </td>
                                            <td>
                                                {this.millisToMinutesAndSeconds(track.duration_ms)}
                                            </td>
                                        </tr>
                                        ))}
                            </tbody>
                        </table>
                    </div>}

                {this.state.artists.length>0 &&
                <div>
                    <div className="container-fluid">
                        <h3 className="float-left">Artist</h3>
                        <button className="float-right btn btn-dark" onClick={()=>this.setArtistButton()}>
                            {this.state.artistButton} </button>
                    </div>
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>
                            </th>
                            <th>
                                Name
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.artists.map((artist,index) => (
                            index<this.state.artistIndex &&
                            <tr key={index}>
                                <td>
                                    {artist.images.length>0 &&
                                    <img src={artist.images[0].url} alt="artists" height="60px" width="60px"/>}
                                </td>
                                <td>
                                    {artist.name}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>}

                {this.state.albums.length>0 &&
                <div>
                    <div className="container-fluid">
                        <h3 className="float-left">Album</h3>
                        <button className="float-right btn btn-dark" onClick={()=>this.setAlbumButton()}>
                            {this.state.albumButton} </button>
                    </div>
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>
                            </th>
                            <th>
                                Name
                            </th>
                            <th>
                                Artist
                            </th>
                            <th>
                                Release Date
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.albums.map((album,index) => (
                            index<this.state.albumIndex &&
                            <tr key={index}>
                                <td>
                                    {album.images.length>0 &&
                                    <img src={album.images[0].url} alt="album" height="60px" width="60px"/>}
                                </td>
                                <td>
                                    {album.name}
                                </td>
                                <td>
                                    {album.artists.map(artist=>(
                                        artist.name
                                    ))}
                                </td>
                                <td>
                                    {album.release_date}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>}




            </div>
        )
    }

}

export default Home;