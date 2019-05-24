import React, { Component } from 'react';
import service from '../../api/service';
import './styles.css';
import { Redirect } from 'react-router-dom';

class Createalbum extends Component {
  constructor(props){
    super(props);
    this.state = { name: '', imageAlbum: '', description: '',redirect: false };
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { name, imageAlbum, description } = this.state;
    const artistId  = this.props.id;

    service.createAlbum(name, imageAlbum, description, artistId)
    .then(response => {
        this.setState({
            name: "",
            imageAlbum: "",
            description: "",
            redirect: true,
        });
        alert("Álbum criado com sucesso!!!");
    })
    .catch( error => console.log(error) )
  }

  handleFileUpload = e => {
    const uploadData = new FormData();
    uploadData.append("imageAlbum", e.target.files[0]);
    
    service.handleUploadAlbum(uploadData)
    .then(response => {
       this.setState({ imageAlbum: response.secure_url });
      })
    .catch(err => {
      console.log("Error while uploading the file: ", err);
    });
  }

  handleRedirect = () => {
    if(this.state.redirect){
      return <Redirect to="/"/>
    }
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render(){
    return(
      <div className="addAlbum">
      {this.handleRedirect()}
        <form onSubmit={this.handleFormSubmit}>
          <label>nome:
            <input type="text" name="name" value={this.state.name} onChange={ e => this.handleChange(e)}/>
          </label>
          <label className="photo">Foto:
            <input type="file" name="imageAlbum" onChange={ e => this.handleFileUpload(e)} />
          </label>
          <label>descrição:</label>
            <textarea rows="5" cols="33" name="description" value={this.state.description} onChange={ e => this.handleChange(e)} />         
          <button type="submit" value="Create">Criar álbum</button>
        </form>

      </div>
    )
  }
}

export default Createalbum;