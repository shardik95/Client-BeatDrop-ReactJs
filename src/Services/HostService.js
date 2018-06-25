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
        return fetch("https://beatdrop.herokuapp.com/api/host",{
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

    getAllHosts(){
        return fetch("https://beatdrop.herokuapp.com/api/host")
            .then(response=>response.json())
    }

    deleteHost(id){
        return fetch("https://beatdrop.herokuapp.com/api/host/"+id,{
            method:'delete'
        }).then(response=>response.json())
    }

    updateHost(host){
        return fetch("https://beatdrop.herokuapp.com/api/host",{
            credentials: 'include',
            headers:{
                'content-type':'application/json',
            },
            method:'put',
            body:JSON.stringify(host)
        }).then(response=>response.json())
    }

}

export default HostService;