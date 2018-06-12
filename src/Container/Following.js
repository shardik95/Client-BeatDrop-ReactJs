import React from 'react';

class Following extends React.Component{

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
        let following=['username 6','username 7','username 8','username 9','username 10']
        return(
            <div>
                <br/>
                <ul className="list-group" style={{width:"30%"}}>
                    <li className="list-group-item active">Following
                    </li>
                    {following.map((following,index)=>(
                        <li className="list-group-item" key={index}><i className="fa fa-user"></i>&emsp;{following}
                            <button className="btn btn-primary float-right">Follow</button>
                        </li>
                    ))}
                </ul>
                <h1>{this.state.userId}</h1>
            </div>
        )
    }

}

export default Following;