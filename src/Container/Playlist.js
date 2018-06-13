import React from 'react';
import PlaylistService from "../Services/PlaylistService";

class Playlist extends React.Component{

    constructor(props){
        super(props);
        this.state={
            userId:'',
            playlists:[],
            plName:'',
            user:'',
            showAdd:false
        }
        this.createPlaylist=this.createPlaylist.bind(this);
        this.deletePlaylist=this.deletePlaylist.bind(this);
        this.addSong=this.addSong.bind(this);
        this.renderSong=this.renderSong.bind(this);
        this.playlistService=PlaylistService.instance;
    }

    componentDidMount(){
        fetch("http://localhost:8080/api/profile",{
            credentials: 'include',
        }).then((response)=>response.json())
            .then((json)=>(this.setState({user:json,userId:json.id,playlists:json.playlists})))

        let trackId=this.props.match.params.trackId;
        if(trackId!==undefined){
            this.setState({showAdd:true})
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
        console.log("plus clicked")
    }

    renderSong(playlistId){
        console.log("playlist clicked")
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
                    <div className="col-6">
                        <ul className="list-group">
                            <li className="list-group-item active">Songs</li>

                        </ul>
                        <br/>
                    </div>
                </div>
            </div>
        )
    }

}

export default Playlist;