import React from 'react';
import PartyService from "../Services/PartyService";
import HostPlaylistService from "../Services/HostPlaylistService";
import Link from "react-router-dom/es/Link";
import UserService from "../Services/UserService";
import SpotifyService from "../Services/SpotifyService";

class Party extends React.Component{

    constructor(props){
        super(props);
        this.state={
            partyName:'',
            user:'',
            userId:'',
            parties:'',
            accessToken:'',
            partyPlaylist:false,
            playlists:[],
            selectedParty:'',
            showSong:false,
            showPlaylistIndex:'',
            songs:[]

        }
        this.createParty=this.createParty.bind(this);
        this.renderParty=this.renderParty.bind(this);
        this.deleteParty=this.deleteParty.bind(this);
        this.addPlaylist=this.addPlaylist.bind(this);
        this.renderSong=this.renderSong.bind(this);
        this.deletePlaylist=this.deletePlaylist.bind(this);
        this.mergePlaylist=this.mergePlaylist.bind(this);
        this.partyService=PartyService.instance;
        this.hostplaylistService=HostPlaylistService.instance;
        this.userService=UserService.instance;
        this.spotifyService=SpotifyService.instance;
    }

    componentDidMount(){

        this.spotifyService.getAccessToken()
            .then(response=>(this.setState({accessToken:response.access_token})
        ))

        this.userService.getSession()
            .then((json)=>(this.setState({user:json,userId:json.id,parties:json.parties})))


    }

    componentWillReceiveProps(newProps){
        this.spotifyService.getAccessToken()
            .then(response=>(this.setState({accessToken:response.access_token})
            ))

        this.userService.getSession()
            .then((json)=>(this.setState({user:json,userId:json.id,parties:json.parties})))
    }

    mergePlaylist(){
        this.state.playlists.map((playlist,index)=>(
            playlist.songs.map(song=>(

                this.spotifyService.getTrackById(song.spotifySongId,this.state.accessToken)
                    .then((song)=>this.state.songs.push(song))
                    .then(()=>{
                        return this.state.songs.sort(function (a,b) {
                            return b.popularity - a.popularity
                        })
                    }).then(songs=>this.setState({songs:songs}))
            ))
        ))
    }

    createParty(){
        if(this.state.partyName===''){
            let newParty;

            newParty={
                partyname:'New Party'
            }

            this.partyService.createParty(newParty)
                .then(()=>(
                    this.partyService.getPartyForUser(this.state.userId)
                        .then((response)=>this.setState({parties:response}))
                ))
        }
        else{
            let newParty;

            newParty={
                partyname:this.state.partyName
            }

            this.partyService.createParty(newParty)
                .then(()=>(
                    this.partyService.getPartyForUser(this.state.userId)
                        .then((response)=>this.setState({parties:response}))
                ))
        }
    }

    renderParty(id){
        this.setState({partyPlaylist:true,selectedParty:id})
        this.hostplaylistService.getPlaylistForParty(id)
             .then(playlists=>this.setState({playlists:playlists}))
    }

    deleteParty(id){
        this.partyService.deleteParty(id)
            .then(()=>(
                this.partyService.getPartyForUser(this.state.userId)
                    .then((response)=>this.setState({parties:response}))
            ))
    }

    addPlaylist(id){
        this.hostplaylistService.addPlaylistToParty(id,this.state.selectedParty)
           .then(()=>this.hostplaylistService.getPlaylistForParty(this.state.selectedParty))
            .then(playlists=>this.setState({playlists:playlists}))
    }

    renderSong(id){
        this.setState({showSong:true,showPlaylistIndex:id})
    }

    deletePlaylist(id){
        this.hostplaylistService.deletePlaylist(id)
            .then(()=>this.hostplaylistService.getPlaylistForParty(this.state.selectedParty))
            .then(playlists=>this.setState({playlists:playlists}))
    }

    render(){
        return(
            <div>
                <form className="form-control" style={{padding:"15px"}}>
                    <input type="text" onChange={(e)=>this.setState({partyName:e.target.value})}/>
                    &nbsp;
                    <button className="btn btn-outline-dark float-right" type="button" onClick={()=>this.createParty()}>Create a party</button>
                </form>
                <br/>
                <div className="row">
                    <div className="col-4">
                        <div>
                            <ul className="list-group">
                                <li className="list-group-item active bg-dark" style={{border:"0px"}}>Parties</li>
                                {this.state.parties!==''&&this.state.parties.map((party,index)=>(
                                    <li key={index} className="list-group-item" onClick={()=>this.renderParty(party.id)}>{party.partyname} &emsp;
                                        <button className="btn float-right" onClick={()=>this.deleteParty(party.id)}><i className="fa fa-lg fa-times"/></button>
                                    </li>
                                ))}
                            </ul>
                            <br/>
                        </div>
                    </div>
                    <div className="col-4">
                        {this.state.partyPlaylist===true&&
                        <ul className="list-group">
                            <li className="list-group-item active bg-dark" style={{border:"0px"}}>Party Playlists</li>
                            {this.state.playlists.length>0 && this.state.playlists.map((playlist,index)=>(
                                <li key={index} className="list-group-item" onClick={()=>this.renderSong(index)}>{playlist.playlistName} &emsp;
                                    <button className="btn float-right" onClick={()=>this.deletePlaylist(playlist.id)}><i className="fa fa-lg fa-times"/></button>
                                </li>
                            ))}
                            <br/>
                            <select className="form-control" onChange={e=>this.addPlaylist(e.target.value)}>
                                <option>Add your playlist to party</option>
                                {this.state.user.playlists.map((playlist,index)=>(
                                    <option key={index} value={playlist.id}>
                                        {playlist.playlistName}
                                    </option>
                                    ))}
                            </select>
                            <br/>
                            <button className="btn btn-block btn-outline-dark" onClick={()=>this.mergePlaylist()}>Merge Playlists</button><br/>
                            <li className="list-group-item active bg-dark" style={{border:"0px"}}>Merged Playlist</li>
                            {this.state.songs.length>0 && this.state.songs.map((song,index)=>(
                                <Link to={`/home/song/${song.id}`}key={index} ><li  className="list-group-item">{song.name}</li></Link>
                            ))}
                        </ul>}
                    </div>
                    <div className="col-4">
                        {this.state.showSong===true &&
                        <ul className="list-group">
                            <li className="list-group-item bg-dark active" style={{border:"0px"}}>{this.state.playlists[this.state.showPlaylistIndex].playlistName}</li>
                            {this.state.playlists[this.state.showPlaylistIndex].songs.length>0 && this.state.playlists[this.state.showPlaylistIndex].songs.map((song,index)=>(
                                <li key={index} className="list-group-item">{song.songName}
                                </li>
                            ))}
                        </ul>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default Party;