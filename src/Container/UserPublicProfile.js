import React from 'react';
import Link from "react-router-dom/es/Link";
import {DropdownButton, MenuItem} from 'react-bootstrap';
import Home from "./Home";
import Route from "react-router-dom/es/Route";
import Followers from "./Followers";
import Playlist from "./Playlist";
import Following from "./Following";
import Feed from "./Feed";
import UserService from "../Services/UserService";

class UserPublicProfile extends React.Component{


    constructor(props){
        super(props)
        this.state={
            userId:'',
            user:''
        }
        this.userService=UserService.instance;
    }

    componentDidMount(){

        fetch("http://localhost:8080/api/profile",{
            credentials: 'include',
        }).then((response)=>response.json())
            .then((json)=>(this.setState({user:json,userId:json.id})))
    }

    componentWillReceiveProps(newProps){
        fetch("http://localhost:8080/api/profile",{
            credentials: 'include',
        }).then((response)=>response.json())
            .then((json)=>(this.setState({user:json,userId:json.id})))
    }

    render(){

        let songs=['Song 1','Song 2','Song 3','Song 4','Song 5','Song 6','Song 7','Song 8']

        return(
            <div>
                {/*{console.log(this.state.user)}*/}
                <nav class="navbar fixed-top navbar-light bg-light">
                    <Link to="/home"><a className="navbar-brand">
                        <i class="fa fa-lg fa-music" />&nbsp;&nbsp;BeatDrop</a></Link>
                </nav>
                <div style={{marginTop:"3%"}} className="row container-fluid">
                    <div className="col-3" style={divStyle}>
                        <i className="fa fa-5x fa-user-circle" style={{marginTop:'45px',color:'#fff'}}></i>
                        <h3>@{this.state.user.userName}</h3>
                        <button className="btn btn-primary">Follow</button>
                        <br/>
                        <br/>
                        Recently Played Songs
                        <br/>
                        <br/>
                        <ul className="list-group" >
                            {songs.map((song,index)=>(
                                <li className="list-group-item" key={index} style={{background:'black',borderBottom:'2px solid #363636'}}>
                                    {song}
                                </li>
                                ))}
                        </ul>
                    </div>
                    <div className="col-9">
                        <ul className="nav nav-tabs" style={navtabstyle}>
                           <Link to={`/user/profile/followers`}><li className="nav-item" style={{padding:"15px"}}>
                                <button className="btn-primary btn">Followers</button>
                           </li></Link>
                            <Link to={`/user/profile/following`}><li className="nav-item" style={{padding:"15px"}}>
                                <button className="btn-primary btn">Following</button>
                            </li></Link>
                            <Link to={`/user/profile/feed`}><li className="nav-item" style={{padding:"15px"}}>
                                <button className="btn-primary btn">Feed</button>
                            </li></Link>
                            <Link to={`/user/profile/playlist`}><li className="nav-item" style={{padding:"15px"}}>
                                <button className="btn-primary btn">Playlist</button>
                            </li></Link>
                        </ul>
                        <Route path="/user/profile/followers"
                               component={Followers} />
                        <Route path="/user/profile/following"
                               component={Following}/>
                        <Route path="/user/profile/feed"
                               component={Feed}/>
                        <Route path="/user/profile/playlist"
                               component={Playlist}/>
                    </div>
                </div>
            </div>
        )

    }

}

const divStyle = {
    height:'100vh',
    background:"#363636",
    textAlign:"center",
    color:"#fff",
    paddingLeft:"22px",

};

const navtabstyle={
    marginTop:"25px"
}


export default UserPublicProfile