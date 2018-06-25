import React from 'react';
import SpotifyService from "../Services/SpotifyService";
import Link from "react-router-dom/es/Link";

class FeaturedPlaylists extends React.Component{

    constructor(props){
        super(props);
        this.state={
            playlistId:'',
            accessToken:'',
            playlists:{},
            tracks:''
        }
        this.spotifyService=SpotifyService.instance;
    }

    componentDidMount(){
        let playlistId=this.props.match.params.playlistId;
        this.setState({playlistId:playlistId})
        this.spotifyService.getAccessToken().then(response=> {
            this.setState({accessToken: response.access_token})
        }).then(()=>fetch("https://api.spotify.com/v1/users/spotify/playlists/"+playlistId,{
            headers:{
                'Authorization':'Bearer '+this.state.accessToken
            }
        })).then(response=>response.json())
            .then((playlists)=>this.setState({playlists:playlists}))
            .then(()=>(
                fetch("https://api.spotify.com/v1/search?q=QUERY&type=track".replace("QUERY", this.state.playlists.name), {
                    headers: {
                        'Authorization': 'Bearer ' + this.state.accessToken
                    }
                }).then(response => (
                    response.json()
                )).then(object => (
                    this.setState({tracks: object.tracks})
                ))

            ))

    }

    componentWillReceiveProps(newProps){
        let playlistId=newProps.match.params.playlistId;
        this.setState({playlistId:playlistId})
        this.spotifyService.getAccessToken().then(response=> {
            this.setState({accessToken: response.access_token})
        }).then(()=>fetch("https://api.spotify.com/v1/users/spotify/playlists"+playlistId,{
            headers:{
                'Authorization':'Bearer '+this.state.accessToken
            }
        })).then(response=>response.json())
            .then((playlists)=>this.setState({playlists:playlists}))
            .then(()=>(
                fetch("https://api.spotify.com/v1/search?q=QUERY&type=track".replace("QUERY", this.state.playlists.name), {
                    headers: {
                        'Authorization': 'Bearer ' + this.state.accessToken
                    }
                }).then(response => (
                    response.json()
                )).then(object => (
                    this.setState({tracks: object.tracks})
                ))

            ))



    }
    render(){
        return(
            <div style={{marginTop:"5%"}}>
                <div style={{textAlign:'center'}}>
                    <td className="container" style={{color:"#363636",fontSize:"large"}}><u><b>Featured Playlists</b></u></td>
                    {this.state.playlists.images!==undefined && <img src={this.state.playlists.images[0].url} width="300px" height="300px" style={{borderRadius:"150px"}}/>}
                </div>
                <br/>
                    <ul className="list-group">
                        <li className="list-group-item bg-dark" style={{color:"#fff"}}>{this.state.playlists.name}</li>
                        {this.state.tracks.items!==undefined&&this.state.tracks.items.map((item,index)=>(
                            index<10 && item.name!=='Undefined' &&
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-4">
                                        <img src={item.album.images[0].url} width="40px" height="40px" style={{borderRadius:"20px"}}/>
                                    </div>
                                    <div className="col-8">
                                        <Link to={`/home/song/${item.id}`}  key={index}>
                                        {item.name}
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                <br/>

            </div>
        )
    }
}

export default FeaturedPlaylists;