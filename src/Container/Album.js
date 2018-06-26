import React from 'react';
import Link from "react-router-dom/es/Link";
import AlbumService from "../Services/AlbumService";
import StarRatings from "react-star-ratings";
import Modal from 'react-modal';
import UserService from "../Services/UserService";
import SpotifyService from "../Services/SpotifyService";

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
            reviewId:'',
            modalIsOpen: false
        }
        this.albumService=AlbumService.instance;
        this.userService=UserService.instance;
        this.spotifyService=SpotifyService.instance;
        this.likeAlbum=this.likeAlbum.bind(this);
        this.addReview=this.addReview.bind(this);
        this.clearReview=this.clearReview.bind(this);
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount(){
        this.setState({like:'',setLike:true,review:''})
        let albumId=this.props.match.params.albumId;
        this.setState({albumId:albumId})

        this.spotifyService.getAccessToken()
            .then(response=> (this.setState({accessToken: response.access_token})))
            .then(()=>this.spotifyService.getAlbums(albumId,this.state.accessToken))
            .then((album)=>this.setState({album:album}))

        this.userService.getSession()
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

    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
        this.subtitle.style.color = '#fff';
    }

    closeModal() {
        this.setState({modalIsOpen: false});
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
            this.openModal()
        }
    }

    componentWillReceiveProps(newProps){
        this.setState({like:'',setLike:true,review:'',rating:0})
        let albumId=newProps.match.params.albumId;
        this.setState({albumId:albumId})

        this.spotifyService.getAccessToken()
            .then(response=> (this.setState({accessToken: response.access_token})))
            .then(()=>this.spotifyService.getAlbums(albumId,this.state.accessToken))
            .then((album)=>this.setState({album:album}))

        this.userService.getSession()
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
            this.openModal()
        }
    }


    render(){
        return(
            <div style={{marginTop:"5%"}}>
                <div style={{textAlign:'center'}}>
                    <div className="container" style={{color:"#363636",fontSize:"large"}}><u><b>Album Details</b></u></div>
                    {this.state.album.images!==undefined &&
                    <img src={this.state.album.images[0].url} width="300px" height="300px" style={{borderRadius:"150px"}} alt="album"/>}
                </div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal" ariaHideApp={false}>

                    <h4 ref={subtitle => this.subtitle = subtitle} style={{textAlign:"center",marginLeft:"10px",marginRight:"10px"}}>Please Login</h4>
                    <button onClick={this.closeModal} className="btn btn-outline-light">close</button>
                </Modal>
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

                        <li className="list-group-item" key={index}>
                            <div className="row">
                                <div className="col-4">
                                    <img src={this.state.album.images[0].url} width="40px" height="40px" style={{borderRadius:"20px"}} alt="track"/>
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

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        background:'#363636',
        borderRadius:'10px'
    }
};

export default Album;