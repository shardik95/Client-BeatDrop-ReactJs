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
            },
            body:JSON.stringify(user),
            credentials: "same-origin"
        })
    }

    loginUser(user){
        return fetch("http://localhost:8080/api/login",{
            method:'post',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(user),
            credentials: "same-origin"
        })
    }

}

export default UserService;