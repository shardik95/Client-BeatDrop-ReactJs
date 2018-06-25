import React from 'react';
import UserService from "../Services/UserService";
import HostPlaylistService from "../Services/HostPlaylistService";
import TicketService from "../Services/TIcketService";

class PublicTicket extends React.Component{

    constructor(props){
        super(props);
        this.state={
            profileUserId:'',
            user:'',
            userId:'',
            session:false,
            profileUser:'',
            tickets:''

        }
        this.userService=UserService.instance;
        this.hostplaylistService=HostPlaylistService.instance;
        this.ticketService=TicketService.instance;
        this.buy=this.buy.bind(this);
    }

    componentDidMount(){
        let profileUserId=this.props.match.params.userId;

        this.setState({profileUserId:profileUserId});

        fetch("https://beatdrop.herokuapp.com/api/profile",{
            credentials: 'include',
        }).then(response=> (
            response.json()
        )).then(json=> {
            if (json.userName !== 'CANNOT FIND'){
                this.setState({user:json,session:true,userId:json.id})
            }
        })

        this.userService.findUserById(profileUserId)
            .then(user=>this.setState({profileUser:user}))
            .then(()=>this.ticketService.getTickets(this.state.profileUser.id))
            .then(tickets=>this.setState({tickets:tickets}))
    }

    componentWillReceiveProps(newProps){
        let profileUserId=newProps.match.params.userId;

        this.setState({profileUserId:profileUserId});

        fetch("https://beatdrop.herokuapp.com/api/profile",{
            credentials: 'include',
        }).then(response=> (
            response.json()
        )).then(json=> {
            if (json.userName !== 'CANNOT FIND'){
                this.setState({user:json,session:true,userId:json.id})
            }
        })
        this.userService.findUserById(profileUserId)
            .then(user=>this.setState({profileUser:user}))
            .then(()=>this.ticketService.getTickets(this.state.profileUser.id))
            .then(tickets=>this.setState({tickets:tickets}))

    }

    buy(ticket,id){

       ticket.availTickets=''+(parseInt(ticket.availTickets)-1);


        this.ticketService.updateEvent(ticket,id)
            .then(()=>this.ticketService.getTickets(this.state.profileUser.id))
            .then(tickets=>this.setState({tickets:tickets}))
        alert("bought")
    }

    render(){
        return(
            <div style={{marginTop:"2%"}}>
                <div className="row">
                    {this.state.tickets!=='' && this.state.tickets.map(ticket=>(
                        <div className="card col-4" style={{width:" 18em",marginRight:"10px",marginLeft:"10px"}}>
                            <div className="card-body">
                                <h5 className="card-title">{ticket.eventName}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{this.state.profileUser.userName}</h6>
                                <p className="card-text">Ticket Available: {ticket.availTickets}
                                    <br/>Price: {ticket.price}</p>
                                <button className="btn btn-outline-dark" onClick={()=>this.buy(ticket,ticket.id)}>Buy</button>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>
        )
    }
}
export default PublicTicket;