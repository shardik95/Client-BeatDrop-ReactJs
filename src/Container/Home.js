import React from 'react';

class Home extends React.Component{

    constructor(props){
        super(props);
        this.state={
            accessToken:"",
            query:"",
            tracks:[]
        }
        this.searchTrack=this.searchTrack.bind(this);
        this.millisToMinutesAndSeconds=this.millisToMinutesAndSeconds.bind(this);
    }

    componentDidMount(){

        fetch("http://localhost:8080/api/accessToken")
            .then(response=>(
                response.json()
            )).then(response=>(
                this.setState({accessToken:response.access_token})
        ))

    }

    searchTrack(){

        fetch("https://api.spotify.com/v1/search?q=QUERY&type=track".replace("QUERY",this.state.query),{
            headers:{
                'Authorization':'Bearer '+this.state.accessToken
            }
        }).then(response=>(
            response.json()
        )).then(object=>(
            this.setState({tracks:object.tracks.items})
        ))
    }

     millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    render(){
        let searchElement;
        return(
            <div>
                <form className="form-control">
                    <input type="text" style={{marginRight:"20px"}} placeholder="Search tracks"
                          ref={node=>searchElement=node} onChange={()=>this.setState({query:searchElement.value})}/>
                    <button className="btn btn-dark" onClick={()=>this.searchTrack()} type="button">Search</button>
                </form>
                <br/>
                {this.state.tracks.length>0 &&
                    <table className="table">
                        <thead>
                        <tr>
                            <th>
                            </th>
                            <th>
                                Name
                            </th>
                            <th>
                                Artist
                            </th>
                            <th>
                                Duration
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                                {this.state.tracks.map((track,index) => (
                                    <tr key={index}>
                                        <td>
                                            <img src={track.album.images[0].url} height="60px" width="60px"/>
                                        </td>
                                        <td>
                                            {track.name}
                                        </td>
                                        <td>
                                            {track.artists.map(artist=>(
                                                artist.name
                                            ))}
                                        </td>
                                        <td>
                                            {this.millisToMinutesAndSeconds(track.duration_ms)}
                                        </td>
                                    </tr>
                                    ))}
                        </tbody>
                    </table>}


            </div>
        )
    }

}

export default Home;