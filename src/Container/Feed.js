import React from 'react';
import StarRatings from "react-star-ratings";


class Feed extends React.Component{

    constructor(props){
        super(props);
        this.state={
            rating:0,
            //changeRating:3
        }
    }

    render(){
        return(
            <div>
                <h1>Feed</h1>
                <div className="row" style={{marginLeft:"5px"}}>
                    <div className="col-5" style={{border: "1px solid black",marginRight:'75px'}}>
                        <h1>Likes</h1>
                    </div>
                    <div className="col-5" style={{border: "1px solid black"}}>
                        <h1>Reviews</h1>
                        <div className="card text-center">
                            <div className="card-body">
                                <h5 className="card-title">Song Name</h5>
                                <StarRatings
                                    rating={this.state.rating}
                                    starRatedColor="gold"
                                    changeRating={(e)=>{this.setState({rating:e})}}
                                    numberOfStars={5}
                                    starDimension="25px"
                                    starSpacing="5px"
                                />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Song Name</h5>
                                <StarRatings
                                    rating={this.state.rating}
                                    starRatedColor="gold"
                                    changeRating={(e)=>{this.setState({rating:e})}}
                                    numberOfStars={5}
                                    starDimension="25px"
                                    starSpacing="5px"
                                />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Song Name</h5>
                                <StarRatings
                                    rating={this.state.rating}
                                    starRatedColor="gold"
                                    changeRating={(e)=>{this.setState({rating:e})}}
                                    numberOfStars={5}
                                    starDimension="25px"
                                    starSpacing="5px"
                                />
                            </div>
                        </div>
                        <br/>
                    </div>
                </div>
            </div>
        )
    }

}

export default Feed;