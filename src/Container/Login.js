import React from 'react';
import UserService from "../Services/UserService";

class Login extends React.Component{

    constructor(props){
        super(props);
        this.state={
            userName:'',
            password:'',
            wrongLogin:true
        }
        this.loginUser=this.loginUser.bind(this);
        this.userService=UserService.instance;
    }

    loginUser(){

        let user={
            userName:this.state.userName,
            password:this.state.password
        }

        this.userService.loginUser(user)
            .then(response=> {
                return response.json()
            })
            .then(json=> {
                if (json.userName === 'CANNOT FIND')
                    alert("Username / Password incorrect")
                else {
                    alert("User Logged In")
                    this.props.history.push("/home")
                }
            })

    }

    render(){


        return(
            <div style={{textAlign:'center'}}>
                <i className="fa fa-5x fa-music" ></i>
                <br/>
                <h3>BeatDrop</h3>
                <br/>
                <div style={{marginRight:"10%",marginLeft:"10%"}}>

                    <div className="alert alert-danger" role="alert" hidden={this.state.wrongLogin}>
                       Email / Password incorrect
                    </div>

                    <form className="form-control">

                            <label>Username/Email</label>
                            <input type="text" className="form-control"
                                   placeholder="Enter Username / Email" onChange={(e)=>this.setState({userName:e.target.value})}/>
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Password"
                                   onChange={(e)=>this.setState({password:e.target.value})}/>
                            <br/>
                            <input type="checkbox" className="form-check-input" />
                           <label className="form-check-label">Remember me</label>
                            <br/>
                            <br/>
                        <button type="button" className="btn btn-primary" onClick={()=>this.loginUser()}>Login</button>
                    </form>
                </div>
            </div>
        )
    }


}

export default Login;