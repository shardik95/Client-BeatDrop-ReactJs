import React from 'react';
import Link from "react-router-dom/es/Link";

class HomeFeed extends React.Component{

    constructor(props){
        super(props)
        this.state={
            artists:[],
            users:[]
        }
    }

    componentDidMount(){
        fetch("http://localhost:8080/api/artist")
            .then(response=>response.json())
            .then((artists)=>this.setState({artists:artists}))

        fetch("http://localhost:8080/api/user")
            .then(response=>response.json())
            .then((users)=>this.setState({users:users}))
    }

    componentWillReceiveProps(newProps){
        fetch("http://localhost:8080/api/artist")
            .then(response=>response.json())
            .then((artists)=>this.setState({artists:artists}))
        fetch("http://localhost:8080/api/user")
            .then(response=>response.json())
            .then((users)=>this.setState({users:users}))
    }

    render(){
        return (
            <div style={{marginTop:"5%"}}>
                {this.state.users.length>0 && this.state.users.map((user,index)=>(
                    user.type ==='Host'&&
                    <div>
                    <div className="card" style={{width:"600px",height:"130px"}} key={index}>
                        <div className="card-header">
                            Host
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-9">
                                    {user.parties.length>0 && user.parties.map(party=>(
                                    <p className="card-text">{user.userName} created party {party.partyname}</p>))}
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
                        <div className="card" style={{width:"600px",height:"130px"}} key={index}>
                            <div className="card-header">
                                Song
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-9">
                                        <p className="card-text">{artist.userName} uploaded {song.songName}</p>
                                    </div>
                                    <div className="col-3">
                                        <i className="fa fa-user-circle fa-2x float-right"/>
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