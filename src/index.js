import React from 'react';
import ReactDOM from 'react-dom';
import Home from "./Container/Home";
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Login from "./Container/Login";


ReactDOM.render(
    <Router>
        <div>
            <Route path='/'
                   component={Home}/>
            <Route path='/login'
                   component={Login}/>
        </div>
    </Router>,
    document.getElementById('root')
)