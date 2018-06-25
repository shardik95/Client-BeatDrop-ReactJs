import React from 'react';
import Link from "react-router-dom/es/Link";
import AlbumService from "../Services/AlbumService";
import StarRatings from "react-star-ratings";

class Album extends React.Component{

    constructor(props){
        super(props);
        this.state={
            albumId:'',
            accessToken:'',
            album:'',
            rating:0,
            setLike:true,
            like:'',
            user:'',
            review:'',
            reviewId:''
        }
        this.albumService=AlbumService.instance;
        this.likeAlbum=this.likeAlbum.bind(this);
        this.addReview=this.addReview.bind(this);
        this.clearReview=this.clearReview.bind(this);
    }

    componentDidMount(){
        this.setState({like:'',setLike:true,review:''})
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

        fetch("http://localhost:8080/api/profile",{
            credentials: 'include',
        }).then((response)=>response.json())
            .then((json)=>(this.setState({user:json})))
            .then(()=>this.state.user.userName!=='CANNOT FIND'&&this.state.user.likes.map(like=>{
                if(like.typeId===this.state.albumId) {
                    this.setState({setLike: true,like:like})
                }
            }))
            .then(()=>this.state.user.userName!=='CANNOT FIND'&&this.state.user.reviews.map(review=>{
                if(review.typeId===this.state.albumId) {
                    this.setState({rating:review.stars,reviewId:review.id})
                }
            }))


    }

    likeAlbum(){
        if(this.state.user.userName!=='CANNOT FIND'){
            if(this.state.like==='') {
                this.albumService.likeAlbum(this.state.user.id, this.state.albumId,this.state.album.name,this.state.album.images[0].url)
                    .then((like) => this.setState({like: like, setLike: true}))
            }
            else{
                this.albumService.unLikeAlbum(this.state.like.id)
                    .then(()=>this.setState({like:''}))
            }
        }
        else{
            alert("First Login")
        }
    }

    componentWillReceiveProps(newProps){
        this.setState({like:'',setLike:true,review:''})
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

        fetch("http://localhost:8080/api/profile",{
            credentials: 'include',
        }).then((response)=>response.json())
            .then((json)=>(this.setState({user:json})))
            .then(()=>this.state.user.userName!=='CANNOT FIND'&&this.state.user.likes.map(like=>{
                if(like.typeId===this.state.albumId) {
                    this.setState({setLike: true,like:like})
                }
            }))
            .then(()=>this.state.user.userName!=='CANNOT FIND'&&this.state.user.reviews.map(review=>{
                if(review.typeId===this.state.albumId) {
                    this.setState({rating:review.stars,reviewId:review.id})
                }
            }))
    }

    clearReview(){
        this.albumService.clearReview(this.state.reviewId)
            .then(()=>this.setState({rating:0}))
    }

    addReview(rating){

        if(this.state.user.userName!=='CANNOT FIND'){
            this.setState({rating:rating});
            this.albumService.addReview(this.state.user.id,this.state.albumId,rating,this.state.album.name,this.state.album.images[0].url)
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
                    <td className="container" style={{color:"#363636",fontSize:"large"}}><u><b>Album Details</b></u></td>
                    {this.state.album.images!==undefined && <img src={this.state.album.images[0].url} width="300px" height="300px" style={{borderRadius:"150px"}}/>}
                </div>
                <br/>
                <div className="row">
                    <div className="col-5" style={{textAlign:'center'}}>
                        <i className="fa fa-lg fa-heart" style={{color:this.state.like?'red':'lightgrey'}} onClick={()=>this.likeAlbum()}/>
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
                        <td><b>Album name:</b></td>
                        <td>{this.state.album.name}</td>
                    </tr>
                    <tr>
                        <td><b>Artists:</b></td>
                        <td>{this.state.album.artists!==undefined && this.state.album.artists.map((artist,index)=>(
                            <Link to={`/home/artist/${artist.id}`} key={index}>{artist.name}&nbsp;</Link>
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
                    <li className="list-group-item bg-dark active" style={{color:"#fff",border:"0px"}} >
                        Tracks
                    </li>
                    {this.state.album.tracks!==undefined && this.state.album.tracks.items.map((track,index)=>(
                      index<7 &&

                        <li className="list-group-item">
                            <div className="row">
                                <div className="col-4">
                                    <img src={this.state.album.images[0].url} width="40px" height="40px" style={{borderRadius:"20px"}}/>
                                    {console.log(track)}
                                </div>
                                <div className="col-8">
                                    <Link to={`/home/song/${track.id}`}  key={index}>
                                        {track.name}
                                    </Link>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <br/>
                <br/>
            </div>

        )
    }

}

export default Album;