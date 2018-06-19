import React from 'react';
import UserService from "../Services/UserService";

class Account extends React.Component{

    constructor(props){
        super(props);
        this.state={
            user:'',
            update:false,
            updatemsg:false
        }
        this.updateProfile=this.updateProfile.bind(this);
        this.userService = UserService.instance;
    }

    componentDidMount(){
        fetch("http://localhost:8080/api/profile",{
            credentials: 'include',
        }).then((response)=>response.json())
            .then((json)=>(this.setState({user:json})))
    }

    componentWillReceiveProps(newProps){
        fetch("http://localhost:8080/api/profile",{
            credentials: 'include',
        }).then((response)=>response.json())
            .then((json)=>(this.setState({user:json})))
    }

    updateProfile(newUser){
        this.userService.updateUser(newUser)
            .then(()=>{
                this.setState({updatemsg:true})
                return fetch("http://localhost:8080/api/profile",{
                    credentials: 'include',
                })
            })
            .then((response)=>response.json())
            .then((json)=>(this.setState({user:json})))
    }

    render(){

        let newUser=this.state.user
        let date=''+this.state.user.dob;
        let n = date.indexOf('T');
        date=date.substring(0,10)

        return(
            <div style={{marginTop:"3%"}}>
                <h3>Account Overview</h3>
                <hr/>
                <div className="alert alert-success" role="alert" hidden={!this.state.updatemsg}>
                    Profile Update Successfully!
                </div>
                <div className="row">
                    <div className="col-5" style={{border:"1px solid black",padding:"1%",marginLeft:"1%"}}>
                        <h4>Profile</h4>
                        <div>
                            <b>Username</b><br/>
                            {this.state.user.userName}
                        </div>
                        <br/>
                        <div>
                            <b>First Name</b><br/>
                            {this.state.user.firstName}
                        </div>
                        <br/>
                        <div>
                            <b>Last Name</b><br/>
                            {this.state.user.lastName}
                        </div>
                        <br/>
                        <div>
                            <b>Email</b><br/>
                            {this.state.user.email}
                        </div>
                        <br/>
                        <div>
                            <b>Date of Birth</b><br/>
                            {date}
                        </div>
                        <br/>
                        <div>
                            <b>Phone</b><br/>
                            {this.state.user.phone}
                        </div>
                        <br/>
                        <button className="btn btn-outline-dark btn-block" onClick={()=>this.setState({update:true})}>Edit Profile</button>
                    </div>
                    <div className="col-5" style={{border:"1px solid black",padding:"1%",marginLeft:"1%"}} hidden={!this.state.update}>
                        <h4>Edit your profile</h4>
                        <div>
                            <b>Username</b><br/>
                            <input className="form-control" defaultValue={this.state.user.userName}
                                   placeholder={this.state.user.userName} onChange={(e)=>newUser.userName=e.target.value}/>
                        </div>
                        <br/>
                        <div>
                            <b>First Name</b><br/>
                            <input className="form-control" defaultValue={this.state.user.firstName}
                                   placeholder={this.state.user.firstName}  onChange={(e)=>newUser.firstName=e.target.value}/>
                        </div>
                        <br/>
                        <div>
                            <b>Last Name</b><br/>
                            <input className="form-control" defaultValue={this.state.user.lastName}
                                   placeholder={this.state.user.lastName}  onChange={(e)=>newUser.lastName=e.target.value}/>
                        </div>
                        <br/>
                        <div>
                            <b>Email</b><br/>
                            <input className="form-control" defaultValue={this.state.user.email}
                                   placeholder={this.state.user.email} onChange={(e)=>newUser.email=e.target.value}/>
                        </div>
                        <br/>
                        <div>
                            <b>Date of Birth</b><br/>
                            <input className="form-control" defaultValue={this.state.user.dob} type="date"
                                   placeholder={this.state.user.dob}  onChange={(e)=>newUser.dob=e.target.value}/>
                        </div>
                        <br/>
                        <div>
                            <b>Phone</b><br/>
                            <input className="form-control" defaultValue={this.state.user.phone}
                                   placeholder={this.state.user.phone} onChange={(e)=>newUser.phone=e.target.value}/>
                        </div>
                        <br/>
                        <button className="btn btn-outline-dark btn-block" onClick={()=>this.updateProfile(newUser)}>Update Profile</button>
                    </div>
                </div>
            </div>
        )
    }

}

export default Account;