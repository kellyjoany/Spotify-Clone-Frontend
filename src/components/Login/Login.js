import React, { Component } from 'react';
import AuthService from '../../api/auth';
import './styles.css';
import { Link } from 'react-router-dom';
import SpotifyIcon from '../../Assets/assets/images/spotify_clone.png'


class Login extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: '' };
    this.auth = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    this.auth.login(username, password)
    .then( response => {
        this.setState({ username: "", password: "" });
        this.props.getUser(response)
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render(){
    return(
      <div className="login">
      <figure className="logo">
        <img src={SpotifyIcon} alt="spotify"/>
      </figure>
        <form onSubmit={this.handleFormSubmit}>
          <label className="label">Login:
            <input type="text" name="username" placeholder="login" value={this.state.username} onChange={ e => this.handleChange(e)}/>
          </label>
          <label className="label">Senha:
            <input type="password" name="password" placeholder="senha" value={this.state.password} onChange={ e => this.handleChange(e)} />
          </label>
          <button type="submit" value="Login">Login</button>
        </form>
        <p>Não tem uma conta?
            <Link to={"/signup"}>Cadastre-se</Link>
        </p>
      </div>
    )
  }
}

export default Login;