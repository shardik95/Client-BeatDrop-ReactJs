import React from 'react';

class UserPublicProfile extends React.Component{

    constructor(props){
        super(props)
    }

    render(){
        return(
            <h1>Public profile of User {this.props.match.params.userId}</h1>
        )
    }
}

export default UserPublicProfile;