import React from 'react';
import UserService from "../Services/UserService";
import Link from "react-router-dom/es/Link";


class PublicPlaylist extends React.Component{

    constructor(props){
        super(props)
        this.state= {
            userId: '',
            user:'',
            songs:[]
        }
        this.userService=UserService.instance;
        this.renderSongs=this.renderSongs.bind(this);
    }

    componentDidMount(){
        let userId = this.props.match.params.userId;
        this.setState({userId:userId})
        this.userService.findUserById(userId)
            .then(user=>this.setState({user:user}));
    }

    componentWillReceiveProps(newProps){
        let userId = newProps.match.params.userId;
        this.setState({userId:userId})
        this.userService.findUserById(userId)
            .then(user=>this.setState({user:user}));
    }

    renderSongs(index){
        this.setState({songs:this.state.user.playlists[index].songs});
    }

    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-5">
                        <h3>Playlists </h3>
                        <ul className="list-group">
                            {this.state.user.playlists!==undefined && <li className="list-group-item active">Playlists</li>}
                            {this.state.user!=='' && this.state.user.playlists.map((playlist,index) => (
                                playlist.playlistType!=='Private'&&<li key={index} className="list-group-item" onClick={()=>this.renderSongs(index)}>{playlist.playlistName}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-5">
                        {this.state.songs.length!==0 && <h1>Songs </h1>}
                        <ul className="list-group">
                            {this.state.songs.length!==0 && <li className="list-group-item active">Songs</li>}
                            {this.state.songs.length>0 && this.state.songs.map((song,index) => (
                                <Link to={`/home/song/${song.spotifySongId}`}>
                                    <li key={index} className="list-group-item" >{song.songName}</li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

        )
    }
}

export default PublicPlaylist;