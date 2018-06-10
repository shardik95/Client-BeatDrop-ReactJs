import React from 'react';

class SignUp extends React.Component{

    render(){
        return(
            <div style={{textAlign:'center'}}>
                <i className="fa fa-5x fa-music" ></i>
                <br/>
                <h3>BeatDrop</h3>
                <br/>
                <div style={{marginRight:"400px",marginLeft:"400px"}}>
                    <form className="form-control">

                        <label>First Name</label>
                        <input type="text" className="form-control"
                               placeholder="Enter First Name"/>
                        <label>Last Name</label>
                        <input type="text" className="form-control"
                               placeholder="Enter Last Name"/>
                        <label>Username</label>
                        <input type="text" className="form-control"
                               placeholder="Enter Username"/>
                        <label>Email address</label>
                        <input type="email" className="form-control"
                               placeholder="Enter email"/>
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Password"/>
                        <label>Confirm Password</label>
                        <input type="password" className="form-control" placeholder="Confirm Password"/>
                        <label>Date of Birth</label>
                        <input type="date" className="form-control"/>
                        <br/>
                        <button type="button" className="btn btn-primary">Sign Up</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default SignUp