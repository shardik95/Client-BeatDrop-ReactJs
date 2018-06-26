import React from 'react';
import {Link} from 'react-router-dom';
import UserService from "../Services/UserService";
import SpotifyService from "../Services/SpotifyService";

class Home extends React.Component{

    constructor(props){
        super(props);
        this.state={
            accessToken:"",
            query:"",
            tracks:[],
            artists:[],
            albums:[],
            TrackIndex:3,
            TrackButton:'See All',
            albumIndex:3,
            albumButton:'See All',
            artistIndex:3,
            artistButton:'See All',
            isSearchEmpty:true,
            user:'',
            session:false,
            radio:'',
            newReleases:'',
            featuredPlaylist:'',
            searchTrue:false,
            isQuery:true,
            userSearch:false,
            searchedUsers:[],
        }
        this.searchAll=this.searchAll.bind(this);
        this.millisToMinutesAndSeconds=this.millisToMinutesAndSeconds.bind(this);
        this.setTrackButton=this.setTrackButton.bind(this);
        this.setAlbumButton=this.setAlbumButton.bind(this);
        this.setArtistButton=this.setArtistButton.bind(this);
        this.logout=this.logout.bind(this);
        this.searchUsers=this.searchUsers.bind(this);
        this.userService=UserService.instance;
        this.spotifyService=SpotifyService.instance;
    }


    componentDidMount(){

        this.spotifyService.getAccessToken()
            .then(response=> (this.setState({accessToken: response.access_token})))
            .then(()=> this.spotifyService.browseCategories(this.state.accessToken)
                .then(object=>(this.setState({radio:object.categories.items}))))
            .then(()=>this.spotifyService.browseFeaturedPlaylist(this.state.accessToken)
                .then(object=>(this.setState({featuredPlaylist:object.playlists.items}))))
            .then(()=>(this.spotifyService.browseNewReleases(this.state.accessToken)
                .then(object=>(this.setState({newReleases:object.albums.items})))))



        this.userService.getSession().then(json=> {
                if (json.userName !== 'CANNOT FIND'){
                    this.setState({user:json,session:true})
                }})

    }

    componentWillReceiveProps(newProps){

        this.spotifyService.getAccessToken()
            .then(response=> (this.setState({accessToken: response.access_token})))
            .then(()=> this.spotifyService.browseCategories(this.state.accessToken)
                .then(object=>(this.setState({radio:object.categories.items}))))
            .then(()=>this.spotifyService.browseFeaturedPlaylist(this.state.accessToken)
                .then(object=>(this.setState({featuredPlaylist:object.playlists.items}))))
            .then(()=>(this.spotifyService.browseNewReleases(this.state.accessToken)
                .then(object=>(this.setState({newReleases:object.albums.items})))))



        this.userService.getSession().then(json=> {
            if (json.userName !== 'CANNOT FIND'){
                this.setState({user:json,session:true})
            }})

    }

    logout(){
        this.userService.logout();
        this.setState({user:'',session:false})
    }

    searchUsers(query){
        this.userService.findByUsernameOrFirstName(query.replace("@",""))
            .then(users=>this.setState({searchedUsers:users}));
    }

    searchAll(){

        if(this.state.query.match('@')){
          //
        }
        else{
            if(this.state.query!=='') {

                this.spotifyService.searchTracks(this.state.query,this.state.accessToken)
                    .then(object => (this.setState({tracks: object.tracks.items})
                ))

                this.spotifyService.searchArtist(this.state.query,this.state.accessToken)
                    .then(object => (this.setState({artists: object.artists.items})
                ))

                this.spotifyService.searchAlbum(this.state.query,this.state.accessToken)
                    .then(object => (this.setState({albums: object.albums.items})
                ))

                this.setState({searchTrue: true})
                this.setState({isQuery:true})
            }
            else{
                this.setState({isQuery:false})
            }
        }


    }


    millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    setTrackButton(){
        if(this.state.TrackButton==='See All'){
            this.setState({TrackButton:'See Less',TrackIndex:this.state.tracks.length})
        }
        else{
            this.setState({TrackButton:'See All',TrackIndex:3})
        }
    }

    setAlbumButton(){
        if(this.state.albumButton==='See All'){
            this.setState({albumButton:'See Less',albumIndex:this.state.albums.length})
        }
        else{
            this.setState({albumButton:'See All',albumIndex:3})
        }
    }

    setArtistButton(){
        if(this.state.artistButton==='See All'){
            this.setState({artistButton:'See Less',artistIndex:this.state.artists.length})
        }
        else{
            this.setState({artistButton:'See All',artistIndex:3})
        }
    }

    render(){
        let searchElement;
        return(
            <div>
                <nav className="navbar fixed-top navbar-light bg-dark">
                    <button className="navbar-brand btn btn-dark" onClick={()=>window.location.reload()} style={{color:"#fff"}}>
                        <i className="fa fa-lg fa-music" style={{color:'#2C8AFF'}}/>&nbsp;&nbsp;BeatDrop</button>
                    <form className="form-inline">

                        <div>
                            <span style={{color:'red'}} hidden={this.state.isQuery}>Type Something*</span>
                            <input className="form-control mr-sm-2" type="search" style={{marginRight:"20px"}} placeholder="Song / @User"
                                   ref={node=>searchElement=node} onChange={()=>{
                                       var query = searchElement.value;
                                       if(query.match("@")){
                                           this.setState({userSearch:true})
                                           this.searchUsers(query)
                                       }
                                       else {
                                           this.setState({userSearch:false})
                                           return this.setState({query:searchElement.value})
                                       }
                                   }}/>
                            <ul style={{zIndex:"+1",position:"absolute"}} className="list-group" hidden={!this.state.userSearch}>
                                {this.state.searchedUsers!==''&&this.state.searchedUsers.map((user,index)=>(
                                    this.state.user.id!==user.id && user.userName!=='admin'&&
                                    <li className="list-group-item" key={index}>
                                        <i className="fa fa-user-circle"/> <Link to={`/user/${user.id}/profile`}>{user.firstName}</Link>
                                        {user.type === 'Artist' && <i className="fa fa-check-circle" style={{color:'#2C8AFF'}}/>}&nbsp;
                                    </li>
                                ))}

                            </ul>
                        </div>


                        <button className="btn btn-outline-light" style={{marginRight:"5px"}} onClick={()=>this.searchAll()} type="button">Search</button>

                        <div hidden={this.state.session}>
                        <Link to="/home/login"><button className="btn btn-outline-light" style={{marginRight:"5px"}} type="button">Login</button></Link>

                        <Link to="/home/signup"><button className="btn btn-outline-light" style={{marginRight:"10px"}} type="button">SignUp</button></Link>
                        </div>
                        <h3 style={{color:"#fff",marginRight:"10px"}} hidden={!this.state.session}>Hi, {this.state.user.firstName}</h3>
                        {this.state.user.type === 'Artist' && <i className="fa fa-lg fa-check-circle" style={{color:'#2C8AFF'}}/>}&nbsp;
                        <div hidden={!this.state.session}>
                            {this.state.user.type!=='Admin' &&
                            <Link to="/user/profile"><button className="btn btn-outline-light" style={{marginRight:"5px"}} type="button">Profile</button></Link>}
                            {this.state.user.type==='Admin' &&
                            <Link to="/admin"><button className="btn btn-outline-light" style={{marginRight:"5px"}} type="button">Admin Page</button></Link>}
                            <button className="btn btn-outline-light" style={{marginRight:"5px"}} onClick={()=>this.logout()} type="button">Logout</button>
                        </div>
                    </form>
                </nav>

                {this.state.searchTrue===false &&

                <div className="container-fluid" style={{marginTop:"0%"}}>
                    <div>
                        <div className="container" style={{color:"#363636",fontSize:"large"}}><u><b>New Releases</b></u></div>
                        <br/>
                        <table className="container-fluid">
                            <tbody>
                                <tr style={{textAlign:'center'}}>
                                    {this.state.newReleases.length>0 && this.state.newReleases.map((name,index)=>(
                                        index < 4 &&
                                        <td key={index}>
                                            <Link to={`/home/album/${name.id}`}>
                                                <img src={name.images[0].url} width="160px" height="160px" style={{borderRadius:"80px"}} alt="New Release"/> <br/>
                                                {name.name}
                                            </Link>
                                        </td>))}
                                </tr>
                            </tbody>
                        </table>
                        <br/>
                        <table className="container-fluid">
                            <tbody>
                                <tr style={{textAlign:'center'}}>
                                    {this.state.newReleases.length>0 && this.state.newReleases.map((name,index)=>(
                                        index > 3 && index <8 &&
                                        <td key={index}>
                                            <Link to={`/home/album/${name.id}`}>
                                                <img src={name.images[0].url} width="160px" height="160px" style={{borderRadius:"80px"}} alt="New Release"/> <br/>
                                                {name.name}
                                            </Link>
                                        </td>))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br/>
                    <div>
                        <div className="container" style={{color:"#363636",fontSize:"large"}}><u><b>Featured Playlists</b></u></div>
                        <br/>
                        <table className="container-fluid">

                            <tbody>
                            <tr style={{textAlign:'center'}}>
                                {this.state.featuredPlaylist.length>0 && this.state.featuredPlaylist.map((name,index)=>(
                                    index < 4 &&
                                    <td key={index}>
                                        <Link to={`/home/featured-playlist/${name.id}`}>
                                            <img src={name.images[0].url} width="160px" height="160px" style={{borderRadius:"80px"}} alt="Featured Playlist"/> <br/>
                                            {name.name}
                                        </Link>
                                    </td>))}
                            </tr>
                            </tbody>
                        </table>
                        <br/>
                        <br/>
                        <table className="container-fluid">
                            <tbody>
                            <tr style={{textAlign:'center'}}>
                                {this.state.featuredPlaylist.length>0 && this.state.featuredPlaylist.map((name,index)=>(
                                    index > 3 && index <8 &&
                                    <td key={index}>
                                        <Link to={`/home/featured-playlist/${name.id}`}>
                                            <img src={name.images[0].url} width="160px" height="160px" style={{borderRadius:"80px"}} alt="Featured Playlist"/> <br/>
                                            {name.name}
                                        </Link>
                                    </td>))}
                            </tr>
                            </tbody>
                        </table>
                    </div>

                </div>}

                <br/>
                {this.state.tracks.length>0 && this.state.searchTrue &&
                    <div>
                         <div className="container-fluid">
                             <div className="row">
                                 <div className="col-9">
                                     <td className="container" style={{color:"#363636",fontSize:"large"}}><u><b>Tracks</b></u></td>
                                 </div>
                                 <div className="col-3">
                                     <button className="float-right btn btn-dark" onClick={()=>this.setTrackButton()} style={{marginBottom:"4px"}}>
                                         {this.state.TrackButton} </button>
                                 </div>
                             </div>
                         </div>
                        <table className="table table-hover table-borderless">
                            <thead style={{background:"lightgrey"}}>
                            <tr>
                                <th>
                                </th>
                                <th>
                                    Name
                                </th>
                                <th>
                                    Artist
                                </th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                                    {this.state.tracks.map((track,index) => (
                                        index<this.state.TrackIndex &&
                                       <tr key={index}>
                                            <td>
                                                {track.album.images.length>0 &&
                                                    <img src={track.album.images[0].url} alt="tracks" height="60px" width="60px" style={{borderRadius:"40px"}}/>}
                                            </td>
                                            <td>
                                                <Link to={`/home/song/${track.id}`}>{track.name}</Link>
                                            </td>
                                            <td>
                                                {track.artists.map((artist,index)=>(
                                                    <Link to={`/home/artist/${artist.id}`} key={index}>{artist.name}&nbsp;</Link>
                                                ))}
                                            </td>
                                            <td>
                                                {this.state.user.userName!==undefined &&
                                                <Link to={`/home/playlist/${track.id}`}>
                                                    <button className="btn" ><i className="fa fa-plus"/></button>
                                                </Link>}
                                                {this.state.user.userName===undefined &&
                                                <Link to={`/home/login`}>
                                                    <button className="btn" ><i className="fa fa-plus"/></button>
                                                </Link>}

                                            </td>
                                        </tr>
                                        ))}
                            </tbody>
                        </table>
                    </div>}

                {this.state.artists.length>0 && this.state.searchTrue &&
                <div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-9">
                                <td className="container" style={{color:"#363636",fontSize:"large"}}><u><b>Artists</b></u></td>
                            </div>
                            <div className="col-3">
                                <button className="float-right btn btn-dark" onClick={()=>this.setArtistButton()} style={{marginBottom:"4px"}}>
                                    {this.state.artistButton} </button>
                            </div>
                        </div>
                    </div>
                    <table className="table table-hover table-borderless">
                        <thead style={{background:"lightgrey"}}>
                        <tr>
                            <th>
                            </th>
                            <th>
                                Name
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.artists.map((artist,index) => (
                            index<this.state.artistIndex &&
                            <tr key={index}>
                                <td>
                                    {artist.images.length>0 &&
                                    <img src={artist.images[0].url} alt="artists" height="60px" width="60px" style={{borderRadius:"40px"}}/>}
                                </td>
                                <td>
                                    <Link to={`/home/artist/${artist.id}`}>{artist.name}&nbsp;</Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>}

                {this.state.albums.length>0 && this.state.searchTrue &&
                <div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-9">
                                <td className="container" style={{color:"#363636",fontSize:"large"}}><u><b>Albums</b></u></td>
                            </div>
                            <div className="col-3">
                                <button className="float-right btn btn-dark" onClick={()=>this.setAlbumButton()} style={{marginBottom:"4px"}}>
                                    {this.state.albumButton} </button>
                            </div>
                        </div>
                    </div>
                    <table className="table table-hover table-borderless">
                        <thead style={{background:"lightgrey"}}>
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
                                Release Date
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.albums.map((album,index) => (
                            index<this.state.albumIndex &&
                            <tr key={index}>
                                <td>
                                    {album.images.length>0 &&
                                    <img src={album.images[0].url} alt="album" height="60px" width="60px" style={{borderRadius:"40px"}}/>}
                                </td>
                                <td>
                                    <Link to={`/home/album/${album.id}`}>{album.name}</Link>
                                </td>
                                <td>
                                    {album.artists.map((artist,index)=>(
                                        <Link to={`/home/artist/${artist.id}`} key={index}>{artist.name}&nbsp;</Link>
                                    ))}
                                </td>
                                <td>
                                    {album.release_date}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>}
                <br/>
                <br/>
                <footer className="fixed-bottom" style={{width:"100%",height:"25px",background:"#363636",marginTop:"2%",paddingTop:"5px"}}>
                    <div style={{marginRight:"20px"}}>
                    <i className="fa fa-facebook-f float-right" style={{color:"#fff"}}/>
                    <i className="fa fa-instagram float-right" style={{color:"#fff"}}/>
                    <i className="fa fa-github float-right" style={{color:"#fff"}}/>
                    <i className="fa fa-twitter float-right" style={{color:"#fff"}}/>
                    </div>
                </footer>

            </div>
        )
    }

}

export default Home;