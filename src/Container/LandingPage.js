import React from 'react';
import Link from "react-router-dom/es/Link";
import SpotifyService from "../Services/SpotifyService";

class LandingPage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            accessToken:''
        }
        this.spotifyService=SpotifyService.instance;
    }

    componentDidMount(){
        this.spotifyService.getAccessToken().then(response=> {
            this.setState({accessToken: response.access_token})
        })
    }

    componentWillReceiveProps(newProps){
        this.spotifyService.getAccessToken().then(response=> {
            this.setState({accessToken: response.access_token})
        })
    }

    render(){

        return(
            <div className="row">
                <div className="col-6">
                    <h1 style={{marginTop:"50%",marginLeft:"25%",color:"#363636"}}><i className="fa fa-lg fa-music" style={{color:'#2C8AFF'}} /> BeatDrop</h1>
                </div>
                <div className="col-6" style={{background:"#363636",height:"100vh",textAlign:'center'}}>
                    <h1 style={{marginTop:"20%",color:"#fff"}}>Welcome!</h1>
                    <br/>
                    <h3 style={{color:"#fff"}}>What is BeatDrop?!</h3>
                    <br/>
                    <p style={{color:"#fff",background:"#363636"}}>
                        <span style={{color:'#2C8AFF'}}>BeatDrop is a Social media for music.</span>
                        <br/><br/>
                        <ul className="list-group" >
                            <li className="list-group-item" style={{background:"#363636",border:"0px"}}>
                                <i className="fa fa-music" style={{color:'#2C8AFF'}}/>&nbsp;Be a host to create a party, let users share their playlist with you such that you can 'Merge' them in single playlist so every one gets common taste of music, you can create events, sell tickets and earn money. </li>
                            <li className="list-group-item" style={{background:"#363636",border:"0px"}}>
                                <i className="fa fa-music" style={{color:'#2C8AFF'}}/>&nbsp;Become an Artist and upload your own songs. </li>
                            <li className="list-group-item" style={{background:"#363636",border:"0px"}}>
                                <i className="fa fa-music" style={{color:'#2C8AFF'}}/>&nbsp;Be a normal user and create your playlists, share it with the host of the party, follow your friends, artists and view everything in one place 'Feed'.</li>
                        </ul>
                    </p>
                    <br/>
                    <Link to="/home"><button className="btn btn-outline-light">Explore!</button></Link>
                </div>
            </div>
        )
    }

}

export default LandingPage;