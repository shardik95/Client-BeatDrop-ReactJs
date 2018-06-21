import React from 'react';
import UserService from "../Services/UserService";
import FollowingService from "../Services/FollowingService";


class PublicFollowers extends React.Component{

    constructor(props){
        super(props);
        this.state={
            profileUserId:'',
            user:'',
            profileUser:''
        }
        this.followUser=this.followUser.bind(this);
        this.unFollow=this.unFollow.bind(this);
        this.userService = UserService.instance;
        this.followingService=FollowingService.instance;
    }

    componentDidMount(){
        let profileUserId=this.props.match.params.userId;
        this.setState({profileUserId:profileUserId});
        fetch("http://localhost:8080/api/profile",{
            credentials: 'include',
        }).then((response)=>response.json())
            .then((json)=>(this.setState({user:json})))
        this.userService.findUserById(profileUserId)
            .then(user=>this.setState({profileUser:user}))
    }

    componentWillReceiveProps(newProps){
        let profileUserId=newProps.match.params.userId;
        this.setState({profileUserId:profileUserId});
        fetch("http://localhost:8080/api/profile",{
            credentials: 'include',
        }).then((response)=>response.json())
            .then((json)=>(this.setState({user:json})))
        this.userService.findUserById(profileUserId)
            .then(user=>this.setState({profileUser:user}))
    }

    unFollow(followingUserName,myId){
        this.followingService.findFollowingRecord(followingUserName,this.state.user.userName)
            .then((response)=>this.userService.unfollow(response.id,response.id)
                .then(()=>fetch("http://localhost:8080/api/profile",{
                        credentials: 'include',
                    }).then(response=> (
                        response.json()
                    )).then(json=> {
                        if (json.userName !== 'CANNOT FIND'){
                            this.setState({user:json,showFollow:true})
                        }})
                ));


    }


    followUser(Id){
        if(this.state.user!==''){
            this.userService.followUser(this.state.user,Id)
                .then(()=>(
                    fetch("http://localhost:8080/api/profile",{
                        credentials: 'include',
                    }).then(response=> (
                        response.json()
                    )).then(json=> {
                        if (json.userName !== 'CANNOT FIND'){
                            this.setState({user:json})
                        }
                    })

                ))
        }
        else{
            alert("please login")
        }
    }


    render(){
        let followers=this.state.profileUser.followers;
        return(
            <div>
                <br/>
                <ul className="list-group" style={{width:"40%"}}>
                    <li className="list-group-item active">Followers
                    </li>
                    {this.state.profileUser!==''&&followers.map((follower,index)=> {
                        if(follower.userName!==this.state.user.userName){
                            let follow=false;
                            if(this.state.user!==''){
                                for(var i =0;i<this.state.user.following.length;i++){
                                    if(this.state.user.following[i].userName === follower.userName){
                                        follow=true;
                                        break;
                                    }
                                }
                            }
                            return <li className="list-group-item" key={index}>
                                <i className="fa fa-user"/>&emsp;
                                {follower.firstName}
                                <button className="btn btn-primary float-right" hidden={follow} onClick={()=>this.followUser(follower.myid)}>Follow</button>
                                <button className="btn btn-primary float-right" hidden={!follow} onClick={()=>this.unFollow(follower.userName,follower.myId)}>UnFollow</button>
                            </li>
                        }})
                    }
                </ul>
            </div>

        )
    }
}

export default PublicFollowers;