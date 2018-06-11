import React from 'react';

class Followers extends React.Component{


    render(){
        let followers=['username 1','username 2','username 3','username 4','username 5']
        return(
            <div>
                <br/>
                <ul className="list-group" style={{width:"30%"}}>
                    <li className="list-group-item active">Followers
                    </li>
                    {followers.map(follower=>(
                        <li className="list-group-item"><i className="fa fa-user"></i>&emsp;{follower}
                        <button className="btn btn-primary float-right">Follow</button>
                        </li>
                    ))}
                </ul>
            </div>

        )
    }

}

export default Followers;