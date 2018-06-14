import React from 'react';
import * as image from '../assests/logo.jpg'
import Link from "react-router-dom/es/Link";

class LandingPage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            accessToken:''
        }
    }

    componentDidMount(){
        fetch("http://localhost:8080/api/accessToken")
            .then(response=>(
                response.json()
            )).then(response=> {
            this.setState({accessToken: response.access_token})
        })
    }

    componentWillReceiveProps(newProps){
        fetch("http://localhost:8080/api/accessToken")
            .then(response=>(
                response.json()
            )).then(response=> {
            this.setState({accessToken: response.access_token})
        })
    }

    render(){

        return(
            <div className="row">
                <div className="col-6">
                    <h1 style={{marginTop:"50%",marginLeft:"25%",color:"#363636"}}><i className="fa fa-lg fa-music" style={{color:'blue'}} /> BeatDrop</h1>
                </div>
                <div className="col-6" style={{background:"#363636",height:"100vh",textAlign:'center'}}>
                    <h1 style={{marginTop:"20%",color:"#fff"}}>Welcome!</h1>
                    <br/>
                    <h3 style={{color:"#fff"}}>What is BeatDrop?!</h3>
                    <br/>
                    <p style={{color:"#fff"}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    <br/>
                    <Link to="/home"><button className="btn btn-outline-light">Explore!</button></Link>
                </div>
            </div>
        )
    }

}

export default LandingPage;