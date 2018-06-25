import React from 'react';
import UserService from "../Services/UserService";
import HostService from "../Services/HostService";


class SignUp extends React.Component{

    constructor(props){
        super(props);
        this.state={
            firstName:'',
            lastName:'',
            email:'',
            password:'',
            phone:'',
            dob:'',
            confirmPassword:'',
            passwordVerify:true,
            userName:'',
            firstnamereq:false,
            lastNameReq:false,
            emailReq:false,
            passwordReq:false,
            userNameReq:false,
            role:'',
            rolereq:false
        }
        this.createUser=this.createUser.bind(this);
        this.userService=UserService.instance;
        this.hostService=HostService.instance;
    }

    createUser(){

        if(this.state.firstName===''){
            this.setState({firstnamereq:true})
        }
        else{
            this.setState({firstnamereq:false})
        }

        if(this.state.lastName===''){
            this.setState({lastNameReq:true})
        }
        else{
            this.setState({lastNameReq:false})
        }

        if(this.state.email.match(/[a-zA-Z0-9]+@[a-zA-Z0-9]+.(com|co.in|edu)/)==null){
            this.setState({emailReq:true})
        }
        else{
            this.setState({emailReq:false})
        }

        if(this.state.password===''){
            this.setState({passwordReq:true})
        }
        else{
            this.setState({passwordReq:false})
        }

        if(this.state.userName===''){
            this.setState({userNameReq:true})
        }
        else{
            this.setState({userNameReq:false})
        }

        if(this.state.role===''){
            this.setState({rolereq:true})
        }
        else{
            this.setState({rolereq:false})
        }


        if (this.state.firstName!=='' &&
            this.state.lastName!=='' &&
            this.state.email.match(/[a-zA-Z0-9]+@[a-zA-Z0-9]+.(com|co.in|edu)/)!=null &&
            this.state.userName!=='' &&
            this.state.password!=='' && this.state.role!=='') {

            if (this.state.password === this.state.confirmPassword && this.state.password !== '') {
                let newUser = {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    email: this.state.email,
                    password: this.state.password,
                    phone: this.state.phone,
                    dob: this.state.dob,
                    userName: this.state.userName,
                    type:this.state.role
                }

                if(this.state.role==='User'){
                    this.userService.createUser(newUser)
                        .then(response => (
                            <div>
                                {alert("user created")}
                                {this.props.history.push("/home")}
                            </div>
                        ))
                    this.setState({firstnamereq:false})
                }
                else{
                    this.hostService.createHost(newUser)
                        .then(response => (
                            <div>
                                {this.props.history.push("/home")}
                            </div>
                        ))
                    this.setState({firstnamereq:false})
                }

            }
            else {
                this.setState({passwordVerify: !this.state.passwordVerify})
                this.setState({firstnamereq:false,lastNameReq:false,
                    emailReq:false,
                    passwordReq:false,
                    userNameReq:false})
            }
        }

    }

    render(){
        return(
            <div>
                <div style={{textAlign:'center'}}>
                    <i className="fa fa-5x fa-music"style={{color:'#2C8AFF'}} />
                    <br/>
                    <h3>BeatDrop</h3>
                </div>
                <br/>
                <div style={{marginRight:"10%",marginLeft:"10%"}}>

                    <div className="alert alert-danger" role="alert" hidden={this.state.passwordVerify}>
                        Passwords do no match !
                    </div>

                    <form className="form-control">

                        <div>
                            <label>First Name <span style={{color:'red'}}>*</span></label>
                            <input type="text" className="form-control"
                                   placeholder="Enter First Name" onChange={(event)=>this.setState({firstName:event.target.value})}/>
                            <span style={{color:'red',display:this.state.firstnamereq===false? 'none':'block'}}>First name is required</span>
                        </div>
                        <div>
                            <label>Last Name <span style={{color:'red'}}>*</span></label>
                            <input type="text" className="form-control"
                                   placeholder="Enter Last Name" onChange={(event)=>this.setState({lastName:event.target.value})}/>
                            <span style={{color:'red',display:this.state.lastNameReq===false? 'none':'block'}}>Last name is required</span>
                        </div>
                        <div>
                            <label>Username <span style={{color:'red'}}>*</span></label>
                            <input type="text" className="form-control"
                                   placeholder="Enter Username" onChange={(event)=>this.setState({userName:event.target.value})}/>
                            <span style={{color:'red',display:this.state.userNameReq===false? 'none':'block'}}>Username is required</span>
                        </div>
                        <div>
                            <label>Email address <span style={{color:'red'}}>*</span></label>
                            <input type="email" className="form-control"
                                   placeholder="Enter email" onChange={(event)=>this.setState({email:event.target.value})}/>
                            <span style={{color:'red',display:this.state.emailReq===false? 'none':'block'}}>Email invalid</span>
                        </div>
                        <div>
                            <label>Password <span style={{color:'red'}}>*</span></label>
                            <input type="password" className="form-control" placeholder="Password"
                                   onChange={(event)=>this.setState({password:event.target.value})}/>
                            <span style={{color:'red',display:this.state.passwordReq===false? 'none':'block'}}>Password is required</span>
                        </div>
                        <div>
                            <label>Confirm Password <span style={{color:'red'}}>*</span></label>
                            <input type="password" className="form-control" placeholder="Confirm Password"
                                   onChange={(event)=>this.setState({confirmPassword:event.target.value})}/>
                        </div>
                        <div>
                            <label>Phone no</label>
                            <input type="text" className="form-control"
                                   placeholder="Enter Phone no" onChange={(event)=>this.setState({phone:event.target.value})}/>
                        </div>
                        <div>
                            <label>Date of Birth</label>
                            <input type="date" className="form-control"
                                   onChange={(event)=>this.setState({dob:event.target.value})}/>
                        </div>
                        <div>
                            <label>Select your role <span style={{color:'red'}}>*</span></label>
                            <select className="form-control" onChange={e=>this.setState({role:e.target.value})}>
                                <option>Select</option>
                                <option>User</option>
                                <option>Host</option>
                            </select>
                            <span style={{color:'red',display:this.state.rolereq===false? 'none':'block'}}>Role is required</span>
                        </div>
                        <br/>
                        <button type="button" className="btn btn-outline-dark" onClick={()=>this.createUser()}>Sign Up</button>
                        <br/>
                        <i><span style={{color:'red'}}> *</span> marked fields are required</i>
                    </form>
                    <br/>
                    <br/>
                </div>
            </div>
        )
    }
}

export default SignUp