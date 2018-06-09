import React from 'react';

class Login extends React.Component{

    render(){

        return(
            <div style={{textAlign:'center'}}>
                <i className="fa fa-5x fa-music" ></i>
                <br/>
                <h3>BeatDrop</h3>
                <br/>
                <div style={{marginRight:"400px",marginLeft:"400px"}}>
                    <form className="form-control">

                            <label>Email address</label>
                            <input type="email" className="form-control"
                                   placeholder="Enter email"/>
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Password"/>
                            <br/>
                            <input type="checkbox" className="form-check-input" />
                           <label className="form-check-label" >Remember me</label>
                            <br/>
                            <br/>
                        <button type="button" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        )
    }


}

export default Login;