import React from 'react';

class RelatedArtists extends  React.Component{

    constructor(props){
        super(props);
        this.state={
            accessToken:'',
            artistId:'',
            relatedArtist:''
        }
    }

    componentDidMount(){
        let accessToken_=this.props.accessToken;
        let artistId_=this.props.artistId;
        this.setState({accessToken:accessToken_,artistId:artistId_})

        return fetch("https://api.spotify.com/v1/artists/AID/related-artists".replace("AID",artistId_),{
            headers:{
                'Authorization':'Bearer '+accessToken_
            }
        }).then(response=>response.json())
            .then((artists=>this.setState({relatedArtist:artists})))
    }

    componentWillReceiveProps(newProps){
        let accessToken_=newProps.accessToken;
        let artistId_=newProps.artistId;
        this.setState({accessToken:accessToken_,artistId:artistId_})

        return fetch("https://api.spotify.com/v1/artists/AID/related-artists".replace("AID",artistId_),{
            headers:{
                'Authorization':'Bearer '+accessToken_
            }
        }).then(response=>response.json())
            .then((artists=>this.setState({relatedArtist:artists})))
    }

    render(){
        return(
            <div>
                <table>
                    <tbody>
                        <tr>
                            {this.state.relatedArtist.artists!==undefined && this.state.relatedArtist.artists.map((artist,index)=>(
                               index < 5&& <td><img src={artist.images[2].url} key={index} width="85px" height="85px"/><br/>{artist.name}</td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }


}

export default RelatedArtists