import React from 'react';
import UserService from "../Services/UserService";
import Link from "react-router-dom/es/Link";

class Followers extends React.Component{

    constructor(props){
        super(props);
        this.state={
            userId:'',
            user:'',
            follow:''
        }
        this.followUser=this.followUser.bind(this);
        this.unFollow=this.unFollow.bind(this);
        this.userService = UserService.instance;
    }

    componentDidMount(){
        let userId=this.props.match.params.userId;
        this.setState({userId:userId});
        this.userService.getSession()
            .then((json)=>(this.setState({user:json})))
    }

    componentWillReceiveProps(newProps){
        let userId=newProps.match.params.userId;
        this.setState({userId:userId});
        this.userService.getSession()
            .then((json)=>(this.setState({user:json})))
    }

    unFollow(followingId,myId){

         let followerId=0;
         this.userService.findUserById(myId)
            .then(user=>user.followers.map(follow=>{
           if(follow.userName==this.state.user.userName){
                followerId=follow.id
           }
        })).then(()=>this.userService.unfollow(followerId,followerId)
             .then(()=>this.userService.getSession().then(json=> {
                     if (json.userName !== 'CANNOT FIND'){
                         this.setState({user:json,userId:json.id,follow:true})
                     }})
             )
         )


    }

    followUser(profileId){
        if(this.state.user!==''){
            this.userService.followUser(this.state.user,profileId)
                .then(()=>(
                    this.userService.getSession().then(json=> {
                        if (json.userName !== 'CANNOT FIND'){
                            this.setState({user:json,userId:json.id,follow:false})
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
                        return <li className="list-group-item" key={index} style={{background: 'linear-gradient(#fff2f2, white)'}}>
                            <i className="fa fa-user"/>&emsp;
                            <Link to={`/user/${follower.myid}/profile`}>{follower.firstName}</Link>
                                {this.state.user.type==='User' &&
                                <button className="btn btn-outline-dark float-right" hidden={follow} onClick={()=>this.followUser(follower.myid)}>Follow</button>}
                                {this.state.user.type==='User'&&
                                <button className="btn btn-outline-dark float-right" hidden={!follow} onClick={()=>this.unFollow(follower.id,follower.myid)}>UnFollow</button>}
                        </li>
                    })}
                </ul>
            </div>

        )
    }

}

export default Followers;