let _singleton=Symbol()

class AlbumService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new AlbumService(_singleton);
        return this[_singleton]
    }



    likeAlbum(userId,albumId){

        var like={
            userId:userId,
            type:'Album',
            typeId:albumId,
            title:'Like',
            date:new Date()
        }

        return fetch("http://localhost:8080/api/profile/like",{
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

    unLikeAlbum(likeId){
        return fetch("http://localhost:8080/api/profile/like/"+likeId,{
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

    addReview(userId,albumId,stars){

        var review={
            userId:userId,
            type:'Album',
            typeId:albumId,
            title:'Review',
            date:new Date(),
            stars:stars
        }

        return fetch("http://localhost:8080/api/profile/review",{
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
        return fetch("http://localhost:8080/api/profile/review/"+reviewId,{
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

}
export default AlbumService;