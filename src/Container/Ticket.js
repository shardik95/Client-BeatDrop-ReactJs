import React from 'react';
import TicketService from "../Services/TIcketService";
import UserService from "../Services/UserService";

class Ticket extends React.Component{

    constructor(props){
        super(props);
        this.state={
            eventName:'',
            maxSeats:'',
            availSeats:'',
            price:"",
            user:'',
            session:false,
            tickets:'',
            updateFlag:false,
            id:''
        }
        this.createEvent=this.createEvent.bind(this);
        this.update=this.update.bind(this);
        this.delete=this.delete.bind(this);
        this.updateEvent=this.updateEvent.bind(this);
        this.ticketService=TicketService.instance;
        this.userService=UserService.instance;
    }

    componentDidMount(){
        this.userService.getSession()
            .then(json=> {
                if (json.userName !== 'CANNOT FIND'){
                    this.setState({user:json,session:true})
                }
        }).then(()=>this.ticketService.getTickets(this.state.user.id))
            .then(tickets=>this.setState({tickets:tickets}))
    }

    componentWillReceiveProps(newProps){
        this.userService.getSession()
            .then(json=> {
                if (json.userName !== 'CANNOT FIND'){
                    this.setState({user:json,session:true})
                }
        }).then(()=>this.ticketService.getTickets(this.state.user.id))
            .then(tickets=>this.setState({tickets:tickets}))

    }

    update(ticket){
        this.setState({
            eventName:ticket.eventName,
            maxSeats:ticket.maxTickets,
            availSeats:ticket.availTickets,
            price:ticket.price,
            updateFlag:true,
            id:ticket.id
        })
    }

    updateEvent(){
        let newEvent={
            eventName:this.state.eventName,
            availTickets:this.state.maxSeats,
            maxTickets:this.state.availSeats,
            price:this.state.price
        }

        this.ticketService.updateEvent(newEvent,this.state.id)
            .then(()=>this.ticketService.getTickets(this.state.user.id))
            .then(tickets=>this.setState({tickets:tickets}))
    }

    delete(id){
        this.ticketService.delete(id)
            .then(()=>this.ticketService.getTickets(this.state.user.id))
            .then(tickets=>this.setState({tickets:tickets}))
    }

    createEvent(){

        let event ={
            eventName:this.state.eventName,
            maxTickets:this.state.maxSeats,
            availTickets:this.state.availSeats,
            price:this.state.price
        }

        this.ticketService.createTicket(event)
            .then(()=>this.ticketService.getTickets(this.state.user.id))
            .then(tickets=>this.setState({tickets:tickets}))

    }

    render(){
        return(
            <div style={{marginTop:"2%"}}>
                <form>
                    <label for="name">Event Name</label>
                    <input className="form-control" id="name" onChange={(e)=>this.setState({eventName:e.target.value})} value={this.state.eventName}/>
                    <label for="seats">Max seats</label>
                    <input className="form-control" id="seats" onChange={(e)=>this.setState({maxSeats:e.target.value})} value={this.state.maxSeats}/>
                    <label htmlFor="avail">Available Seats</label>
                    <input className="form-control" id="avail" onChange={(e) => this.setState({availSeats: e.target.value})} value={this.state.availSeats}/><br/>
                    <label for="price">Price</label>
                    <input className="form-control" id="price" onChange={(e)=>this.setState({price:e.target.value})} value={this.state.price}/><br/>
                    <button className="btn btn-outline-dark float-right" type="button" hidden={this.state.updateFlag} onClick={()=>this.createEvent()}>Create Event</button>
                    <button className="btn btn-outline-dark float-right" type="button" hidden={!this.state.updateFlag} onClick={()=>this.updateEvent()}>Update Event</button>
                </form>
                <br/>
                <br/>
                <div className="row">
                {this.state.tickets!=='' && this.state.tickets.map(ticket=>(
                        <div className="card col-4" style={{width:" 18em",margin:"10px"}}>
                            <div className="card-body">
                                <h5 className="card-title">{ticket.eventName}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{this.state.user.userName}</h6>
                                <p className="card-text">Ticket Available: {ticket.availTickets} <br/> Max Tickets: {ticket.maxTickets}
                                <br/>Price: {ticket.price}</p>
                                <button  className="btn btn-outline-dark float-left" onClick={()=>this.update(ticket)}>Update</button>
                                <button className="btn btn-outline-dark float-right"  onClick={()=>this.delete(ticket.id)}>Delete</button>
                            </div>
                        </div>
                    ))
                }
                </div>
            </div>
        )
    }
}
export default Ticket;