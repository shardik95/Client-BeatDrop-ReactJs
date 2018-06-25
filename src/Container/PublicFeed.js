import React from 'react';
import UserService from "../Services/UserService";
import StarRatings from "react-star-ratings";
import Link from "react-router-dom/es/Link";


class PublicFeed extends React.Component{

    constructor(props){
        super(props);
        this.state={
            user:'',
            data:'',
            userId:'',
            feed:[]
        }
        this.userService=UserService.instance;
    }

    componentDidMount(){
        let userId = this.props.match.params.userId;
        this.setState({userId:userId})
        this.userService.findUserById(userId)
            .then(user=>this.setState({user:user}))
            .then(()=>this.setState({feed:this.state.user.likes}))
            .then(()=>this.setState({feed:this.state.feed.concat(this.state.user.reviews)}))
    }

    componentWillReceiveProps(newProps){
        let userId = newProps.match.params.userId;
        this.setState({userId:userId})
        this.userService.findUserById(userId)
            .then(user=>this.setState({user:user}))
            .then(()=>this.setState({feed:this.state.user.likes}))
            .then(()=>this.setState({feed:this.state.feed.concat(this.state.user.reviews)}))
    }

    render(){

        let sortedFeed =this.state.feed.sort(function (a,b) {
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
                                    <i className="fa fa-lg fa-user-circle"/>&nbsp;{this.state.user.userName}
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-9">
                                            <p className="card-text">created party {party.partyname}.
                                                &nbsp;<Link to={`/user/${this.state.profileUserId}/profile/party`}>Click here to add songs</Link>
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
                        <div>
                            {feed.title==='Like' &&
                            <div className="card" style={{width:"600px",borderRadius:"20px"}} key={index}>
                                <div className="card-header bg-dark" style={{color:"#fff"}}>
                                    <i className="fa fa-lg fa-user-circle"/>&nbsp;
                                    {this.state.user.userName}
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
                            <div className="card" style={{width:"600px",borderRadius:"20px"}} key={index}>
                                <div className="card-header bg-dark" style={{color:"#fff"}}>
                                    <i className="fa fa-lg fa-user-circle"/>&nbsp;
                                    {this.state.user.userName}
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

export default PublicFeed;