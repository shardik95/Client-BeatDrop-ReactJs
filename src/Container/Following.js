import React from 'react';
import UserService from "../Services/UserService";
import Link from "react-router-dom/es/Link";

class Following extends React.Component{

    constructor(props){
        super(props);
        this.state={
            userId:'',
            user:''
        }
        this.unFollow=this.unFollow.bind(this);
        this.userService=UserService.instance;
    }

    componentDidMount(){
        let userId=this.props.match.params.userId
        this.setState({userId:userId})
        fetch("http://localhost:8080/api/profile",{
            credentials: 'include',
        }).then((response)=>response.json())
            .then((json)=>(this.setState({user:json})))
    }

    componentWillReceiveProps(newProps){
        let userId=newProps.match.params.userId
        this.setState({userId:userId})
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

    render(){
        let following=this.state.user.following;
        return(
            <div>
                <br/>
                <ul className="list-group" style={{width:"40%"}}>
                    <li className="list-group-item active bg-dark" style={{border:"0px"}}>Following
                    </li>
                    {this.state.user!==''&&following.map((following,index)=>(
                        <li className="list-group-item" key={index}><i className="fa fa-user"/>&emsp;
                            <Link to={`/user/${following.myId}/profile`}>{following.firstName}</Link>
                            {following.type === 'Artist' && <i className="fa fa-check-circle" style={{color:'#2C8AFF'}}/>}
                            <button className="btn btn-outline-dark float-right" onClick={()=>this.unFollow(following.id,following.myId)}>Unfollow</button>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

}

export default Following;