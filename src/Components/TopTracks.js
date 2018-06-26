import React from 'react';
import Link from "react-router-dom/es/Link";
import SpotifyService from "../Services/SpotifyService";

class TopTracks extends React.Component{

    constructor(props){
        super(props);
        this.state={
            accessToken:'',
            topTracks:'',
            artistId:''
        }
        this.spotifyService=SpotifyService.instance;
    }

    componentDidMount(){

        let accessToken=this.props.accessToken;
        let artistId1=this.props.artistId;
        this.setState({accessToken:accessToken,artistId:artistId1})

        this.spotifyService.getTopTracksForArtist(artistId1,this.state.accessToken)
           .then((tracks)=>this.setState({topTracks:tracks}))
    }

    componentWillReceiveProps(newProps){

        let accessToken=newProps.accessToken;
        let artistId1=newProps.artistId;
        this.setState({accessToken:accessToken,artistId:artistId1})

        this.spotifyService.getTopTracksForArtist(artistId1,this.state.accessToken)
            .then((tracks)=>this.setState({topTracks:tracks}))
    }

    render(){
        return(
            <div>
                {this.state.topTracks.tracks!==undefined && this.state.topTracks.tracks.map((track,index)=>(
                    index< 7 &&
                    <li className="list-group-item" key={index}>
                        <div className="row">
                            <div className="col-4">
                                <img src={track.album.images[0].url} width="40px" height="40px" style={{borderRadius:"20px"}} alt="top tracks"/>
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