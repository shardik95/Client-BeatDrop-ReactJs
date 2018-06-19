import React from 'react';
import Link from "react-router-dom/es/Link";
import Route from "react-router-dom/es/Route";
import Followers from "./Followers";
import Playlist from "./Playlist";
import Following from "./Following";
import Feed from "./Feed";
import UserService from "../Services/UserService";
import Account from "./Account";

class UserPrivateProfile extends React.Component{


    constructor(props){
        super(props)
        this.state={
            userId:'',
            user:'',
            session:false
        }
        this.userService=UserService.instance;
        this.logout=this.logout.bind(this);
    }

    componentDidMount(){

        fetch("http://localhost:8080/api/profile",{
            credentials: 'include',
        }).then(response=> (
            response.json()
        )).then(json=> {
            if (json.userName !== 'CANNOT FIND'){
                this.setState({user:json,session:true,userId:json.id})
            }})
    }

    componentWillReceiveProps(newProps){
        fetch("http://localhost:8080/api/profile",{
            credentials: 'include',
        }).then(response=> (
            response.json()
        )).then(json=> {
            if (json.userName !== 'CANNOT FIND'){
                this.setState({user:json,session:true,userId:json.id})
            }})
    }

    logout(){
        this.userService.logout();
        this.setState({user:'',session:false})
        this.props.history.push("/home")

    }

    render(){

        let songs=['Song 1','Song 2','Song 3','Song 4','Song 5','Song 6','Song 7','Song 8']

        return(
            <div>
                <nav className="navbar fixed-top navbar-light bg-light">
                    <Link to="/home"><a className="navbar-brand">
                        <i className="fa fa-lg fa-music"/>&nbsp;&nbsp;BeatDrop</a></Link>
                    <form className="form-inline">
                        <div hidden={this.state.session}>
                            <Link to="/home/login"><button className="btn btn-outline-primary" style={{marginRight:"5px"}} type="button">Login</button></Link>

                            <Link to="/home/signup"><button className="btn btn-outline-primary" style={{marginRight:"10px"}} type="button">SignUp</button></Link>
                        </div>
                        <h3 style={{color:"#000",marginRight:"10px"}} hidden={!this.state.session}>Hi, {this.state.user.firstName}</h3>
                        <div hidden={!this.state.session}>
                            <Link to="/user/profile"><button className="btn btn-outline-primary" style={{marginRight:"5px"}} type="button">Profile</button></Link>
                            <button className="btn btn-outline-primary" style={{marginRight:"5px"}} onClick={()=>this.logout()} type="button">Logout</button>
                        </div>
                    </form>
                </nav>
                <div style={{marginTop:"3%"}} className="row container-fluid">
                    <div className="col-3" style={divStyle}>
                        <i className="fa fa-5x fa-user-circle" style={{marginTop:'45px',color:'#fff'}}></i>
                        <h3>@{this.state.user.userName}</h3>
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
                            <li className="nav-item active" style={{padding:"15px"}}>
                                <Link to={`/user/profile/account`}> Account </Link>
                            </li>
                            <li className="nav-item" style={{padding:"15px"}}>
                              <Link to={`/user/profile/followers`}>Followers</Link>
                            </li>
                            <li className="nav-item" style={{padding:"15px"}}>
                                <Link to={`/user/profile/following`}> Following</Link>
                            </li>
                            <li className="nav-item" style={{padding:"15px"}}>
                                <Link to={`/user/profile/feed`}>Feed</Link>
                            </li>
                            <li className="nav-item" style={{padding:"15px"}}>
                                <Link to={`/user/profile/playlist`}>  Playlist</Link>
                            </li>
                        </ul>
                        <Route path="/user/profile/account"
                               component={Account} />
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


export default UserPrivateProfile