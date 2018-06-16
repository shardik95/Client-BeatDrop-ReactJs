import React from 'react';

class FeaturedPlaylists extends React.Component{

    constructor(props){
        super(props);
        this.state={
            playlistId:''
        }
    }

    componentDidMount(){
        let playlistId=this.props.match.params.playlistId;
        this.setState({playlistId:playlistId})
    }

    componentWillReceiveProps(newProps){
        let playlistId=newProps.match.params.playlistId;
        this.setState({playlistId:playlistId})
    }

    render(){
        return(
            <h1>Featured Playlist {this.state.playlistId}</h1>
        )
    }
}

export default FeaturedPlaylists;