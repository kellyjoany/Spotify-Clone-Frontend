import React, { Component } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import service from '../../api/service';
import Loading from '../../components/Loading/Loading';
//import Player from '../../components/Player/Player'

class Browse extends Component{
  constructor(){
      super();
      this.state = {
          playlist: [],
          loading: true
      }
  }
  componentDidMount(){
      service.getAlbuns()
      .then((result) => {
          this.setState({
              playlist: result,
              loading: false
          })  
      })
      .catch((erro) => {
          throw new Error(erro);
      });
  }

  render(){
    return (
      <div className="contain">
          <div className="title">Navegar {this.state.loading && <Loading/>}</div>
          <div className="list">
            {this.state.playlist.map(e => (
              <div key={e._id}> 
              <Link to={`/playlist/${e._id}`}>
                <div className="playlistBrowser">
                  <img src={e.imageAlbum} alt={e.name} />
                  <strong>{e.name}</strong>
                  <p>{e.description}</p>
                </div>
              </Link>
              </div>
            ))}
          </div>
          {/*<Player /> */}
      </div>
    );
  }
}  

export default Browse;