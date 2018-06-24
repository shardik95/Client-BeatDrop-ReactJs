let _singleton=Symbol()

class PartyService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new PartyService(_singleton);
        return this[_singleton]
    }

    createParty(party){
        return fetch("http://localhost:8080/api/party",{
            method:'post',
            headers:{
                'content-type':'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Origin':true
            },
            body:JSON.stringify(party),
            credentials: 'include'
        }).then(response=>response.json())
    }

    getPartyForUser(id){
        return fetch("http://localhost:8080/api/user/UID/party".replace("UID",id),{
            headers:{
                'content-type':'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Origin':true
            },
            credentials: 'include'
        })
            .then(response=>response.json())

    }

    deleteParty(id){
        return fetch("http://localhost:8080/api/party/"+id,{
            method:'delete'
        })
    }
}

export default PartyService;