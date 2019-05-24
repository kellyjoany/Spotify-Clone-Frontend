import React, { Component } from 'react';
import AuthService from '../../api/auth';
import { Link, Redirect } from 'react-router-dom';
import './styles.css';
import SpotifyIcon from '../../Assets/assets/images/spotify_clone.png'

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: '', artistName: '', email: '', image: '', albums: '', role: 'User', redirect: false };
    this.auth = new AuthService();
  }

  handleRedirect = () => {
    if(this.state.redirect){
      return <Redirect to="/"/>
    }
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const artistName = this.state.artistName;
    const email = this.state.email;
    const image = this.state.image;
    const albums = this.state.albums;
    const role = this.state.role;

    this.auth.signup(username, password, artistName, email, image, albums, role )
    .then(response => {
        this.setState({
            username: "",
            password: "",
            artistName: "",
            email: "",
            image: "",
            albums: "",
            role: "User",
            redirect: true,
        });
        alert("Usuário criado com sucesso. Para logar confirme seu email!");
    })
    .catch( error => console.log(error) )
  }

  handleFileUpload = e => {
    e.preventDefault();

    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);

    this.auth.handleUpload(uploadData)
    .then(response => {
       this.setState({ image: response.secure_url });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value}) ;
    
  }
  render(){
     return(
      <div className="signup">
      {this.handleRedirect()}
      <figure className="logo">
        <img src={SpotifyIcon} alt="spotify"/>
      </figure>  
        <form onSubmit={this.handleFormSubmit}>
          <label className="loginName">Login:
              <input type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>
          </label>
          <label className="password">Senha:
              <input type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
          </label>
          <span className="passwordMessage">*Senha deve conter mais que 7 caracteres.</span>
          <label className="artistName">Nome:
              <input type="text"  name="artistName" value={this.state.artistName} onChange={ e => this.handleChange(e)} />
          </label>
          <label className="email">Email:
              <input type="text" name="email" value={this.state.email} onChange={ e => this.handleChange(e)} />
          </label>
          <label className="photo">Foto:
              <input type="file" name="image" onChange={ e => this.handleFileUpload(e)} />
          </label> 
          <label className="select">Você é:
            <select name="role" value={this.state.role} onChange={ e => this.handleChange(e)}>
                <option value="" disabled>Selecione uma opção</option>
                <option value="User" defaultValue>Usuário</option>
                <option value="Artist">Artista</option>
                
            </select>
          </label>
          <button type="submit" value="Signup">Cadastrar</button>
        </form>

        <p>Já tem uma conta?
            <Link to={"/"}> Login</Link>
        </p>

      </div>
    )
  }
}

export default Signup;