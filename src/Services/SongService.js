let _singleton=Symbol()

class SongService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new SongService(_singleton);
        return this[_singleton]
    }



    likeSong(userId,trackId,songname,imageUrl){

        var like={
            userId:userId,
            type:'Song',
            typeId:trackId,
            title:'Like',
            date:new Date(),
            name:songname,
            imgUrl:imageUrl
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

    unLikeSong(likeId){
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

    addReview(userId,trackId,stars,songname,imageUrl){

        var review={
            userId:userId,
            type:'Song',
            typeId:trackId,
            title:'Review',
            date:new Date(),
            stars:stars,
            name:songname,
            imgUrl:imageUrl
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

    deleteUploadedSong(id){
        return fetch("http://localhost:8080/api/uploadedSong/"+id,{
            method:'delete'
        }).then(response=>response.json())
    }


}
export default SongService;