import React from 'react';
import UserService from "../Services/UserService";
import ArtistService from "../Services/ArtistService";
import SongService from "../Services/SongService";
import HostService from "../Services/HostService";
import PartyService from "../Services/PartyService";

class Admin extends React.Component{

    constructor(props){
        super(props)
        this.state={
            user:'',
            session:'',
            selectedOption:'',
            role:[],
            selectedUser:'',
            update:false,
            updatemsg:false,
            selected:false,
            inputChange:'',
            validation:false
        }
        this.logout=this.logout.bind(this);
        this.renderRole=this.renderRole.bind(this);
        this.selectUser=this.selectUser.bind(this);
        this.updateProfile=this.updateProfile.bind(this);
        this.deleteUser=this.deleteUser.bind(this);
        this.createUser=this.createUser.bind(this);
        this.deletePlaylist=this.deletePlaylist.bind(this);
        this.selectArtist=this.selectArtist.bind(this);
        this.deleteArtist=this.deleteUser.bind(this);
        this.verify=this.verify.bind(this);
        this.createArtist=this.createArtist.bind(this);
        this.deleteSong=this.deleteSong.bind(this);
        this.userService=UserService.instance;
        this.artistService=ArtistService.instance;
        this.songService=SongService.instance;
        this.hostService=HostService.instance;
        this.partyService=PartyService.instance;
        this.createHost=this.createHost.bind(this);
        this.deleteParty=this.deleteParty.bind(this);
    }

    componentDidMount(){
        fetch("http://localhost:8080/api/profile",{
            credentials: 'include',
        }).then(response=> (
            response.json()
        )).then(json=> {
            if (json.userName !== 'CANNOT FIND'){
                this.setState({user:json,session:true})
            }})
    }

    componentWillReceiveProps(newProps){
        fetch("http://localhost:8080/api/profile",{
            credentials: 'include',
        }).then(response=> (
            response.json()
        )).then(json=> {
            if (json.userName !== 'CANNOT FIND'){
                this.setState({user:json,session:true})
            }})
    }

    logout(){
        this.userService.logout()
        this.setState({user:'',session:false})
        this.props.history.push('/home')
    }

    renderRole(role){
        this.setState({selectedOption:role})
        if(role==='Artists'){
            this.artistService.findAllArtists()
                .then(users=>this.setState({role:users}))
        }
        else if(role==='Users'){
            this.userService.findAllUsers()
                .then(users=>this.setState({role:users}))
        }
        else if(role ==='Hosts'){
            this.hostService.getAllHosts()
                .then(users=>this.setState({role:users}))
        }
    }

    deleteParty(id){
        return this.partyService.deleteParty(id)
            .then(()=>this.userService.findAllUsers())
            .then(users=>this.setState({role:users}))
    }

    deleteSong(id){
        return this.songService.deleteUploadedSong(id)
            .then(()=>this.userService.findAllUsers())
            .then(users=>this.setState({role:users}))
    }

    deletePlaylist(playlistId){
        return fetch("http://localhost:8080/api/playlist/"+playlistId,{
            method:'delete'
        }).then(()=>this.userService.findAllUsers())
            .then(users=>this.setState({role:users}))
    }

    selectUser(user){
        this.setState({selectedUser:user,selected:true})
    }

    updateProfile(newUser){
        this.userService.updateUser(newUser)
        this.setState({updatemsg:true})
        this.userService.findAllUsers()
            .then(users=>this.setState({role:users}))
    }

    deleteUser(id){
        this.userService.deleteUser(id)
            .then(()=>this.userService.findAllUsers()
                .then(users=>this.setState({role:users,selected:false})))

    }

    createHost(){
        if(this.state.inputChange===''){
            this.setState({validation:true})
        }
        else{
            this.setState({validation:false})
            let host= {
                userName: this.state.inputChange,
                type: 'Host',
                password: this.state.inputChange
            }
            this.hostService.createHost(host)
                .then(()=>this.userService.findAllUsers()
                    .then(users=>this.setState({role:users,selected:false})))
        }
    }

    createUser(){
        if(this.state.inputChange===''){
            this.setState({validation:true})
        }
        else{
            this.setState({validation:false})
            let user= {
                userName: this.state.inputChange,
                type: 'User',
                password: this.state.inputChange
            }
            this.userService.createUser(user)
                .then(()=>this.userService.findAllUsers()
                    .then(users=>this.setState({role:users,selected:false})))
        }
    }

    verify(){

        this.userService.verifyUser(this.state.selectedUser)
            .then(()=>this.userService.findAllUsers()
                .then(users=>this.setState({role:users,selected:false})))
    }

    selectArtist(artist){
        this.setState({selectedUser:artist,selected:true})
    }

    deleteArtist(id){
        this.artistService.deleteArtist(id)
            .then(()=>this.userService.findAllUsers()
                .then(users=>this.setState({role:users,selected:false})))
    }

    createArtist(){
        if(this.state.inputChange===''){
            this.setState({validation:true})
        }
        else{
            this.setState({validation:false})
            let artist= {
                userName: this.state.inputChange,
                type: 'Artist',
                password: this.state.inputChange
            }
            this.artistService.createArtist(artist)
                .then(()=>this.userService.findAllUsers()
                    .then(users=>this.setState({role:users,selected:false})))
        }
    }

    selectHost(host){
        this.setState({selectedUser:host,selected:true})
    }

    deleteHost(id){
        this.hostService.deleteHost(id)
            .then(()=>this.userService.findAllUsers()
                .then(users=>this.setState({role:users,selected:false})))
    }



    render(){

        let newUser=this.state.selectedUser
        let date=''+this.state.selectedUser.dob;
        date=date.substring(0,10)

        return(
            <div>
                <nav className="navbar fixed-top navbar-light bg-light">
                    <button className="navbar-brand btn" onClick={()=>this.props.history.push('/home')}>
                        <i className="fa fa-lg fa-music" style={{color:'blue'}}/>&nbsp;&nbsp;BeatDrop</button>
                    <form className="form-inline">

                        <h3 style={{color:"#000",marginRight:"10px"}} hidden={!this.state.session}>Hi, {this.state.user.firstName}</h3>
                        <div hidden={!this.state.session}>
                            <button className="btn btn-outline-primary" style={{marginRight:"5px"}} onClick={()=>this.logout()} type="button">Logout</button>
                        </div>
                    </form>
                </nav>
                <div style={{marginTop:"5%"}}>
                    <div className="row">
                        <div className="col-4">
                            <form style={{textAlign:'center'}}>
                                <label>Select Type of Role</label>
                            </form>
                        </div>
                        <div className="col-8">
                            <select className="form-control" onChange={(e)=>this.renderRole(e.target.value)}>
                                <option>Select Role</option>
                                <option>Users</option>
                                <option>Artists</option>
                                <option>Hosts</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row" style={{marginTop:"5%"}}>
                    <div className="col-3">
                        <ul className="list-group">
                            {this.state.role.length>0 && this.state.selectedOption==='Users' &&
                            <li className="list-group-item active">
                                Users
                            </li>}
                            {this.state.role.length>0 && this.state.selectedOption==='Users' && this.state.role.map((user,index)=>(
                                user.type==='User' && <li className="list-group-item" onClick={()=>this.selectUser(user)} key={index}>
                                    {user.userName}
                                    <i className="fa fa-trash float-right fa-lg" onClick={()=>this.deleteUser(user.id)}/>
                                </li>
                            ))}<br/>
                            {this.state.role.length>0 && this.state.selectedOption==='Users' && <div className='row'>
                                <div className='col-8'>
                                    <input className="form-control" onChange={e=>this.setState({inputChange:e.target.value})}/>
                                    {this.state.validation && <span style={{color:'red'}}>Type Something</span>}
                                </div>
                                <div className="col-1">
                                    <span style={{color:'red'}}>*</span>

                                </div>
                                <div className='col-1'>
                                    <button className="btn btn-outline-dark" onClick={()=>this.createUser()}>
                                        <i className='fa fa-plus'/>
                                    </button>
                                </div>
                            </div>}
                            </ul>
                        <ul className="list-group">
                            {this.state.role.length>0 && this.state.selectedOption==='Artists' &&
                            <li className="list-group-item active">
                                Artists
                            </li>}
                            {this.state.role.length>0 && this.state.selectedOption==='Artists' && this.state.role.map((user,index)=>(
                                user.type==='Artist' && <li className="list-group-item" key={index} onClick={()=>this.selectArtist(user)}>
                                    {user.userName}
                                    <i className="fa fa-trash float-right fa-lg" onClick={()=>this.deleteArtist(user.id)}/>
                                </li>
                            ))}<br/>
                            {this.state.role.length>0 && this.state.selectedOption==='Artists' && <div className='row'>
                                <div className='col-8'>
                                    <input className="form-control" onChange={e=>this.setState({inputChange:e.target.value})}/>
                                    {this.state.validation && <span style={{color:'red'}}>Type Something</span>}
                                </div>
                                <div className="col-1">
                                    <span style={{color:'red'}}>*</span>

                                </div>
                                <div className='col-1'>
                                    <button className="btn btn-outline-dark" onClick={()=>this.createArtist()}>
                                        <i className='fa fa-plus'/>
                                    </button>
                                </div>
                            </div>}
                        </ul>

                        <ul className="list-group">
                            {this.state.role.length>0 && this.state.selectedOption==='Hosts' &&
                            <li className="list-group-item active">
                                Hosts
                            </li>}
                            {this.state.role.length>0 && this.state.selectedOption==='Hosts' && this.state.role.map((user,index)=>(
                                user.type==='Host' && <li className="list-group-item" onClick={()=>this.selectHost(user)} key={index}>
                                    {user.userName}
                                    <i className="fa fa-trash float-right fa-lg" onClick={()=>this.deleteHost(user.id)}/>
                                </li>
                            ))}<br/>
                            {this.state.role.length>0 && this.state.selectedOption==='Hosts' && <div className='row'>
                                <div className='col-8'>
                                    <input className="form-control" onChange={e=>this.setState({inputChange:e.target.value})}/>
                                    {this.state.validation && <span style={{color:'red'}}>Type Something</span>}
                                </div>
                                <div className="col-1">
                                    <span style={{color:'red'}}>*</span>

                                </div>
                                <div className='col-1'>
                                    <button className="btn btn-outline-dark" onClick={()=>this.createHost()}>
                                        <i className='fa fa-plus'/>
                                    </button>
                                </div>
                            </div>}
                        </ul>
                    </div>
                    <div className="col-9">
                        <div className="row">
                            <div className="col-5" style={{border:"1px solid black",padding:"1%",marginLeft:"1%"}} hidden={!this.state.selected}>
                                <div className="alert alert-success" role="alert" hidden={!this.state.updatemsg}>
                                    Profile Update Successfully!
                                </div>
                                <h4>Profile</h4>
                                <div>
                                    <b>Username</b><br/>
                                    {this.state.selectedUser.userName}
                                </div>
                                <br/>
                                <div>
                                    <b>First Name</b><br/>
                                    {this.state.selectedUser.firstName}
                                </div>
                                <br/>
                                <div>
                                    <b>Last Name</b><br/>
                                    {this.state.selectedUser.lastName}
                                </div>
                                <br/>
                                <div>
                                    <b>Email</b><br/>
                                    {this.state.selectedUser.email}
                                </div>
                                <br/>
                                <div>
                                    <b>Date of Birth</b><br/>
                                    {date}
                                </div>
                                <br/>
                                <div>
                                    <b>Phone</b><br/>
                                    {this.state.selectedUser.phone}
                                </div>
                                <br/>
                                <div>
                                    <ul className="list-group">
                                        <li className="list-group-item active">Playlists</li>
                                        {this.state.selectedUser!==''&&this.state.selectedUser.playlists.map((playlist,index) =>(
                                        <li className="list-group-item" key={index}>
                                            {playlist.playlistName}
                                        </li>))}
                                    </ul>
                                    <br/>
                                    {this.state.selectedUser.type==='Artist'&&<ul className="list-group">
                                        <li className="list-group-item active">Uploaded Songs</li>
                                        {this.state.selectedUser!==''&&this.state.selectedUser.songs.map((song,index) =>(
                                            <li className="list-group-item" key={index}>
                                                {song.songName}
                                            </li>))}
                                    </ul>}
                                    {this.state.selectedUser.type==='Host'&&<ul className="list-group">
                                        <li className="list-group-item active">Party</li>
                                        {this.state.selectedUser!==''&&this.state.selectedUser.parties.map((party,index) =>(
                                            <li className="list-group-item" key={index}>
                                                {party.partyname}
                                            </li>))}
                                    </ul>}
                                </div>
                                <br/>
                                <button className="btn btn-outline-dark btn-block" onClick={()=>this.setState({update:true})}>Edit Profile</button>
                                <br/>
                                {this.state.selectedUser.type==='User' &&
                                <button className="btn btn-outline-dark btn-block" onClick={()=>this.verify()}>Verfiy as Artist</button>}
                            </div>
                            <div className="col-5" style={{border:"1px solid black",padding:"1%",marginLeft:"1%"}} hidden={!this.state.update}>
                                <h4>Edit profile</h4>
                                <div>
                                    <b>Username</b><br/>
                                    <input className="form-control" defaultValue={this.state.selectedUser.userName}
                                           placeholder={this.state.selectedUser.userName} onChange={(e)=>newUser.userName=e.target.value}/>
                                </div>
                                <br/>
                                <div>
                                    <b>First Name</b><br/>
                                    <input className="form-control" defaultValue={this.state.selectedUser.firstName}
                                           placeholder={this.state.selectedUser.firstName}  onChange={(e)=>newUser.firstName=e.target.value}/>
                                </div>
                                <br/>
                                <div>
                                    <b>Last Name</b><br/>
                                    <input className="form-control" defaultValue={this.state.selectedUser.lastName}
                                           placeholder={this.state.selectedUser.lastName}  onChange={(e)=>newUser.lastName=e.target.value}/>
                                </div>
                                <br/>
                                <div>
                                    <b>Email</b><br/>
                                    <input className="form-control" defaultValue={this.state.selectedUser.email}
                                           placeholder={this.state.selectedUser.email} onChange={(e)=>newUser.email=e.target.value}/>
                                </div>
                                <br/>
                                <div>
                                    <b>Date of Birth</b><br/>
                                    <input className="form-control" defaultValue={this.state.selectedUser.dob} type="date"
                                           placeholder={this.state.selectedUser.dob}  onChange={(e)=>newUser.dob=e.target.value}/>
                                </div>
                                <br/>
                                <div>
                                    <b>Phone</b><br/>
                                    <input className="form-control" defaultValue={this.state.selectedUser.phone}
                                           placeholder={this.state.selectedUser.phone} onChange={(e)=>newUser.phone=e.target.value}/>
                                </div>
                                <br/>
                                <div>
                                    <ul className="list-group">
                                        <li className="list-group-item active">Playlists</li>
                                        {this.state.selectedUser!==''&&this.state.selectedUser.playlists.map((playlist,index) =>(
                                            <li className="list-group-item" key={index}>
                                                {playlist.playlistName} <i className="fa fa-trash float-right" onClick={()=>this.deletePlaylist(playlist.id)}/>
                                            </li>))}
                                    </ul>
                                    <br/>
                                    {this.state.selectedUser.type==='Artist'&&<ul className="list-group">
                                        <li className="list-group-item active">Uploaded Songs</li>
                                        {this.state.selectedUser!==''&&this.state.selectedUser.songs.map((song,index) =>(
                                            <li className="list-group-item" key={index}>
                                                {song.songName} <i className="fa fa-trash float-right" onClick={()=>this.deleteSong(song.id)}/>
                                            </li>))}
                                    </ul>}
                                    {this.state.selectedUser.type==='Host'&&<ul className="list-group">
                                        <li className="list-group-item active">Party</li>
                                        {this.state.selectedUser!==''&&this.state.selectedUser.parties.map((party,index) =>(
                                            <li className="list-group-item" key={index}>
                                                {party.partyname}
                                                <i className="fa fa-trash float-right" onClick={()=>this.deleteParty(party.id)}/>
                                            </li>))}
                                    </ul>}
                                </div>
                                <br/>
                                <button className="btn btn-outline-dark btn-block" onClick={()=>this.updateProfile(newUser)}>Update Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Admin;