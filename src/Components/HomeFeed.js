import React from 'react';
import Link from "react-router-dom/es/Link";
import ArtistService from "../Services/ArtistService";
import UserService from "../Services/UserService";

class HomeFeed extends React.Component{

    constructor(props){
        super(props)
        this.state={
            artists:[],
            users:[]
        }
        this.artistService=ArtistService.instance;
        this.userService=UserService.instance;
    }

    componentDidMount(){
        this.artistService.findAllArtists()
            .then((artists)=>this.setState({artists:artists}))

        this.userService.findAllUsers()
            .then((users)=>this.setState({users:users}))
    }

    componentWillReceiveProps(newProps){
        this.artistService.findAllArtists()
            .then((artists)=>this.setState({artists:artists}))

        this.userService.findAllUsers()
            .then((users)=>this.setState({users:users}))
    }

    render(){
        return (
            <div style={{marginTop:"1%"}}>
                <div className="container" style={{color:"#363636",fontSize:"large"}}><u><b>Live Feed</b></u></div><br/>
                {this.state.users.length>0 && this.state.users.map((user,index)=>(
                    user.type ==='Host'&& user.parties.length>0 &&
                    <div key={index}>
                    <div className="card"
                         style={{width:"600px",borderRadius:"20px",background: 'linear-gradient(#fff2f2, white)'}}
                         key={index}>
                        <div className="card-header bg-dark" style={{color:"#fff"}}>
                            Party
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-9">
                                    {user.parties.length>0 && user.parties.map((party,index)=>(
                                        <div key={index}> <p className="card-text">
                                            <Link to={`/user/${user.id}/profile`}>
                                                <i className="fa fa-users" style={{color:"#2C8AFF"}}/> &nbsp;
                                                {user.userName}
                                                </Link>
                                            &nbsp;created party {party.partyname}</p><hr/></div>))}
                                </div>
                                <div className="col-3">
                                    <Link to={`/user/${user.id}/profile/party`}>Add Songs!</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                        <br/>
                    </div>
                ))}

                {this.state.artists.length>0 && this.state.artists.map((artist,index)=>
                    artist.songs.map(song=>
                        <div className="card"
                             style={{width:"600px",height:"130px",borderRadius:"20px",marginBottom:"20px",
                                 background: 'linear-gradient(#fff2f2, white)'}} key={index}>
                            <div className="card-header bg-dark" style={{color:"#fff"}} >
                                Song
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-9">
                                        <p className="card-text"> <Link to={`/user/${artist.id}/profile`}>
                                            <i className="fa fa-user-circle"/>&nbsp;{artist.userName} </Link>
                                            uploaded {song.songName}
                                        </p>
                                    </div>
                                    <div className="col-3">
                                        <i className="fa fa-lg fa-music float-right" style={{color:'#2C8AFF'}}/>
                                    </div>
                                </div>
                            </div>
                    </div>)
                )}
            </div>
        )
    }
}

export default HomeFeed;