import React, { Fragment, Component } from 'react';
import service from '../../api/service';
import './styles.css';
import { Redirect } from 'react-router-dom';

class Createmusics extends Component {
  constructor(props){
    super(props);
    this.state = { name: '', duration: '', format: '', quality: '', audioUrl: '',redirect: false, albuns: '', albumId: ''};
  }

  componentDidMount(){
    service.searchAlbum(this.props.id)
    .then((result) => {
        this.setState({
            albuns: result.albums,
        })  
    })
    .catch((erro) => {
        throw new Error(erro);
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { name, duration, format, quality, audioUrl, albumId } = this.state;
    //const artistId  = this.props.id;

    service.createMusics(name, duration, format, quality, audioUrl, albumId)
    .then(response => {
        this.setState({
            name: "",
            duration: "",
            format: "",
            quality: "",
            audioUrl: "",
            albuns: '',
            albumId: '',
            redirect: true,
        });
        alert("Música criada com sucesso!!!");
    })
    .catch( error => console.log(error) )
  }

  handleFileUpload = e => {
    const uploadData = new FormData();
    uploadData.append("audioUrl", e.target.files[0]);
    
    service.handleUpload(uploadData)
    .then(response => {
       this.setState({ audioUrl: response.secure_url });
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
      <div className="addMusic">
        {this.handleRedirect()}
        <form onSubmit={this.handleFormSubmit}>
          {this.state.albuns !== '' ? (
            <Fragment>
              <label className="select">Álbum:
                <select name="albumId" value={this.state.albumId} onChange={ e => this.handleChange(e)}>
                  <option value="" disabled>Álbum</option>
                    {this.state.albuns.map((e,i) => (
                      <option key={i} value={e._id} defaultValue>{e.name}</option>
                    ))}
                </select>
              </label>
            </Fragment>
              ) : (
                <div>
                  <p>Não há álbuns cadastrados.</p>
                </div>
          )}                   
          <label className="nameMusic">nome:
            <input type="text" name="name" value={this.state.name} onChange={ e => this.handleChange(e)}/>
          </label>
          <label className="musicUpload">música:
            <input type="file" name="audioUrl" onChange={ e => this.handleFileUpload(e)} />
          </label>
          <label className="durationMusic">duração:
            <input type="text"  name="duration" value={this.state.duration} onChange={ e => this.handleChange(e)} />
          </label>
          <label className="formatoMusic">formato:
            <input type="text" name="format" value={this.state.format} onChange={ e => this.handleChange(e)} />
          </label>
          <label className="select">qualidade:
            <select name="quality" value={this.state.quality} onChange={ e => this.handleChange(e)}>
                <option value="" disabled>Qualidade do áudio</option>
                <option value="Great" defaultValue>Excelente</option>
                <option value="Good">Bom</option>
                <option value="Bad">Ruim</option> 
          </select>
          </label>
          <button type="submit" value="Create">Criar Música</button>
        </form>
      </div>
    )
  }
}

export default Createmusics;