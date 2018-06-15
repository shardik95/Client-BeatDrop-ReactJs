import React from 'react';
import Link from "react-router-dom/es/Link";

class Album extends React.Component{

    constructor(props){
        super(props);
        this.state={
            albumId:'',
            accessToken:'',
            album:''
        }
    }

    componentDidMount(){
        let albumId=this.props.match.params.albumId;
        this.setState({albumId:albumId})

        fetch("http://localhost:8080/api/accessToken")
            .then(response=>(
                response.json()
            )).then(response=> {
            return this.setState({accessToken: response.access_token})
        }).then(()=>fetch('https://api.spotify.com/v1/albums/'+albumId,{
            headers:{
                'Authorization':'Bearer '+this.state.accessToken
            }
        }))
            .then((response)=>response.json())
            .then((album)=>this.setState({album:album}))

    }

    componentWillReceiveProps(newProps){
        let albumId=newProps.match.params.albumId;
        this.setState({albumId:albumId})

        fetch("http://localhost:8080/api/accessToken")
            .then(response=>(
                response.json()
            )).then(response=> {
            return this.setState({accessToken: response.access_token})
        }).then(()=>fetch('https://api.spotify.com/v1/albums/'+albumId,{
            headers:{
                'Authorization':'Bearer '+this.state.accessToken
            }
        }))
            .then((response)=>response.json())
            .then((album)=>this.setState({album:album}))
    }

    render(){
        return(
            <div style={{marginTop:"5%"}}>
                <div style={{textAlign:'center'}}>
                    <h3>Album Details</h3>
                    {this.state.album.images!==undefined && <img src={this.state.album.images[0].url} width="300px" height="300px"/>}
                </div>
                <br/>
                <table className="table">
                    <tbody>
                    <tr>
                        <td><b>Album name:</b></td>
                        <td>{this.state.album.name}</td>
                    </tr>
                    <tr>
                        <td><b>Artists:</b></td>
                        <td>{this.state.album.artists!==undefined && this.state.album.artists.map((artist,index)=>(
                            <Link to={`/home/artist/${artist.id}`} key={index}>{artist.name}</Link>
                        ))}</td>
                    </tr>
                    <tr>
                        <td><b>Popularity:</b></td>
                        <td>{this.state.album.popularity}</td>
                    </tr>
                    <tr>
                        <td><b>Release date:</b></td>
                        <td>{this.state.album.release_date}</td>
                    </tr>
                    </tbody>
                </table>
                <ul className="list-group">
                    <li className="list-group-item active">
                        Tracks
                    </li>
                    {this.state.album.tracks!==undefined && this.state.album.tracks.items.map((track,index)=>(
                        <li className="list-group-item" key={index}>
                            <Link to={`/home/song/${track.id}`}>{track.name}</Link>
                        </li>
                    ))}
                </ul>

            </div>

        )
    }

}

export default Album;