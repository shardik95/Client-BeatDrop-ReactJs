import React from 'react';

class Song extends React.Component{

    constructor(props){
        super(props);
        this.state={
            trackId:'',
            access_token:'',
            song:''
        }
        this.millisToMinutesAndSeconds=this.millisToMinutesAndSeconds.bind(this);
    }

    componentDidMount(){
        let trackId=this.props.match.params.trackId;
        this.setState({trackId:trackId})

        fetch("http://localhost:8080/api/accessToken")
            .then(response=>(
                response.json()
            )).then(response=> {
            return this.setState({accessToken: response.access_token})
        }).then(()=>fetch('https://api.spotify.com/v1/tracks/'+this.state.trackId,{
            headers:{
                'Authorization':'Bearer '+this.state.accessToken
            }
        }))
            .then((response)=>response.json())
            .then((song)=>this.setState({song:song}))

    }

    componentWillReceiveProps(newProps){
        let trackId=newProps.match.params.trackId;
        this.setState({trackId:trackId})

        fetch("http://localhost:8080/api/accessToken")
            .then(response=>(
                response.json()
            )).then(response=> {
            return this.setState({accessToken: response.access_token})
        }).then(()=>fetch('https://api.spotify.com/v1/tracks/'+this.state.trackId,{
            headers:{
                'Authorization':'Bearer '+this.state.accessToken
            }
        }))
            .then((response)=>response.json())
            .then((song)=>this.setState({song:song}))
    }

    millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    render(){
        return(
            <div style={{marginTop:"5%"}}>
                    <div style={{textAlign:'center'}}>
                        <h3>Song Details</h3>
                         {this.state.song.album!==undefined && <img src={this.state.song.album.images[0].url} width="300px" height="300px"/>}
                    </div>
                <br/>
                <table className="table">
                    <tbody>
                        <tr>
                            <td><b>Song name:</b></td>
                            <td>{this.state.song.name}</td>
                        </tr>
                        <tr>
                            <td><b>Artists:</b></td>
                            <td>{this.state.song.artists!==undefined && this.state.song.artists.map(artist=>(
                                artist.name
                            ))}</td>
                        </tr>
                        <tr>
                            <td><b>Album:</b></td>
                            <td>{this.state.song.album!==undefined && this.state.song.album.name}</td>
                        </tr>
                        <tr>
                            <td><b>Duration:</b></td>
                            <td>{this.millisToMinutesAndSeconds(this.state.song.duration_ms)}</td>
                        </tr>
                        <tr>
                            <td><b>Popularity:</b></td>
                            <td>{this.state.song.popularity}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Song