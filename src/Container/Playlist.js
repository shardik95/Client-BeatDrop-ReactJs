import React from 'react';
import PlaylistService from "../Services/PlaylistService";

class Playlist extends React.Component{

    constructor(props){
        super(props);
        this.state={
            userId:'',
            playlists:[],
            plName:''
        }
        this.createPlaylist=this.createPlaylist.bind(this);
        this.playlistService=PlaylistService.instance;
    }

    componentDidMount(){
        let userId=this.props.match.params.userId
        this.setState({userId:userId})
        this.playlistService.getPlaylistForUser(userId)
            .then((response)=>this.setState({playlists:response}))
    }

    componentWillReceiveProps(newProps){
        let userId=newProps.match.params.userId
        this.setState({userId:userId})
        this.playlistService.getPlaylistForUser(userId)
            .then((response)=>this.setState({playlists:response}))
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
                <h1>Playlist</h1>
                <form className="form-control" style={{padding:"15px"}}>
                    <input type="text" onChange={(e)=>this.setState({plName:e.target.value})}/>
                    <button className="btn btn-primary float-right" type="button" onClick={()=>this.createPlaylist()}>Create a playlist</button>
                </form>
                <br/>
                <div style={{width:"30%"}}>
                    <ul className="list-group">
                        <li className="list-group-item active">Playlists</li>
                        {this.state.playlists.map((playlist,index)=>(
                            <li key={index} className="list-group-item">{playlist.playlistName}</li>
                        ))}
                    </ul>
                    <br/>
                </div>

                <h1>{this.state.userId}</h1>
            </div>
        )
    }

}

export default Playlist;