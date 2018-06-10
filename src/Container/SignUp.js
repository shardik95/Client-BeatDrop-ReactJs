import React from 'react';
import UserService from "../Services/UserService";


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
            userName:''
        }
        this.createUser=this.createUser.bind(this);
        this.userService=UserService.instance;
    }

    createUser(){

        if(this.state.password===this.state.confirmPassword && this.state.password!==''){
            let newUser={
                firstName:this.state.firstName,
                lastName:this.state.lastName,
                email:this.state.email,
                password:this.state.password,
                phone:this.state.phone,
                dob:this.state.dob,
                userName:this.state.userName
            }

            this.userService.createUser(newUser)
                .then(response=>(
                    <div>
                        {alert("user created")}
                        {this.props.history.push("/")}
                    </div>
                ))

        }
        else{
            this.setState({passwordVerify:!this.state.passwordVerify})
        }

    }

    render(){
        return(
            <div>
                <div style={{textAlign:'center'}}>
                    <i className="fa fa-5x fa-music" ></i>
                    <br/>
                    <h3>BeatDrop</h3>
                </div>
                <br/>
                <div style={{marginRight:"400px",marginLeft:"400px"}}>

                    <div className="alert alert-danger" role="alert" hidden={this.state.passwordVerify}>
                        Passwords do no match !
                    </div>

                    <form className="form-control">

                        <div>
                            <label>First Name</label>
                            <input type="text" className="form-control"
                                   placeholder="Enter First Name" onChange={(event)=>this.setState({firstName:event.target.value})}/>
                        </div>
                        <div>
                            <label>Last Name</label>
                            <input type="text" className="form-control"
                                   placeholder="Enter Last Name" onChange={(event)=>this.setState({lastName:event.target.value})}/>
                        </div>
                        <div>
                            <label>Username</label>
                            <input type="text" className="form-control"
                                   placeholder="Enter Username" onChange={(event)=>this.setState({userName:event.target.value})}/>
                        </div>
                        <div>
                            <label>Email address</label>
                            <input type="email" className="form-control"
                                   placeholder="Enter email" onChange={(event)=>this.setState({email:event.target.value})}/>
                        </div>
                        <div>
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Password"
                                   onChange={(event)=>this.setState({password:event.target.value})}/>
                        </div>
                        <div>
                            <label>Confirm Password</label>
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
                        <br/>

                        <button type="button" className="btn btn-primary" onClick={()=>this.createUser()}>Sign Up</button>
                    </form>
                    <br/>
                    <br/>
                </div>
            </div>
        )
    }
}

export default SignUp