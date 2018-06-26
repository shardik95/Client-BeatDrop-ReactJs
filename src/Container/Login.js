import React from 'react';
import UserService from "../Services/UserService";
import Modal from 'react-modal';

class Login extends React.Component{

    constructor(props){
        super(props);
        this.state={
            userName:'',
            password:'',
            wrongLogin:true
        }
        this.loginUser=this.loginUser.bind(this);
        this.userService=UserService.instance;
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    loginUser(){

        let user={
            userName:this.state.userName,
            password:this.state.password
        }

        this.userService.loginUser(user)
            .then(response=> {
                var json=response.json()
                return json
            })
            .then(json=> {
                if (json.userName === 'CANNOT FIND')
                    this.openModal()
                else {
                    this.props.history.push("/home")
                }
            })

    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
        this.subtitle.style.color = '#fff';
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    render(){
        return(
            <div style={{textAlign:'center'}}>

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal" ariaHideApp={false}>

                    <h4 ref={subtitle => this.subtitle = subtitle} style={{textAlign:"center",marginLeft:"10px",marginRight:"10px"}}>Login/Password incorrect</h4>
                    <button onClick={this.closeModal} className="btn btn-outline-light">close</button>
                </Modal>

                <i className="fa fa-5x fa-music"style={{color:'#2C8AFF'}} />
                <br/>
                <h3>BeatDrop</h3>
                <br/>
                <div style={{marginRight:"10%",marginLeft:"10%"}}>

                    <div className="alert alert-danger" role="alert" hidden={this.state.wrongLogin}>
                       Email / Password incorrect
                    </div>

                    <form className="form-control">

                            <label>Username/Email</label>
                            <input type="text" className="form-control"
                                   placeholder="Enter Username / Email" onChange={(e)=>this.setState({userName:e.target.value})}/>
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Password"
                                   onChange={(e)=>this.setState({password:e.target.value})}/>
                            <br/>
                        <button type="button" className="btn btn-outline-dark" onClick={()=>this.loginUser()}>Login</button>
                    </form>
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

export default Login;