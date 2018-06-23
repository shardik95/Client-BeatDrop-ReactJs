import React from 'react';

class HomeFeed extends React.Component{

    constructor(props){
        super(props)
        this.state={
            artists:[]
        }
    }

    componentDidMount(){
        fetch("http://localhost:8080/api/artist")
            .then(response=>response.json())
            .then((artists)=>this.setState({artists:artists}))
    }

    componentWillReceiveProps(newProps){
        fetch("http://localhost:8080/api/artist")
            .then(response=>response.json())
            .then((artists)=>this.setState({artists:artists}))
    }

    render(){
        return (
            <div>
                {this.state.artists.length>0 && this.state.artists.map((artist,index)=>

                    artist.songs.map(song=>
                        <div className="card" style={{width:"600px",height:"130px"}} key={index}>
                            <div className="card-header">
                                Song
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-9">
                                        <p className="card-text">{artist.userName} uploaded {song.songName}</p>
                                    </div>
                                    <div className="col-3">
                                        <i className="fa fa-user-circle fa-2x float-right"/>
                                    </div>
                                </div>
                            </div>
                    </div>)

                )}
            </div>
        )
    }
}

export default HomeFeed;