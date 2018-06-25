import React from 'react';
import Link from "react-router-dom/es/Link";
import StarRatings from "react-star-ratings";
import SongService from "../Services/SongService";

class Song extends React.Component{

    constructor(props){
        super(props);
        this.state={
            trackId:'',
            access_token:'',
            song:'',
            rating:0,
            user:'',
            setLike:true,
            like:'',
            review:'',
            reviewId:''
        }
        this.millisToMinutesAndSeconds=this.millisToMinutesAndSeconds.bind(this);
        this.likeSong=this.likeSong.bind(this);
        this.addReview=this.addReview.bind(this);
        this.clearReview=this.clearReview.bind(this);
        this.songService=SongService.instance;

    }

    componentDidMount(){
        this.setState({like:'',setLike:true,review:''})
        let trackId=this.props.match.params.trackId;
        this.setState({trackId:trackId})

        fetch("https://beatdrop.herokuapp.com/api/accessToken")
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

        fetch("https://beatdrop.herokuapp.com/api/profile",{
            credentials: 'include',
        }).then((response)=>response.json())
            .then((json)=>(this.setState({user:json})))
            .then(()=>this.state.user.userName!=='CANNOT FIND'&&this.state.user.likes.map(like=>{
                if(like.typeId===this.state.trackId) {
                    this.setState({setLike: true,like:like})
                }
            }))
            .then(()=>this.state.user.userName!=='CANNOT FIND'&&this.state.user.reviews.map(review=>{
                if(review.typeId===this.state.trackId) {
                    this.setState({rating:review.stars,reviewId:review.id})
                }
            }))

    }

    componentWillReceiveProps(newProps){
        this.setState({like:'',setLike:true,review:''})
        let trackId=newProps.match.params.trackId;
        this.setState({trackId:trackId})

        fetch("https://beatdrop.herokuapp.com/api/accessToken")
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

        fetch("https://beatdrop.herokuapp.com/api/profile",{
            credentials: 'include',
        }).then((response)=>response.json())
            .then((json)=>(this.setState({user:json})))
            .then(()=>this.state.user.userName!=='CANNOT FIND'&&this.state.user.likes.map(like=>{
                if(like.trackId===this.state.trackId)
                    this.setState({setLike:true,like:like})
            }))
            .then(()=>this.state.user.userName!=='CANNOT FIND'&&this.state.user.reviews.map(review=>{
                if(review.typeId===this.state.trackId) {
                    this.setState({rating:review.stars})
                }
            }))

    }

    millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    clearReview(){
        this.songService.clearReview(this.state.reviewId)
            .then(()=>this.setState({rating:0}))
    }

    addReview(rating){

        if(this.state.user.userName!=='CANNOT FIND'){
            this.setState({rating:rating});
            this.songService.addReview(this.state.user.id,this.state.trackId,rating,this.state.song.name,this.state.song.album.images[0].url)
                .then(review=>this.setState({review:review}))
        }
        else{
            alert("First Login")
        }


    }


    likeSong(){
        if(this.state.user.userName!=='CANNOT FIND'){
            if(this.state.like==='') {
                this.songService.likeSong(this.state.user.id, this.state.trackId,this.state.song.name,this.state.song.album.images[0].url)
                    .then((like) => this.setState({like: like, setLike: true}))
            }
            else{
                this.songService.unLikeSong(this.state.like.id)
                    .then(()=>this.setState({like:''}))
            }
        }
        else{
            alert("First Login")
        }
    }

    render(){
        return(
            <div style={{marginTop:"5%"}}>
                    <div style={{textAlign:'center'}}>
                        <td className="container" style={{color:"#363636",fontSize:"large"}}><u><b>Song Details</b></u></td>
                         {this.state.song.album!==undefined && <img src={this.state.song.album.images[0].url} width="300px" height="300px" style={{borderRadius:"150px"}}/>}
                    </div>
                <br/>
                <div className="row">
                    <div className="col-5" style={{textAlign:'center'}}>
                        <i className="fa fa-lg fa-heart" style={{color:this.state.like?'red':'lightgrey'}} onClick={()=>this.likeSong()}/>
                    </div>
                    <div className="col-5">
                        <StarRatings
                            rating={this.state.rating}
                            starRatedColor="gold"
                            changeRating={(e)=>{this.addReview(e)}}
                            numberOfStars={5}
                            starDimension="18px"
                            starSpacing="3px"
                        />
                        <button className="btn" onClick={()=>this.clearReview()}><u>clear</u></button>
                    </div>
                </div>
                <table className="table">
                    <tbody>
                        <tr>
                            <td><b>Song name:</b></td>
                            <td>{this.state.song.name}</td>
                        </tr>
                        <tr>
                            <td><b>Artists:</b></td>
                            <td>{this.state.song.artists!==undefined && this.state.song.artists.map((artist,index)=>(
                                <Link to={`/home/artist/${artist.id}`} key={index}>{artist.name}&nbsp;</Link>
                            ))}</td>
                        </tr>
                        <tr>
                            <td><b>Album:</b></td>
                            <td>{this.state.song.album!==undefined &&
                            <Link to={`/home/album/${this.state.song.album.id}`}>{this.state.song.album.name}</Link>
                            }</td>
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