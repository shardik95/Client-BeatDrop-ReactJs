let _singleton=Symbol()

class HostService{
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new HostService(_singleton);
        return this[_singleton]
    }

    createHost(host){
        return fetch("http://localhost:8080/api/host",{
            method:'post',
            headers:{
                'content-type':'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Origin':true
            },
            body:JSON.stringify(host),
            credentials: 'include',
        })
    }

}

export default HostService;