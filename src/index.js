import React from 'react';
import ReactDOM from 'react-dom';
import Home from "./Container/Home";
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Login from "./Container/Login";
import SignUp from "./Container/SignUp"
import UserPrivateProfile from "./Container/UserPrivateProfile";
import Playlist from "./Container/Playlist";
import LandingPage from "./Container/LandingPage";
import Song from "./Container/Song";
import ArtistSpotify from "./Container/ArtistSpotify";
import Album from "./Container/Album";
import FeaturedPlaylists from "./Components/FeaturedPlaylists";
import UserPublicProfile from "./Container/UserPublicProfile";

ReactDOM.render(
    <Router>

        <div style={{marginLeft:"1%",marginRight:"1%"}}>
            <div>
                <Route exact path="/" component={LandingPage}/>
                <Route path='/index'
                       component={LandingPage}/>
            </div>
            <div>
                <Route path='/user/profile'
                       component={UserPrivateProfile}/>
                <Route path='/user/:userId/profile'
                       component={UserPublicProfile}/>
            </div>
            <div className="row">
                <div className="col-7" style={{marginTop:"5%"}}>
                    <Route path='/home'
                           component={Home}/>
                </div>
                <div className="col-5" style={{marginTop:"5%"}}>
                    <Route path='/home/login'
                           component={Login}/>
                    <Route path='/home/signup'
                           component={SignUp}/>
                    <Route path='/home/playlist/:trackId'
                           component={Playlist}/>
                    <Route path='/home/song/:trackId'
                           component={Song}/>
                    <Route path='/home/artist/:artistId'
                           component={ArtistSpotify}/>
                    <Route path='/home/album/:albumId'
                           component={Album}/>
                    <Route path='/home/featured-playlist/:playlistId'
                           component={FeaturedPlaylists}/>
                </div>
            </div>
        </div>
    </Router>,
    document.getElementById('root')
)