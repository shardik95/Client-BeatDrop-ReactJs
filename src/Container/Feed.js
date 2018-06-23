import React from 'react';
import UserService from "../Services/UserService";
import StarRatings from "react-star-ratings";
import Link from "react-router-dom/es/Link";

class Feed extends React.Component{


    constructor(props){
        super(props);
        this.state={
            user:'',
            feed:[],
            data:''
        }
        this.userService=UserService.instance;
        this.timeSince=this.timeSince.bind(this);
        this.convertDate=this.convertDate.bind(this);
    }


    componentDidMount(){

        fetch("http://localhost:8080/api/profile",{
            credentials: 'include',
        }).then((response)=>response.json())
            .then((json)=>(this.setState({user:json})))
            .then(()=>(this.setState({feed:this.state.user.likes.map(like=>{
                    let newJson = {userId:this.state.user.id, username:this.state.user.userName}
                    return Object.assign(like,newJson)
                })})))
            .then(()=>(this.setState({feed:this.state.feed.concat(this.state.user.reviews.map(review=>{
                    let newJson = {userId:this.state.user.id, username:this.state.user.userName}
                    return Object.assign(review,newJson)
                }))})))
            .then(()=>this.state.user.following.map(follow=> {
                this.userService.findUserById(follow.myId)
                    .then(user=>{
                        this.setState({feed: this.state.feed.concat(user.reviews.map(review=>{
                            let newJson = {userId:follow.myId,username:follow.userName}
                            return Object.assign(review,newJson)
                            }))})
                        this.setState({feed: this.state.feed.concat(user.likes.map(like=>{
                                let newJson = {userId:follow.myId,username:follow.userName}
                                return Object.assign(like,newJson)
                            }))})
                    })
            }))
    }

    componentWillReceiveProps(newProps){

        fetch("http://localhost:8080/api/profile",{
            credentials: 'include',
        }).then((response)=>response.json())
            .then((json)=>(this.setState({user:json})))
    }

     timeSince(date) {

        var seconds = Math.floor((new Date() - date) / 1000);

        var interval = Math.floor(seconds / 31536000);

        if (interval > 1) {
            return interval + " years";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + " months";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + " days";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " hours";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    }


    convertDate(date){
        var dateStr=date; //returned from mysql timestamp/datetime field
        var a=dateStr.split("T");
        var d=a[0].split("-");
        var t=a[1].split(":");
        return new Date(d[0],(d[1]-1),d[2],t[0],t[1],t[2]);
    }

    render(){

        let sortedFeed  =this.state.feed.sort(function (a,b) {
            return new Date(b.date) - new Date(a.date)
        })
        return(
            <div>
                {/*{console.log(sortedFeed)}*/}
                <br/>
                <div className="row" style={{marginLeft:"5px"}}>

                    {sortedFeed.map((feed,index)=>(
                        <div>
                            {feed.title==='Like' &&
                            <div className="card" style={{width:"600px",height:"130px"}} key={index}>
                                <div className="card-header">
                                    <i className="fa fa-lg fa-user-circle"/>&nbsp;{this.state.user.userName === feed.username && "you"}
                                    {this.state.user.userName !== feed.username && feed.username}
                                    {feed.type === 'Artist' && <i className="fa fa-check-circle" style={{color:'#2C8AFF'}}/>}
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-9">
                                            <p className="card-text">Liked {feed.type} <Link to={`/home/${feed.type}/${feed.typeId}`}>{feed.name}</Link> at {feed.date}</p>
                                        </div>
                                        <div className="col-3">
                                            <img src={feed.imgUrl} width="50px" height="50px" className="float-right" style={{borderRadius:"42px"}}/>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                            {feed.title==='Review' &&
                            <div className="card" style={{width:"600px",height:"130px"}}>
                                <div className="card-header">
                                    <i className="fa fa-lg fa-user-circle"/>&nbsp;{this.state.user.userName === feed.username && "you"}
                                    {this.state.user.userName !== feed.username && feed.username}
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-9">
                                            <p className="card-text">Reviewed {feed.type} <Link to={`/home/${feed.type}/${feed.typeId}`}>{feed.name}</Link> with &nbsp;
                                                <StarRatings
                                                    rating={feed.stars}
                                                    starRatedColor="gold"
                                                    numberOfStars={5}
                                                    starDimension="14px"
                                                    starSpacing="1.5px"
                                                />&nbsp;
                                                at {feed.date}</p>
                                        </div>
                                        <div className="col-3">
                                            <img src={feed.imgUrl} width="50px" height="50px" className="float-right" style={{borderRadius:"42px"}}/>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                            <br/>
                        </div>
                    ))}

                </div>
            </div>
        )
    }

}

export default Feed;