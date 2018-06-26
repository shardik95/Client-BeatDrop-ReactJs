let _singleton=Symbol()

class UserService{
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new UserService(_singleton);
        return this[_singleton]
    }

    createUser(user){
        return fetch("https://beatdrop.herokuapp.com/api/signup",{
            method:'post',
            headers:{
                'content-type':'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Origin':true
            },
            body:JSON.stringify(user),
            credentials: 'include',
        })
    }

    loginUser(user){
        return fetch("https://beatdrop.herokuapp.com/api/login",{
            method:'post',
            headers:{
                'content-type':'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Origin':true

            },
            body:JSON.stringify(user),
            credentials: 'include',

        })
    }

    findUserById(id){
        return fetch("https://beatdrop.herokuapp.com/api/user/"+id)
            .then(response =>(
                response.json()
            ))
    }

    logout(){
        fetch("https://beatdrop.herokuapp.com/api/logout",{
            credentials: 'include'
        })
    }

    findByUsernameOrFirstName(query){
        return fetch("https://beatdrop.herokuapp.com/api/user/search/q="+query)
            .then(response=>response.json())
    }

    updateUser(user){
        return fetch("https://beatdrop.herokuapp.com/api/user",{
            credentials: 'include',
            headers:{
                'content-type':'application/json',
            },
            method:'put',
            body:JSON.stringify(user)
        }).then(response=>response.json())
    }

    followUser(user,userId){
        return fetch("https://beatdrop.herokuapp.com/api/user/following/"+userId,{
            method:'post',
            headers:{
                'content-type':'application/json',
            },
            credentials: 'include',
            body:JSON.stringify(user)
        }).then(response=>response.json())
    }

    unfollow(followingId,followerId){
        return fetch("https://beatdrop.herokuapp.com/api/following/FID/follower/F_Id".replace("FID",followingId).replace("F_Id",followerId),{
            method:'delete',
            credentials: 'include'
        }).then(response=>response.json())
    }


    findAllUsers(){
        return fetch("https://beatdrop.herokuapp.com/api/user")
            .then(response=>response.json())
    }

    deleteUser(id){
        return fetch("https://beatdrop.herokuapp.com/api/user/"+id,{
             method:'delete'
         }).then(response=>response.json())

    }

    verifyUser(user){
        return fetch("https://beatdrop.herokuapp.com/api/verify",{
            method:'post',
            headers:{
                'content-type':'application/json',
            },
            credentials: 'include',
            body:JSON.stringify(user)
        }).then(response=>response.json())
    }

    update(user){
        return fetch("https://beatdrop.herokuapp.com/api/user/admin",{
            credentials: 'include',
            headers:{
                'content-type':'application/json',
            },
            method:'put',
            body:JSON.stringify(user)
        }).then(response=>response.json())
    }

    getSession(){
        return fetch("https://beatdrop.herokuapp.com/api/profile",{
            credentials: 'include',
        }).then((response)=>response.json())
    }

}

export default UserService;