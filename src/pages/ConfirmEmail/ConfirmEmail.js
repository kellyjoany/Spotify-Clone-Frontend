import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './styles.css';
import SpotifyIcon from '../../Assets/assets/images/spotify_logo.png'
import service from '../../api/service';

class ConfirmEmail extends Component {
    constructor(props){
      super(props);
      this.state = { redirect: false };
    }
    
    componentDidMount(){
      service.confirmationUser(this.props.match.params.confirmationCode)
      .then((response) => {
          this.setState({
              redirect: true,
          })
        console.log(response);  
        this.props.getUser(response)    
      })
      .catch((erro) => {
          throw new Error(erro);
      });
    }

    handleRedirect = () => {
      if(this.state.redirect){
        return <Redirect to="/"/>
      }
    }

    render(){
      return(
        <div className="confirm">
         {this.handleRedirect()}
          <figure className="logo">
            <img src={SpotifyIcon} alt="spotify"/>
          </figure>
        <h2>Ops, seu email não foi confirmado, realize novo cadastro<Link to="/signup">aqui</Link></h2>
        </div>
      )
    } 
}

export default ConfirmEmail;