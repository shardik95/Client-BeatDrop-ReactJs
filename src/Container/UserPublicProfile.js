import React from 'react';
import UserService from "../Services/UserService";
import Link from "react-router-dom/es/Link";
import Route from "react-router-dom/es/Route";
import PublicFollowers from "./PublicFollowers";
import PublicFollowing from "./PublicFollowing";
import PublicFeed from "./PublicFeed";
import PublicPlaylist from "./PublicPlaylist";
import PublicParty from "./PublicParty";
import PublicTicket from "./PublicTicket";
import Modal from 'react-modal';

class UserPublicProfile extends React.Component{

    constructor(props){
        super(props)
        this.state={
            userId:'',
            user:'',
            profileUser:'',
            session:false,
            profileUserId:'',
            showFollow:true,
            modalIsOpen: false
        }
        this.userService=UserService.instance;
        this.logout=this.logout.bind(this);
        this.follow=this.follow.bind(this);
        this.unFollow=this.unFollow.bind(this);
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

    }

    componentDidMount(){

        let profileUserId=this.props.match.params.userId;

        this.setState({profileUserId:profileUserId});

        this.userService.getSession()
            .then(json=> {
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

        this.userService.getSession()
            .then(json=> {
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

    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
        this.subtitle.style.color = '#fff';
    }

    closeModal() {
        this.setState({modalIsOpen: false});
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
            .then(()=>this.userService.getSession()
                .then(json=> {
                    if (json.userName !== 'CANNOT FIND'){
                        this.setState({user:json,userId:json.id,showFollow:true})
                    }})
            )
    }

    follow(){
        if(this.state.user!==''){
            this.userService.followUser(this.state.user,this.state.profileUserId)
                .then(()=>(
                    this.userService.getSession()
                        .then(json=> {
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
            this.openModal();
        }
    }

    render(){

        return(
            <div>

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal" ariaHideApp={false}>

                    <h4 ref={subtitle => this.subtitle = subtitle} style={{textAlign:"center",marginLeft:"10px",marginRight:"10px"}}>Please Login</h4>
                    <button onClick={this.closeModal} className="btn btn-outline-light">close</button>
                </Modal>

                <nav className="navbar fixed-top navbar-light" style={{background:"#363636"}}>
                    <button className="navbar-brand btn" onClick={()=>this.props.history.push("/home")} style={{color:"#fff",background:"#363636"}}>
                        <i className="fa fa-lg fa-music" style={{color:'#2C8AFF'}}/>&nbsp;&nbsp;BeatDrop</button>
                    <form className="form-inline">
                    <div hidden={this.state.session}>
                        <Link to="/home/login"><button className="btn btn-outline-light" style={{marginRight:"5px"}} type="button">Login</button></Link>

                        <Link to="/home/signup"><button className="btn btn-outline-light" style={{marginRight:"10px"}} type="button">SignUp</button></Link>
                    </div>
                    <h3 style={{color:"#fff",marginRight:"10px"}} hidden={!this.state.session}>Hi, {this.state.user.firstName}
                        {this.state.user.type === 'Artist' && <i className="fa fa-lg fa-check-circle" style={{color:'#2C8AFF'}}/>}
                    </h3>
                    <div hidden={!this.state.session}>
                        <Link to="/user/profile"><button className="btn btn-outline-light" style={{marginRight:"5px"}} type="button">Profile</button></Link>
                        <button className="btn btn-outline-light" style={{marginRight:"5px"}} onClick={()=>this.logout()} type="button">Logout</button>
                    </div>
                    </form>
                </nav>
                <div style={{marginTop:"3%"}} className="row container-fluid">
                    <div className="col-3" style={divStyle}>
                        <i className="fa fa-5x fa-user-circle" style={{marginTop:'45px',color:'#fff'}}/>
                        <h3>@{this.state.profileUser.userName}
                            {this.state.profileUser.type === 'Artist' && <i className="fa fa-check-circle" style={{color:'#2C8AFF'}}/>}
                        </h3>


                        {this.state.user.type=='User'&&
                        <button className="btn btn-primary" onClick={()=>this.follow()} hidden={!this.state.showFollow}>Follow</button>}
                        {this.state.user.type=='User'&&
                        <button className="btn btn-primary" hidden={this.state.showFollow} onClick={()=>this.unFollow()}>UnFollow</button>}
                        <br/>
                        <br/>
                        <div style={{border:"1px solid white"}}>
                            <p>Name: {this.state.profileUser.firstName} {this.state.profileUser.lastName}</p>
                            <p>Email: {this.state.profileUser.email} </p>
                        </div>
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

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        background:'#363636',
        borderRadius:'10px'
    }
};


export default UserPublicProfile;