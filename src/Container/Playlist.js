import React from 'react';
import PlaylistService from "../Services/PlaylistService";
import Link from "react-router-dom/es/Link";

class Playlist extends React.Component{

    constructor(props){
        super(props);
        this.state={
            userId:'',
            playlists:[],
            plName:'',
            user:'',
            showAdd:false,
            accessToken:'',
            trackId:'',
            song:'',
            songs:'',
            showSongList:false
        }
        this.createPlaylist=this.createPlaylist.bind(this);
        this.deletePlaylist=this.deletePlaylist.bind(this);
        this.addSong=this.addSong.bind(this);
        this.renderSong=this.renderSong.bind(this);
        this.playlistService=PlaylistService.instance;
    }

    componentDidMount(){

        fetch("http://localhost:8080/api/accessToken")
            .then(response=>(
                response.json()
            )).then(response=>(
            this.setState({accessToken:response.access_token})
        ))

        fetch("http://localhost:8080/api/profile",{
            credentials: 'include',
        }).then((response)=>response.json())
            .then((json)=>(this.setState({user:json,userId:json.id,playlists:json.playlists})))

        let trackId=this.props.match.params.trackId;
        if(trackId!==undefined){
            this.setState({showAdd:true,trackId:trackId})
        }
    }

    componentWillReceiveProps(newProps){
        fetch("http://localhost:8080/api/accessToken")
            .then(response=>(
                response.json()
            )).then(response=>(
            this.setState({accessToken:response.access_token})
        ))

        fetch("http://localhost:8080/api/profile",{
            credentials: 'include',
        }).then((response)=>response.json())
            .then((json)=>(this.setState({user:json,userId:json.id,playlists:json.playlists})))

        let trackId=newProps.match.params.trackId;
        if(trackId!==undefined){
            this.setState({showAdd:true,trackId:trackId})
        }
    }

    deletePlaylist(playlistId){
        fetch("http://localhost:8080/api/playlist/"+playlistId,{
            method:'delete'
        }).then(()=>(
            this.playlistService.getPlaylistForUser(this.state.userId)
                .then((playlists)=>(
                    this.setState({playlists:playlists})
                ))
        ))
    }

    addSong(playlistId){

        fetch("https://api.spotify.com/v1/tracks/ID".replace("ID",this.state.trackId),{
            headers:{
                'Authorization':'Bearer '+this.state.accessToken
            }
        })
            .then(response=>(
                response.json()
            )).then(json=>(
            this.setState({song:{
                    songName:json.name,
                    duration:json.duration_ms,
                    imgUrl:json.album.images[0].url,
                    spotifySongId:json.id
                }})
        )).then(()=>(
            this.playlistService.addSongToPlaylist(playlistId,this.state.trackId,this.state.song)
        )).then(()=>this.playlistService.getSongsForPlaylist(playlistId)
            .then((response)=>(this.setState({songs:JSON.parse(JSON.stringify(response))}))))

    }

    renderSong(playlistId){

        this.playlistService.getSongsForPlaylist(playlistId)
            .then((response)=>(this.setState({songs:JSON.parse(JSON.stringify(response)),showSongList:true})))

    }

    createPlaylist(){
        if(this.state.plName===''){
            let newPlaylist={
                playlistName:'New Playlist',

            }
            this.playlistService.createPlaylist(this.state.userId,newPlaylist)
                .then(()=>(
                    this.playlistService.getPlaylistForUser(this.state.userId)
                        .then((response)=>this.setState({playlists:response}))
                ))
        }
        else{
            let newPlaylist={
                playlistName:this.state.plName
            }
            this.playlistService.createPlaylist(this.state.userId,newPlaylist)
                .then(()=>(
                    this.playlistService.getPlaylistForUser(this.state.userId)
                        .then((response)=>this.setState({playlists:response}))
                ))
        }
    }

    render(){
        return(
            <div>
                <h1>Playlists</h1>
                <form className="form-control" style={{padding:"15px"}}>
                    <input type="text" onChange={(e)=>this.setState({plName:e.target.value})}/>
                    <button className="btn btn-primary float-right" type="button" onClick={()=>this.createPlaylist()}>Create a playlist</button>
                </form>
                <br/>
                <div className="row">
                    <div className="col-6">
                    <div >
                        <ul className="list-group">
                            <li className="list-group-item active">Playlists</li>
                            {this.state.playlists.map((playlist,index)=>(
                                <li key={index} className="list-group-item" onClick={()=>this.renderSong(playlist.id)}>{playlist.playlistName}
                                    <button className="btn float-right" onClick={()=>this.deletePlaylist(playlist.id)}><i className="fa fa-lg fa-times"></i></button>
                                    <button className="btn float-right" hidden={!this.state.showAdd} onClick={()=>this.addSong(playlist.id)}><i className="fa fa-lg fa-plus"></i></button></li>
                            ))}
                        </ul>
                        <br/>
                    </div>
                    </div>
                    <div className="col-6" >
                        <div hidden={!this.state.showSongList}>
                        <ul className="list-group">
                            {this.state.songs.length>0 && <li className="list-group-item active">Songs</li>}

                            {this.state.songs.length>0 && this.state.songs.map((song,index)=>(
                                <Link to={`/home/song/${song.spotifySongId}`}>
                                    <li key={index} className="list-group-item">{song.songName}</li>
                                </Link>
                            ))}
                        </ul>
                        </div>
                        {this.state.songs.length==0 &&
                        <img src="https://i.pinimg.com/736x/ae/8a/c2/ae8ac2fa217d23aadcc913989fcc34a2---page-empty-page.jpg"
                        width="400px" height="300px"/>
                         }
                        <br/>
                    </div>
                </div>
            </div>
        )
    }

}

export default Playlist;