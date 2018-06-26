import React from 'react';
import Link from "react-router-dom/es/Link";
import SpotifyService from "../Services/SpotifyService";

class TopAlbums extends React.Component{

    constructor(props){
        super(props);
        this.state={
            accessToken:'',
            albums:'',
            artistId:''
        }
        this.spotifyService=SpotifyService.instance;
    }

    componentDidMount(){

        let accessToken=this.props.accessToken;
        let artistId1=this.props.artistId;
        this.setState({accessToken:accessToken,artistId:artistId1})
        this.spotifyService.getAlbumsForArtist(artistId1,this.state.accessToken)
            .then((albums)=>this.setState({albums:albums}))
    }

    componentWillReceiveProps(newProps){

        let accessToken=newProps.accessToken;
        let artistId1=newProps.artistId;
        this.setState({accessToken:accessToken,artistId:artistId1})
        this.spotifyService.getAlbumsForArtist(artistId1,this.state.accessToken)
            .then((albums)=>this.setState({albums:albums}))
    }

    render(){
        return(
            <div>
                {this.state.albums.items!==undefined && this.state.albums.items.map((item,index)=>(
                    index< 7 &&
                    <li className="list-group-item" key={index}>
                        <div className="row">
                            <div className="col-4">
                                <img src={item.images[0].url} width="40px" height="40px" style={{borderRadius:"20px"}} alt="top albums"/>
                            </div>
                            <div className="col-8">
                                <Link to={`/home/album/${item.id}`}  key={index}>
                                    {item.name}
                                </Link>
                            </div>
                        </div>
                    </li>

                ))}
            </div>
        )
    }
}

export default TopAlbums