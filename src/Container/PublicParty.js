import React from 'react';
import UserService from "../Services/UserService";
import HostPlaylistService from "../Services/HostPlaylistService";

class PublicParty extends React.Component{

    constructor(props){
        super(props);
        this.state={
            profileUserId:'',
            user:'',
            userId:'',
            session:false,
            profileUser:'',
            partyPlaylist:false,
            selectedParty:'',
            playlists:''

        }
        this.userService=UserService.instance;
        this.hostplaylistService=HostPlaylistService.instance;
        this.renderParty=this.renderParty.bind(this);
        this.addPlaylist=this.addPlaylist.bind(this);
    }

    componentDidMount(){
        let profileUserId=this.props.match.params.userId;

        this.setState({profileUserId:profileUserId});

        fetch("https://beatdrop.herokuapp.com/api/profile",{
            credentials: 'include',
        }).then(response=> (
            response.json()
        )).then(json=> {
            if (json.userName !== 'CANNOT FIND'){
                this.setState({user:json,session:true,userId:json.id})
            }
        })

        this.userService.findUserById(profileUserId)
            .then(user=>this.setState({profileUser:user}))
    }

    componentWillReceiveProps(newProps){
        let profileUserId=newProps.match.params.userId;

        this.setState({profileUserId:profileUserId});

        fetch("https://beatdrop.herokuapp.com/api/profile",{
            credentials: 'include',
        }).then(response=> (
            response.json()
        )).then(json=> {
            if (json.userName !== 'CANNOT FIND'){
                this.setState({user:json,session:true,userId:json.id})
            }
        })

        this.userService.findUserById(profileUserId)
            .then(user=>this.setState({profileUser:user}))
    }

    renderParty(id){
        this.setState({partyPlaylist:true,selectedParty:id})
        this.hostplaylistService.getPlaylistForParty(id)
            .then(playlists=>this.setState({playlists:playlists}))
    }

    addPlaylist(id){
        this.hostplaylistService.addPlaylistToParty(id,this.state.selectedParty)
            .then(()=>this.hostplaylistService.getPlaylistForParty(this.state.selectedParty))
            .then(playlists=>this.setState({playlists:playlists}))
    }

    render(){
        return(
            <div>
                <br/>
                <div className="row">
                    <div className="col-4">
                        <div>
                            <ul className="list-group">
                                <li className="list-group-item active bg-dark" style={{border:"0px"}}>Parties</li>
                                {this.state.profileUser!==''&&this.state.profileUser.parties.map((party,index)=>(
                                    <li key={index} className="list-group-item" onClick={()=>this.renderParty(party.id)}>{party.partyname}
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
                                <li key={index} className="list-group-item">{playlist.playlistName} &emsp;
                                </li>
                            ))}
                            <br/>
                            <select className="form-control" onChange={e=>this.addPlaylist(e.target.value)}>
                                <option>Add your playlist to party</option>
                                {this.state.session===true && this.state.user.playlists.map((playlist,index)=>(
                                    <option key={index} value={playlist.id}>
                                        {playlist.playlistName}
                                    </option>
                                ))}
                            </select>
                        </ul>}
                    </div>
                </div>
            </div>
        )
    }
}
export default PublicParty;