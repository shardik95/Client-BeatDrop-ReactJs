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
        return fetch("http://localhost:8080/api/signup",{
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
        return fetch("http://localhost:8080/api/login",{
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
        return fetch("http://localhost:8080/api/user/"+id)
            .then(response =>(
                response.json()
            ))
    }

    logout(){
        fetch("http://localhost:8080/api/logout",{
            credentials: 'include'
        })
    }

    findByUsernameOrFirstName(query){
        return fetch("http://localhost:8080/api/user/search/q="+query)
            .then(response=>response.json())
    }

}

export default UserService;