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
    }

    componentDidMount(){

        this.userService.getSession()
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
                return this.userService.findUserById(follow.myId)
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
        this.userService.getSession()
            .then((json)=>(this.setState({user:json})))
    }

    render(){

        let sortedFeed  =this.state.feed.sort(function (a,b) {
            return new Date(b.date) - new Date(a.date)
        })
        return(
            <div>
                <br/>
                <div className="row" style={{marginLeft:"5px"}}>

                    {this.state.user.type==='Host'&& this.state.user.parties.map((party,index)=>(
                        <div key={index}>
                            <div className="card" style={{width:"600px",borderRadius:"20px"}} key={index}>
                                <div className="card-header bg-dark" style={{color:"#fff"}}>
                                <i className="fa fa-lg fa-user-circle"/>&nbsp;you
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-9">
                                        <p className="card-text">created party {party.partyname}.
                                            &nbsp;<Link to={`/user/profile/party`}>Click here to add songs</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                            <br/>
                        </div>
                        ))
                    }


                    {sortedFeed.map((feed,index)=>(
                        <div key={index}>
                            {feed.title==='Like' &&
                            <div className="card" style={{width:"600px",borderRadius:"20px"}} key={index}>
                                <div className="card-header bg-dark" style={{color:"#fff"}}>
                                    <i className="fa fa-lg fa-user-circle"/>&nbsp;{this.state.user.userName === feed.username && "you"}
                                    {this.state.user.userName !== feed.username && feed.username}
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-9">
                                            <p className="card-text">Liked {feed.type} <Link to={`/home/${feed.type}/${feed.typeId}`}>{feed.name}</Link> at {feed.date}</p>
                                        </div>
                                        <div className="col-3">
                                            <img src={feed.imgUrl} width="50px" height="50px" className="float-right" style={{borderRadius:"42px"}} alt="Likes"/>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                            {feed.title==='Review' &&
                            <div className="card" style={{width:"600px",borderRadius:"20px"}} key={index}>
                                <div className="card-header bg-dark" style={{color:"#fff"}}>
                                    <i className="fa fa-lg fa-user-circle"/>&nbsp;{this.state.user.userName === feed.username && "you"}
                                    {this.state.user.userName !== feed.username && feed.username}
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-9">
                                            <div className="card-text">Reviewed {feed.type} <Link to={`/home/${feed.type}/${feed.typeId}`}>{feed.name}</Link> with &nbsp;
                                                <StarRatings
                                                    rating={feed.stars}
                                                    starRatedColor="gold"
                                                    numberOfStars={5}
                                                    starDimension="14px"
                                                    starSpacing="1.5px"
                                                />&nbsp;
                                                at {feed.date}</div>
                                        </div>
                                        <div className="col-3">
                                            <img src={feed.imgUrl} width="50px" height="50px" className="float-right" style={{borderRadius:"42px"}} alt="Reviews"/>
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