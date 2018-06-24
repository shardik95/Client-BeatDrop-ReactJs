import React from 'react';
import UserService from "../Services/UserService";
import Link from "react-router-dom/es/Link";
import Playlist from "./Playlist";
import Feed from "./Feed";
import Route from "react-router-dom/es/Route";
import PublicFollowers from "./PublicFollowers";
import PublicFollowing from "./PublicFollowing";
import PublicFeed from "./PublicFeed";
import PublicPlaylist from "./PublicPlaylist";
import Party from "./Party";
import Ticket from "./Ticket";
import PublicParty from "./PublicParty";
import PublicTicket from "./PublicTicket";

class UserPublicProfile extends React.Component{

    constructor(props){
        super(props)
        this.state={
            userId:'',
            user:'',
            profileUser:'',
            session:false,
            profileUserId:'',
            showFollow:true
        }
        this.userService=UserService.instance;
        this.logout=this.logout.bind(this);
        this.follow=this.follow.bind(this);
        this.unFollow=this.unFollow.bind(this);
    }

    componentDidMount(){

        let profileUserId=this.props.match.params.userId;

        this.setState({profileUserId:profileUserId});

        fetch("http://localhost:8080/api/profile",{
            credentials: 'include',
        }).then(response=> (
            response.json()
        )).then(json=> {
            if (json.userName !== 'CANNOT FIND'){
                this.setState({user:json,session:true,userId:json.id})
                this.state.user!==''&&this.state.user.following.map(follow=>{
                    if(follow.myId==this.state.profileUserId){
                        this.setState({showFollow:false})
                    }
                })
            }
        })

        this.userService.findUserById(profileUserId)
            .then(user=>this.setState({profileUser:user}))
    }

    componentWillReceiveProps(newProps){

        let profileUserId=newProps.match.params.userId;

        this.setState({profileUserId:profileUserId});

        fetch("http://localhost:8080/api/profile",{
            credentials: 'include',
        }).then(response=> (
            response.json()
        )).then(json=> {
            if (json.userName !== 'CANNOT FIND'){
                this.setState({user:json,session:true,userId:json.id})
                this.state.user!==''&&this.state.user.following.map(follow=>{
                    if(follow.id===this.state.profileUserId){
                        this.setState({showFollow:false})
                    }
                })
            }})

        this.userService.findUserById(profileUserId)
            .then(user=>this.setState({profileUser:user}))
    }

    logout(){
        this.userService.logout();
        this.setState({user:'',session:false})
        this.props.history.push("/home")

    }

    unFollow(){
        let following=0;
        let follower=0;
        this.state.user!==''&& this.state.user.following.map(follow=> {
            if(follow.userName === this.state.profileUser.userName){
                following=follow.id;
            }
        })

        this.state.profileUser!==''&& this.state.profileUser.followers.map(follow=> {
            if(follow.userName === this.state.user.userName){
                follower=follow.id;
            }
        })

        this.userService.unfollow(following,follower)
            .then(()=>fetch("http://localhost:8080/api/profile",{
                    credentials: 'include',
                }).then(response=> (
                    response.json()
                )).then(json=> {
                    if (json.userName !== 'CANNOT FIND'){
                        this.setState({user:json,userId:json.id,showFollow:true})
                    }})
            )
    }

    follow(){
        if(this.state.user!==''){
            this.userService.followUser(this.state.user,this.state.profileUserId)
                .then(()=>(
                    fetch("http://localhost:8080/api/profile",{
                        credentials: 'include',
                    }).then(response=> (
                        response.json()
                    )).then(json=> {
                        if (json.userName !== 'CANNOT FIND'){
                            this.setState({user:json,session:true,userId:json.id})
                            this.state.user!==''&&this.state.user.following.map(follow=>{
                                if(follow.myId==this.state.profileUserId){
                                    this.setState({showFollow:false})
                                }
                            })
                        }
                    })

                ))
        }
        else{
            alert("please login")
        }
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
                    <h3 style={{color:"#000",marginRight:"10px"}} hidden={!this.state.session}>Hi, {this.state.user.firstName}
                        {this.state.user.type === 'Artist' && <i className="fa fa-lg fa-check-circle" style={{color:'#2C8AFF'}}/>}
                    </h3>
                    <div hidden={!this.state.session}>
                        <Link to="/user/profile"><button className="btn btn-outline-primary" style={{marginRight:"5px"}} type="button">Profile</button></Link>
                        <button className="btn btn-outline-primary" style={{marginRight:"5px"}} onClick={()=>this.logout()} type="button">Logout</button>
                    </div>
                    </form>
                </nav>
                <div style={{marginTop:"3%"}} className="row container-fluid">
                    <div className="col-3" style={divStyle}>
                        <i className="fa fa-5x fa-user-circle" style={{marginTop:'45px',color:'#fff'}}/>
                        <h3>@{this.state.profileUser.userName}
                            {this.state.profileUser.type === 'Artist' && <i className="fa fa-check-circle" style={{color:'#2C8AFF'}}/>}
                        </h3>

                        {this.state.user.type!=='Artist'&&
                        <button className="btn btn-primary" onClick={()=>this.follow()} hidden={!this.state.showFollow}>Follow</button>}
                        {this.state.user.type!=='Artist'&&
                        <button className="btn btn-primary" hidden={this.state.showFollow} onClick={()=>this.unFollow()}>UnFollow</button>}
                        <br/>
                        <br/>
                        {this.state.profileUser.type!=="Artist"&& <div>Recently Played Songs
                        <br/>
                        <br/>
                        <ul className="list-group" >
                            {songs.map((song,index)=>(
                                <li className="list-group-item" key={index} style={{background:'black',borderBottom:'2px solid #363636'}}>
                                    {song}
                                </li>
                            ))}
                        </ul>
                        </div>}
                        {this.state.profileUser.type==='Artist' && <div>Recently Uploaded Songs
                            <br/>
                            <br/>
                            <ul className="list-group" >
                                {this.state.profileUser.songs.map((song,index)=>(
                                    <li className="list-group-item" key={index} style={{background:'black',borderBottom:'2px solid #363636'}}>
                                        {song.songName}
                                    </li>
                                ))}
                            </ul>
                        </div>}
                    </div>
                    <div className="col-9">
                        <ul className="nav nav-tabs" style={navtabstyle}>
                            <li className="nav-item" style={{padding:"15px"}}>
                                <Link to={`/user/${this.state.profileUserId}/profile/followers`}>Followers</Link>
                            </li>
                            {this.state.profileUser.type==='User'&&<li className="nav-item" style={{padding:"15px"}}>
                                <Link to={`/user/${this.state.profileUserId}/profile/following`}> Following</Link>
                            </li>}
                            {this.state.profileUser.type!=='Artist' && <li className="nav-item" style={{padding:"15px"}}>
                                <Link to={`/user/${this.state.profileUserId}/profile/feed`}>Feed</Link>
                            </li>}
                            <li className="nav-item" style={{padding:"15px"}}>
                                <Link to={`/user/${this.state.profileUserId}/profile/playlist`}>  Playlist</Link>
                            </li>
                            {this.state.profileUser.type==='Host' && <li className="nav-item" style={{padding:"15px"}}>
                                <Link to={`/user/${this.state.profileUserId}/profile/party`}>  Party</Link>
                            </li>}
                            {this.state.profileUser.type==='Host' &&<li className="nav-item" style={{padding:"15px"}}>
                                <Link to={`/user/${this.state.profileUserId}/profile/ticket`}>  Tickets</Link>
                            </li>}
                        </ul>
                        <Route path="/user/:userId/profile/followers"
                               component={PublicFollowers} />
                        <Route path="/user/:userId/profile/following"
                               component={PublicFollowing}/>
                        <Route path="/user/:userId/profile/feed"
                               component={PublicFeed}/>
                        <Route path="/user/:userId/profile/playlist"
                               component={PublicPlaylist}/>
                        <Route path="/user/:userId/profile/party"
                               component={PublicParty} />
                        <Route path="/user/:userId/profile/ticket"
                               component={PublicTicket} />
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


export default UserPublicProfile;