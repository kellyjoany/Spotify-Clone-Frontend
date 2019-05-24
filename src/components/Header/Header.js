import React, { Fragment, Component } from 'react';
import './styles.css';
import AuthService from '../../api/auth';
import { Link } from 'react-router-dom';

class Header extends Component {
    constructor(props){
      super(props);
      this.auth = new AuthService();
    }

    logoutUser = () =>{
        this.auth.logout()
        .then(() =>{
            this.setState({
               loggedInUser: null,
            })
            this.props.getUser(null);
        })
    }

    render(){
        return (
            <div className="header">
                <div className="search">
                {this.props.userInSession.role === 'Artist' ? (
                  <Fragment>
                    <button type="button"><Link to='/addAlbum'>Add álbum</Link></button>
                    <button type="button"><Link to='/addMusic'>Add música</Link></button>
                  </Fragment>
                    ) : (
                   <Fragment></Fragment>
                )}  
                </div>
                <div className="avatarUser">
                    <img src={this.props.userInSession.image} alt="avatar"/>
                    {this.props.userInSession.username}
                    <button className="logout" onClick={() => this.logoutUser()}><strong>logout</strong></button>
                </div>
            </div>
        );
    }
}

export default Header;