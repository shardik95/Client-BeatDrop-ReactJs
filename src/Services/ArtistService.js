let _singleton=Symbol()

class ArtistService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new ArtistService(_singleton);
        return this[_singleton]
    }

    createArtist(artist){

        return fetch("https://beatdrop.herokuapp.com/api/artist",{
            credentials:'include',
            method:'post',
            headers:{
                'content-type':'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Origin':true
            },
            body:JSON.stringify(artist)
        }).then(response=>response.json())
    }

    deleteArtist(id){
        return fetch("https://beatdrop.herokuapp.com/api/artist/"+id,{
            method:'delete'
        }).then(response=>response.json())
    }

    likeArtist(userId,artistId,artistName,imageUrl){

        var like={
            userId:userId,
            type:'Artist',
            typeId:artistId,
            title:'Like',
            date:new Date(),
            name:artistName,
            imgUrl:imageUrl
        }

        return fetch("https://beatdrop.herokuapp.com/api/profile/like",{
            credentials:'include',
            method:'post',
            headers:{
                'content-type':'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Origin':true
            },
            body:JSON.stringify(like)
        })
            .then(response=>response.json())

    }

    unLikeArtist(likeId){
        return fetch("https://beatdrop.herokuapp.com/api/profile/like/"+likeId,{
            method:'delete',
            headers:{
                'content-type':'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Origin':true
            },
            credentials:'include'
        })
    }

    addReview(userId,artistId,stars,artistName,imageUrl){

        var review={
            userId:userId,
            type:'Artist',
            typeId:artistId,
            title:'Review',
            date:new Date(),
            stars:stars,
            name:artistName,
            imgUrl:imageUrl
        }

        return fetch("https://beatdrop.herokuapp.com/api/profile/review",{
            credentials:'include',
            method:'post',
            headers:{
                'content-type':'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Origin':true
            },
            body:JSON.stringify(review)
        })
            .then(response=>response.json())

    }

    clearReview(reviewId){
        return fetch("https://beatdrop.herokuapp.com/api/profile/review/"+reviewId,{
            method:'delete',
            headers:{
                'content-type':'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Origin':true
            },
            credentials:'include'
        })
    }

    findAllArtists(){
        return fetch("https://beatdrop.herokuapp.com/api/artist")
            .then(response=>response.json())
    }

}
export default ArtistService;