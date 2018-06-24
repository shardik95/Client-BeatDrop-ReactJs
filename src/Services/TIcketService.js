let _singleton=Symbol()

class TicketService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new TicketService(_singleton);
        return this[_singleton]
    }

    createTicket(event){
        return fetch("http://localhost:8080/api/ticket",{
            method:'post',
            headers:{
                'content-type':'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Origin':true
            },
            body:JSON.stringify(event),
            credentials: 'include'
        }).then(response=>response.json())
    }

    getTickets(id){
        return fetch("http://localhost:8080/api/ticket/"+id)
            .then(response=>response.json())
    }

    updateEvent(event,id){
        return fetch("http://localhost:8080/api/ticket/"+id,{
            method:'put',
            headers:{
                'content-type':'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Origin':true
            },
            body:JSON.stringify(event),
            credentials: 'include'
        }).then(response=>response.json())
    }

    delete(id){
        return fetch("http://localhost:8080/api/ticket/"+id,{
            method:'delete',
            headers:{
                'content-type':'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Origin':true
            }
        }).then(response=>response.json())
    }

}
export default TicketService;