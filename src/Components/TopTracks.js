import React from 'react';

class TopTracks extends React.Component{

    constructor(props){
        super(props);
        this.state={
            accessToken:'',
            topTracks:'',
            artistId:''
        }
    }

    componentDidMount(){

        let accessToken=this.props.accessToken;
        let artistId1=this.props.artistId;
        this.setState({accessToken:accessToken,artistId:artistId1})

        return fetch('https://api.spotify.com/v1/artists/AID/top-tracks?country=US'.replace('AID',artistId1),{
            headers:{
                'Authorization':'Bearer '+accessToken
            }
        }).then((response)=>response.json())
           .then((tracks)=>this.setState({topTracks:tracks}))
    }

    componentWillReceiveProps(newProps){
        let accessToken=newProps.accessToken;
        let artistId1=this.props.artistId;
        this.setState({accessToken:accessToken,artistId:artistId1})

        return fetch('https://api.spotify.com/v1/artists/AID/top-tracks?country=US'.replace('AID',artistId1),{
            headers:{
                'Authorization':'Bearer '+accessToken
            }
        }).then((response)=>response.json())
            .then((tracks)=>this.setState({topTracks:tracks}))
    }

    render(){
        return(
            <div>
                {this.state.topTracks.tracks!==undefined && this.state.topTracks.tracks.map((track,index)=>(
                    index< 7 && <li key={index} className="list-group-item">{track.name}</li>
                ))}
            </div>
        )
    }
}

export default TopTracks