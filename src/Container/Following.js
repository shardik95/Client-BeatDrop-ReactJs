import React from 'react';

class Following extends React.Component{

    render(){
        let following=['username 6','username 7','username 8','username 9','username 10']
        return(
            <div>
                <br/>
                <ul className="list-group" style={{width:"30%"}}>
                    <li className="list-group-item active">Following
                    </li>
                    {following.map(following=>(
                        <li className="list-group-item"><i className="fa fa-user"></i>&emsp;{following}
                            <button className="btn btn-primary float-right">Follow</button>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

}

export default Following;