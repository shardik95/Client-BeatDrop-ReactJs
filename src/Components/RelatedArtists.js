import React from 'react';
import Link from "react-router-dom/es/Link";
import SpotifyService from "../Services/SpotifyService";

class RelatedArtists extends  React.Component{

    constructor(props){
        super(props);
        this.state={
            accessToken:'',
            artistId:'',
            relatedArtist:''
        }
        this.spotifyService=SpotifyService.instance;
    }

    componentDidMount(){

        this.spotifyService.getAccessToken()
            .then(response=> (
             this.setState({accessToken: response.access_token})
            ))
            .then(()=>(
                this.spotifyService.getRelatedArtist(this.props.artistId,this.state.accessToken)
                .then((artists=>this.setState({relatedArtist:artists})))
            ))
    }

    componentWillReceiveProps(newProps){

        this.spotifyService.getAccessToken()
            .then(response=> (
                this.setState({accessToken: response.access_token})
            ))
            .then(()=>(
                this.spotifyService.getRelatedArtist(this.props.artistId,this.state.accessToken)
                    .then((artists=>this.setState({relatedArtist:artists})))
            ))
    }

    render(){
        return(
            <div>
                <table>
                    <tbody>
                        <tr>
                            {this.state.relatedArtist.artists!==undefined &&
                            this.state.relatedArtist.artists.map((artist,index)=>(index < 4 &&
                                <td  key={index}><img src={artist.images[2].url} width="85px" height="85px" alt="related artist"/><br/>
                                   <Link to={`/home/artist/${artist.id}`} key={index}> {artist.name}</Link>
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }


}

export default RelatedArtists