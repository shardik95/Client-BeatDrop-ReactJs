import React from 'react';
import TopTracks from "../Components/TopTracks";
import TopAlbums from "../Components/TopAlbums";

class ArtistSpotify extends React.Component{

    constructor(props){
        super(props)

        this.state={
            artistId:'',
            artist:'',
            toptracks:'',
            albums:'',
            ttavail:false,
            accessToken:''
        }
        this.showTopTracks=this.showTopTracks.bind(this);
    }

    componentDidMount(){
        let artistId=this.props.match.params.artistId;
        this.setState({artistId:artistId})

        fetch("http://localhost:8080/api/accessToken")
            .then(response=>(
                response.json()
            )).then(response=> {
            return this.setState({accessToken: response.access_token})
        }).then(()=>fetch('https://api.spotify.com/v1/artists/'+this.state.artistId,{
            headers:{
                'Authorization':'Bearer '+this.state.accessToken
            }
        })) .then((response)=>response.json())
            .then((artist)=>this.setState({artist:artist}))

    }

    componentWillReceiveProps(newProps){
        let artistId=newProps.match.params.artistId;
        this.setState({artistId:artistId})

        fetch("http://localhost:8080/api/accessToken")
            .then(response=>(
                response.json()
            )).then(response=> {
            return this.setState({accessToken: response.access_token})
        }).then(()=>fetch('https://api.spotify.com/v1/artists/'+this.state.artistId,{
            headers:{
                'Authorization':'Bearer '+this.state.accessToken
            }
        }))
            .then((response)=>response.json())
            .then((artist)=>this.setState({artist:artist}))

    }

    showTopTracks(){

            this.setState({ttavail:true})
    }

    render(){

        return(
            <div style={{marginTop:"5%"}}>
                <div style={{textAlign:'center'}}>
                    <h3>Artist Details</h3>
                    {this.state.artist.images!==undefined && <img src={this.state.artist.images[0].url} width="300px" height="300px"/>}
                </div>
                <br/>
                <table className="table">
                    <tbody>
                    <tr>
                        <td><b>Artist name:</b></td>
                        <td>{this.state.artist.name}</td>
                    </tr>
                    <tr>
                        <td><b>Popularity:</b></td>
                        <td>{this.state.artist.popularity}</td>
                    </tr>
                    </tbody>
                </table>
                <div className="row">
                    <div className="col-6">
                        <ul className="list-group">
                            <li className="list-group-item active">
                               Top-Tracks
                            </li>
                            {this.state.accessToken.length>0 &&<TopTracks accessToken={this.state.accessToken} artistId={this.state.artistId}/>}
                        </ul>
                    </div>
                    <div className="col-6">
                        <ul className="list-group">
                            <li className="list-group-item active">
                                Albums
                            </li>
                            {this.state.accessToken.length>0 &&<TopAlbums accessToken={this.state.accessToken} artistId={this.state.artistId}/>}
                        </ul>
                    </div>
                </div>
            </div>
        )

    }

}

export default ArtistSpotify;