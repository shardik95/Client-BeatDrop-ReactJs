import React from 'react';
import ReactDOM from 'react-dom';
import Home from "./Container/Home";
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Login from "./Container/Login";
import SignUp from "./Container/SignUp"
import UserPublicProfile from "./Container/UserPublicProfile";
import Redirect from "react-router-dom/es/Redirect";

ReactDOM.render(
    <Router>
        <div>
            <div>
                <Route path='/user/profile'
                       component={UserPublicProfile}/>

            </div>
            <div className="row">
                <div className="col-8" style={{marginTop:"5%"}}>
                    <Route path='/home'
                           component={Home}/>
                </div>
                <div className="col-4" style={{marginTop:"5%"}}>
                    <Route path='/home/login'
                           component={Login}/>
                    <Route path='/home/signup'
                           component={SignUp}/>
                </div>
            </div>
        </div>
    </Router>,
    document.getElementById('root')
)