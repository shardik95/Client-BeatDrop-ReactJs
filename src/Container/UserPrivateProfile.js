import React from 'react';
import Link from "react-router-dom/es/Link";
import Route from "react-router-dom/es/Route";
import Followers from "./Followers";
import Playlist from "./Playlist";
import Following from "./Following";
import Feed from "./Feed";
import UserService from "../Services/UserService";
import Account from "./Account";
import FileService from "../Services/FileService";
import Party from "./Party";
import Ticket from "./Ticket";

class UserPrivateProfile extends React.Component{


    constructor(props){
        super(props)
        this.state={
            userId:'',
            user:'',
            session:false,
            file:[]
        }
        this.userService=UserService.instance;
        this.logout=this.logout.bind(this);
        this.onChange=this.onChange.bind(this);
        this.onFormSubmit=this.onFormSubmit.bind(this);
        this.fileService=FileService.instance;
        this.deleteSong=this.deleteSong.bind(this);
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

    onFormSubmit(e){
        e.preventDefault()
         this.fileService.fileUpload(this.state.file,this.state.user.id).then((response)=>{
             fetch("http://localhost:8080/api/profile",{
                 credentials: 'include',
             }).then(response=> (
                 response.json()
             )).then(json=> {
                 if (json.userName !== 'CANNOT FIND'){
                     this.setState({user:json,session:true,userId:json.id})
                 }})
        })
    }

    onChange(e) {
        this.setState({file:e.target.files[0]})
    }

    deleteSong(song){
        this.fileService.deleteFile(song.songName,song.id)
            .then(()=>fetch("http://localhost:8080/api/profile",{
                credentials: 'include',
            }).then(response=> (
                response.json()
            )).then(json=> {
                if (json.userName !== 'CANNOT FIND'){
                    this.setState({user:json,session:true,userId:json.id})
                }}))
    }

    render(){



        return(
            <div>
                <nav className="navbar fixed-top navbar-light" style={{background:"#363636"}}>
                    <button className="navbar-brand btn" onClick={()=>this.props.history.push("/home")} style={{color:"#fff",background:"#363636"}}>
                        <i className="fa fa-lg fa-music" style={{color:'#2C8AFF'}}/>&nbsp;&nbsp;BeatDrop</button>
                    <form className="form-inline">
                        <div hidden={this.state.session}>
                            <Link to="/home/login"><button className="btn btn-outline-light" style={{marginRight:"5px"}} type="button">Login</button></Link>

                            <Link to="/home/signup"><button className="btn btn-outline-light" style={{marginRight:"10px"}} type="button">SignUp</button></Link>
                        </div>
                        <h3 style={{color:"#fff",marginRight:"10px"}} hidden={!this.state.session}>Hi, {this.state.user.firstName}</h3>
                        {this.state.user.type === 'Artist' && <i className="fa fa-lg fa-check-circle" style={{color:'#2C8AFF'}}/>}
                        <div hidden={!this.state.session}>
                            <Link to="/user/profile"><button className="btn btn-outline-light" style={{marginRight:"5px"}} type="button">Profile</button></Link>
                            <button className="btn btn-outline-light" style={{marginRight:"5px"}} onClick={()=>this.logout()} type="button">Logout</button>
                        </div>
                    </form>
                </nav>
                <div style={{marginTop:"3%"}} className="row container-fluid">
                    <div className="col-3" style={divStyle}>
                        <i className="fa fa-5x fa-user-circle" style={{marginTop:'45px',color:'#fff'}}/>
                        <h3>@{this.state.user.userName}
                            {this.state.user.type === 'Artist' && <i className="fa fa-check-circle" style={{color:'#2C8AFF'}}/>}
                        </h3>
                        <Link to={`/user/profile/account`}>
                            <button className="btn btn-primary">Edit</button>
                        </Link>
                        <br/>
                        <br/>
                        <div style={{border:"1px solid white"}}>
                            <p>Name: {this.state.user.firstName} {this.state.user.lastName}</p>
                            <p>Email: {this.state.user.email} </p>
                        </div>

                        <br/>
                        {this.state.user.type==='Artist' && <div>Recently Uploaded Songs
                        <br/>
                        <br/>
                        <ul className="list-group" >
                            {this.state.user.songs.map((song,index)=>(
                                <li className="list-group-item" key={index} style={{background:'black',borderBottom:'2px solid #363636'}}>
                                    {song.songName}
                                    <i className="fa fa-lg fa-times float-right" style={{color:"red"}} onClick={()=>this.deleteSong(song)}/>
                                </li>
                            ))}
                        </ul>
                    </div>}
                        <br/>
                        {this.state.user.type ==='Artist' && <form onSubmit={this.onFormSubmit}>
                            <input type="file" onChange={this.onChange} className="form-control" /><br/>
                            <button type="submit" className="btn btn-primary">Upload</button>
                        </form>}
                    </div>
                    <div className="col-9">
                        <ul className="nav nav-tabs" style={navtabstyle}>
                            <li className="nav-item active" style={{padding:"15px"}}>
                                <Link to={`/user/profile/account`}> Account </Link>
                            </li>
                            <li className="nav-item" style={{padding:"15px"}}>
                              <Link to={`/user/profile/followers`}>Followers</Link>
                            </li>
                            {this.state.user.type==='User' && <li className="nav-item" style={{padding:"15px"}}>
                                <Link to={`/user/profile/following`}> Following</Link>
                            </li>}
                            <li className="nav-item" style={{padding:"15px"}}>
                                <Link to={`/user/profile/feed`}>Feed</Link>
                            </li>
                            <li className="nav-item" style={{padding:"15px"}}>
                                <Link to={`/user/profile/playlist`}>  Playlist</Link>
                            </li>
                            {this.state.user.type==='Host' && <li className="nav-item" style={{padding:"15px"}}>
                                <Link to={`/user/profile/party`}>  Party</Link>
                            </li>}
                            {this.state.user.type==='Host' &&<li className="nav-item" style={{padding:"15px"}}>
                                <Link to={`/user/profile/ticket`}>  Tickets</Link>
                            </li>}
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
                        <Route path="/user/profile/party"
                               component={Party} />
                        <Route path="/user/profile/ticket"
                               component={Ticket} />
                    </div>
                </div>
                <footer className="fixed-bottom" style={{width:"100%",height:"25px",background:"#363636",marginTop:"2%",paddingTop:"5px"}}>
                    <div style={{marginRight:"20px"}}>
                        <i className="fa fa-facebook-f float-right" style={{color:"#fff"}}/>
                        <i className="fa fa-instagram float-right" style={{color:"#fff"}}/>
                        <i className="fa fa-github float-right" style={{color:"#fff"}}/>
                        <i className="fa fa-twitter float-right" style={{color:"#fff"}}/>
                    </div>
                </footer>
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