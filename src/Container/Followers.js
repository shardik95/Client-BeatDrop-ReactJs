import React from 'react';

class Followers extends React.Component{

    constructor(props){
        super(props);
        this.state={
            userId:''
        }
    }

    componentDidMount(){
        let userId=this.props.match.params.userId
        this.setState({userId:userId})
    }

    componentWillReceiveProps(newProps){
        let userId=newProps.match.params.userId
        this.setState({userId:userId})
    }

    render(){
        let followers=['username 1','username 2','username 3','username 4','username 5']
        return(
            <div>
                <br/>
                <ul className="list-group" style={{width:"30%"}}>
                    <li className="list-group-item active">Followers
                    </li>
                    {followers.map((follower,index)=>(
                        <li className="list-group-item" key={index}><i className="fa fa-user"></i>&emsp;{follower}
                        <button className="btn btn-primary float-right">Follow</button>
                        </li>
                    ))}
                </ul>
                <h1>{this.state.userId}</h1>
            </div>

        )
    }

}

export default Followers;