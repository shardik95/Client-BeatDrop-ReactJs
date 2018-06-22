import React from 'react';
import TopTracks from "../Components/TopTracks";
import TopAlbums from "../Components/TopAlbums";
import RelatedArtists from "../Components/RelatedArtists";
import StarRatings from "react-star-ratings";
import ArtistService from "../Services/ArtistService";

class ArtistSpotify extends React.Component{

    constructor(props){
        super(props)

        this.state={
            artistId:'',
            artist:'',
            toptracks:'',
            albums:'',
            ttavail:false,
            accessToken:'',
            trackbtn:5,
            albumbtn:5,
            rating:0,
            setLike:true,
            like:'',
            user:'',
            review:'',
            reviewId:''
        }
        this.showTopTracks=this.showTopTracks.bind(this);
        this.artistService=ArtistService.instance;
        this.likeArtist=this.likeArtist.bind(this);
        this.addReview=this.addReview.bind(this);
        this.clearReview=this.clearReview.bind(this);
    }

    componentDidMount(){
        this.setState({like:'',setLike:true,review:''})
        let artistId=this.props.match.params.artistId;
        this.setState({artistId:artistId})

        fetch("http://localhost:8080/api/accessToken")
            .then(response=>(
                response.json()
            )).then(response=> {
            return this.setState({accessToken: response.access_token})
        }).then(()=>fetch('https://api.spotify.com/v1/artists/'+artistId,{
            headers:{
                'Authorization':'Bearer '+this.state.accessToken
            }
        })) .then((response)=>response.json())
            .then((artist)=>this.setState({artist:artist}))

        fetch("http://localhost:8080/api/profile",{
            credentials: 'include',
        }).then((response)=>response.json())
            .then((json)=>(this.setState({user:json})))
            .then(()=>this.state.user!==''&&this.state.user.likes.map(like=>{
                if(like.typeId===this.state.artistId) {
                    this.setState({setLike: true,like:like})
                }
            }))
            .then(()=>this.state.user!==''&&this.state.user.reviews.map(review=>{
                if(review.typeId===this.state.artistId) {
                    this.setState({rating:review.stars,reviewId:review.id})
                }
            }))

    }

    componentWillReceiveProps(newProps){
        this.setState({like:'',setLike:true,review:''})
        let artistId=newProps.match.params.artistId;
        this.setState({artistId:artistId})

        fetch("http://localhost:8080/api/accessToken")
            .then(response=>(
                response.json()
            )).then(response=> {
            return this.setState({accessToken: response.access_token})
        }).then(()=>fetch('https://api.spotify.com/v1/artists/'+artistId,{
            headers:{
                'Authorization':'Bearer '+this.state.accessToken
            }
        }))
            .then((response)=>response.json())
            .then((artist)=>this.setState({artist:artist}))

        fetch("http://localhost:8080/api/profile",{
            credentials: 'include',
        }).then((response)=>response.json())
            .then((json)=>(this.setState({user:json})))
            .then(()=>this.state.user!==''&&this.state.user.likes.map(like=>{
                if(like.typeId===this.state.artistId) {
                    console.log(like.typeId)
                    this.setState({setLike: true,like:like})
                }
            }))
            .then(()=>this.state.user!==''&&this.state.user.reviews.map(review=>{
                if(review.typeId===this.state.artistId) {
                    this.setState({rating:review.stars,reviewId:review.id})
                }
            }))

    }

    likeArtist(){
        if(this.state.user.userName!=='CANNOT FIND'){
            if(this.state.like==='') {
                this.artistService.likeArtist(this.state.user.id, this.state.artistId)
                    .then((like) => this.setState({like: like, setLike: true}))
            }
            else{
                this.artistService.unLikeArtist(this.state.like.id)
                    .then(()=>this.setState({like:''}))
            }
        }
        else{
            alert("First Login")
        }
    }

    showTopTracks(){

            this.setState({ttavail:true})
    }

    clearReview(){
        this.artistService.clearReview(this.state.reviewId)
            .then(()=>this.setState({rating:0}))
    }

    addReview(rating){

        if(this.state.user.userName!=='CANNOT FIND'){
            this.setState({rating:rating});
            this.artistService.addReview(this.state.user.id,this.state.artistId,rating)
                .then(review=>this.setState({review:review}))
        }
        else{
            alert("First Login")
        }


    }

    render(){

        return(
            <div style={{marginTop:"5%"}}>
                <div style={{textAlign:'center'}}>
                    <h3>Artist Details</h3>
                    {this.state.artist.images!==undefined && <img src={this.state.artist.images[0].url} width="300px" height="300px"/>}
                </div>
                <br/>
                <div className="row">
                    <div className="col-5" style={{textAlign:'center'}}>
                        <i className="fa fa-lg fa-heart" style={{color:this.state.like?'red':'lightgrey'}} onClick={()=>this.likeArtist()}/>
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
                <br/>
                <h3>Related Artists</h3>
                <RelatedArtists accessToken={this.state.accessToken} artistId={this.state.artistId}/>
                <br/>
            </div>
        )

    }

}

export default ArtistSpotify;