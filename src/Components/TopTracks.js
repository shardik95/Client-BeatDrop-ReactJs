import React from 'react';
import Link from "react-router-dom/es/Link";

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
                    index< 7 &&
                    <li className="list-group-item">
                        <div className="row">
                            <div className="col-4">
                                <img src={track.album.images[0].url} width="40px" height="40px" style={{borderRadius:"20px"}}/>
                            </div>
                            <div className="col-8">
                                <Link to={`/home/song/${track.id}`}  key={index}>
                                {track.name}
                                </Link>
                            </div>
                        </div>
                    </li>


                ))}
            </div>
        )
    }
}

export default TopTracks