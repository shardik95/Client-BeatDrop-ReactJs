import React from 'react';
import UserService from "../Services/UserService";
import Link from "react-router-dom/es/Link";

class Followers extends React.Component{

    constructor(props){
        super(props);
        this.state={
            userId:'',
            user:''
        }
        this.followUser=this.followUser.bind(this);
        this.unFollow=this.unFollow.bind(this);
        this.userService = UserService.instance;
    }

    componentDidMount(){
        let userId=this.props.match.params.userId;
        this.setState({userId:userId});
        fetch("http://localhost:8080/api/profile",{
            credentials: 'include',
        }).then((response)=>response.json())
            .then((json)=>(this.setState({user:json})))
    }

    componentWillReceiveProps(newProps){
        let userId=newProps.match.params.userId;
        this.setState({userId:userId});
        fetch("http://localhost:8080/api/profile",{
            credentials: 'include',
        }).then((response)=>response.json())
            .then((json)=>(this.setState({user:json})))
    }

    unFollow(followingId,myId){
        this.userService.unfollow(followingId,followingId)
            .then(()=>fetch("http://localhost:8080/api/profile",{
                    credentials: 'include',
                }).then(response=> (
                    response.json()
                )).then(json=> {
                    if (json.userName !== 'CANNOT FIND'){
                        this.setState({user:json,userId:json.id,showFollow:true})
                    }})
            )

    }


    followUser(profileId){
       //console.log(profileId)
        if(this.state.user!==''){
            this.userService.followUser(this.state.user,profileId)
                .then(()=>(
                    fetch("http://localhost:8080/api/profile",{
                        credentials: 'include',
                    }).then(response=> (
                        response.json()
                    )).then(json=> {
                        if (json.userName !== 'CANNOT FIND'){
                            this.setState({user:json,userId:json.id})
                        }
                    })

                ))
        }
        else{
            alert("please login")
        }
    }

    render(){
        let followers=this.state.user.followers;
        return(
            <div>
                <br/>
                <ul className="list-group" style={{width:"40%"}}>
                    <li className="list-group-item active bg-dark" style={{border:"0px"}}>Followers
                    </li>
                    {this.state.user!==''&&followers.map((follower,index)=> {
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
                            <Link to={`/user/${follower.myid}/profile`}>{follower.firstName}</Link>
                            <button className="btn btn-outline-dark float-right" hidden={follow} onClick={()=>this.followUser(follower.myid)}>Follow</button>
                            <button className="btn btn-outline-dark float-right" hidden={!follow} onClick={()=>this.unFollow(follower.id,follower.myId)}>UnFollow</button>
                        </li>
                    })}
                </ul>
            </div>

        )
    }

}

export default Followers;