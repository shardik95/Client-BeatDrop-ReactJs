import React from 'react';

class TopAlbums extends React.Component{

    constructor(props){
        super(props);
        this.state={
            accessToken:'',
            albums:'',
            artistId:''
        }
    }

    componentDidMount(){

        let accessToken=this.props.accessToken;
        let artistId1=this.props.artistId;
        this.setState({accessToken:accessToken,artistId:artistId1})

        return fetch('https://api.spotify.com/v1/artists/AID/albums'.replace('AID',artistId1),{
            headers:{
                'Authorization':'Bearer '+accessToken
            }
        }).then((response)=>response.json())
            .then((albums)=>this.setState({albums:albums}))
    }

    componentWillReceiveProps(newProps){
        let accessToken=newProps.accessToken;
        let artistId1=this.props.artistId;
        this.setState({accessToken:accessToken,artistId:artistId1})

        return fetch('https://api.spotify.com/v1/artists/AID/albums'.replace('AID',artistId1),{
            headers:{
                'Authorization':'Bearer '+accessToken
            }
        }).then((response)=>response.json())
            .then((albums)=>this.setState({albums:albums}))
    }

    render(){
        return(
            <div>
                {this.state.albums.items!==undefined && this.state.albums.items.map((item,index)=>(
                    index< 7 &&  <li key={index} className="list-group-item">{item.name}</li>
                ))}
            </div>
        )
    }
}

export default TopAlbums