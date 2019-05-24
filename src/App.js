import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import AuthService from './api/auth';
import './App.css';
import 'rc-slider/assets/index.css'
import Sidebar from './components/Sidebar/Sidebar'
import ConfirmEmail from './pages/ConfirmEmail/ConfirmEmail'
import Header from './components/Header/Header'
import Routes from './routes/routes'
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  constructor(props){
    super(props)
    this.state = { loggedInUser: null };
    this.auth = new AuthService();
  }

  fetchUser(){
    if( this.state.loggedInUser === null ){
      this.auth.loggedin()
      .then(response =>{
        this.setState({
          loggedInUser:  response
        })
      })
      .catch( err =>{
        this.setState({
          loggedInUser:  false
        })
      })
    }
  }

  getTheUser= (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  render() {
      if(this.state.loggedInUser){
        return (
        <BrowserRouter> 
          <div className="App">
            <div className="wrapper">
              <div className="conteiner">
                <Sidebar />
                <div className="content">
                  <Header userInSession={this.state.loggedInUser} getUser={this.getTheUser} />
                  <Routes userInSession={this.state.loggedInUser}/>
                </div>
              </div>
            </div>  
          </div>
        </BrowserRouter>
        );
      } else {
        return (
          <div className="App">
              <Switch>
                <Route exact path='/' render={() => <Login userInSession={this.state.loggedInUser} getUser={this.getTheUser} />} />
                <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser} /> } />
                <Route path="/spotify/confirm/:confirmationCode" render={(props) => <ConfirmEmail {...props} getUser={this.getTheUser} userInSession={this.state.loggedInUser} /> } />
              </Switch>
          </div>
        );
      }
  }
}

export default App;
