import React from 'react';
import UserService from "../Services/UserService";
import TicketService from "../Services/TIcketService";
import Modal from 'react-modal';

class PublicTicket extends React.Component{

    constructor(props){
        super(props);
        this.state={
            profileUserId:'',
            user:'',
            userId:'',
            session:false,
            profileUser:'',
            tickets:'',
            modalIsOpen1: false,
            modalIsOpen2: false

        }
        this.userService=UserService.instance;
        this.ticketService=TicketService.instance;
        this.buy=this.buy.bind(this);
        this.openModal1 = this.openModal1.bind(this);
        this.openModal2 = this.openModal2.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount(){
        let profileUserId=this.props.match.params.userId;

        this.setState({profileUserId:profileUserId});

        this.userService.getSession()
            .then(json=> {
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

        this.userService.getSession()
            .then(json=> {
                if (json.userName !== 'CANNOT FIND'){
                    this.setState({user:json,session:true,userId:json.id})
                }
        })
        this.userService.findUserById(profileUserId)
            .then(user=>this.setState({profileUser:user}))
            .then(()=>this.ticketService.getTickets(this.state.profileUser.id))
            .then(tickets=>this.setState({tickets:tickets}))

    }

    openModal1() {
        this.setState({modalIsOpen1: true});
    }

    openModal2() {
        this.setState({modalIsOpen2: true});
    }

    afterOpenModal() {
        this.subtitle.style.color = '#fff';
    }

    closeModal() {
        this.setState({modalIsOpen1: false,modalIsOpen2:false});
    }

    buy(ticket,id){

        if(this.state.session===true){
            ticket.availTickets=''+(parseInt(ticket.availTickets)-1);

            this.ticketService.updateEvent(ticket,id)
                .then(()=>this.ticketService.getTickets(this.state.profileUser.id))
                .then(tickets=>this.setState({tickets:tickets}))
            this.openModal1();
        }
        else{
            this.openModal2();
        }

    }

    render(){
        return(
            <div style={{marginTop:"2%"}}>

                <Modal
                    isOpen={this.state.modalIsOpen1}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal" ariaHideApp={false}>

                    <h4 ref={subtitle => this.subtitle = subtitle} style={{textAlign:"center",marginLeft:"10px",marginRight:"10px"}}>Ticket Bought!</h4>
                    <button onClick={this.closeModal} className="btn btn-outline-light">close</button>
                </Modal>

                <Modal
                    isOpen={this.state.modalIsOpen2}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal" ariaHideApp={false}>

                    <h4 ref={subtitle => this.subtitle = subtitle} style={{textAlign:"center",marginLeft:"10px",marginRight:"10px"}}>Please Login</h4>
                    <button onClick={this.closeModal} className="btn btn-outline-light">close</button>
                </Modal>


                <div className="row">
                    {this.state.tickets!=='' && this.state.tickets.map((ticket,index)=>(
                        <div className="card col-4" style={{width:" 18em",marginRight:"10px",marginLeft:"10px"}} key={index}>
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

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        background:'#363636',
        borderRadius:'10px'
    }
};
export default PublicTicket;