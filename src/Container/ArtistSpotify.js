import React from 'react';
import TopTracks from "../Components/TopTracks";
import TopAlbums from "../Components/TopAlbums";
import RelatedArtists from "../Components/RelatedArtists";
import StarRatings from "react-star-ratings";
import ArtistService from "../Services/ArtistService";
import Modal from 'react-modal';
import UserService from "../Services/UserService";
import SpotifyService from "../Services/SpotifyService";

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
            reviewId:'',
            modalIsOpen: false
        }
        this.showTopTracks=this.showTopTracks.bind(this);
        this.artistService=ArtistService.instance;
        this.likeArtist=this.likeArtist.bind(this);
        this.addReview=this.addReview.bind(this);
        this.clearReview=this.clearReview.bind(this);
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.userService=UserService.instance;
        this.spotifyService=SpotifyService.instance;
    }

    componentDidMount(){
        this.setState({like:'',setLike:true,review:''})
        let artistId=this.props.match.params.artistId;
        this.setState({artistId:artistId})

        this.spotifyService.getAccessToken()
            .then(response=> {return this.setState({accessToken: response.access_token})})
            .then(()=>this.spotifyService.getArtists(artistId,this.state.accessToken))
            .then((artist)=>this.setState({artist:artist}))

        this.userService.getSession()
            .then((json)=>(this.setState({user:json})))
            .then(()=>this.state.user.userName!=='CANNOT FIND'&& this.state.user.likes.map(like=>{
                if(like.typeId===this.state.artistId) {
                    return this.setState({setLike: true,like:like})
                }
            }))
            .then(()=>this.state.user.userName!=='CANNOT FIND'&&this.state.user.reviews.map(review=>{
                if(review.typeId===this.state.artistId) {
                   return this.setState({rating:review.stars,reviewId:review.id})
                }
            }))
    }

    componentWillReceiveProps(newProps){
        this.setState({like:'',setLike:true,review:'',rating:0})
        let artistId=newProps.match.params.artistId;
        this.setState({artistId:artistId})

        this.spotifyService.getAccessToken()
            .then(response=> {return this.setState({accessToken: response.access_token})})
            .then(()=>this.spotifyService.getArtists(artistId,this.state.accessToken))
            .then((artist)=>this.setState({artist:artist}))

        this.userService.getSession()
            .then((json)=>(this.setState({user:json})))
            .then(()=>this.state.user.userName!=='CANNOT FIND'&& this.state.user.likes.map(like=>{
                if(like.typeId===this.state.artistId) {
                    return this.setState({setLike: true,like:like})
                }
            }))
            .then(()=>this.state.user.userName!=='CANNOT FIND'&&this.state.user.reviews.map(review=>{
                if(review.typeId===this.state.artistId) {
                    return this.setState({rating:review.stars,reviewId:review.id})
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

    likeArtist(){
        if(this.state.user.userName!=='CANNOT FIND'){
            if(this.state.like==='') {
                this.artistService.likeArtist(this.state.user.id, this.state.artistId,this.state.artist.name,this.state.artist.images[0].url)
                    .then((like) => this.setState({like: like, setLike: true}))
            }
            else{
                this.artistService.unLikeArtist(this.state.like.id)
                    .then(()=>this.setState({like:''}))
            }
        }
        else{
            this.openModal()
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
            this.artistService.addReview(this.state.user.id,this.state.artistId,rating,this.state.artist.name,this.state.artist.images[0].url)
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
                    <div className="container" style={{color:"#363636",fontSize:"large"}}><u><b>Artist Details</b></u></div>
                    {this.state.artist.images!==undefined && <img src={this.state.artist.images[0].url} width="300px" height="300px" style={{borderRadius:"150px"}}
                    alt="artist img"/>}
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
                            <li className="list-group-item bg-dark active" style={{color:"#fff",border:"0px"}} >
                               Top-Tracks
                            </li>
                            {this.state.accessToken.length>0 &&<TopTracks accessToken={this.state.accessToken} artistId={this.state.artistId}/>}
                        </ul>
                    </div>
                    <div className="col-6">
                        <ul className="list-group">
                            <li className="list-group-item bg-dark active" style={{color:"#fff",border:"0px"}} >
                                Albums
                            </li>
                            {this.state.accessToken.length>0 &&<TopAlbums accessToken={this.state.accessToken} artistId={this.state.artistId}/>}
                        </ul>
                    </div>
                </div>
                <br/>
                <div className="container" style={{color:"#363636",fontSize:"large"}}><u><b>Related Artists</b></u></div>
                <RelatedArtists accessToken={this.state.accessToken} artistId={this.state.artistId}/>
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

export default ArtistSpotify;