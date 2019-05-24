import React, { Component } from 'react';
import './styles.css'
import AddPlaylistIcon from '../../Assets/assets/images/add_playlist.svg'
import service from '../../api/service';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { slide as Menu } from 'react-burger-menu';

class Sidebar extends Component{
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
          <section>
              <div className="menu-mobile">
                <Menu>
                    <div className="sidebar">
                        <div className="nav">
                        <ul>
                            <li><strong><Link to="/">Navegar</Link></strong></li>
                            <li><strong><a href="#">Radio</a></strong></li>
                        </ul>
                        </div>
                        <div className="nav">
                        <ul>
                            <li><span>sua biblioteca</span></li>    
                            <li><a href="#">Seu Daily Mix</a></li>
                            <li><a href="#">Tocados Recentemente</a></li>
                        </ul>
                        </div>
                        <div className="nav">
                        <ul>     
                            <li><a href="#">Músicas</a></li>
                            <li><a href="#">Albúm</a></li>
                            <li><a href="#">Artistas</a></li>
                            <li><a href="#">Estações</a></li>
                            <li><a href="#">Arquivos locais</a></li>
                            <li><a href="#">Vídeos</a></li>
                            <li><a href="#">Podcasts</a></li>
                        </ul> 
                        </div>
                        <div className="nav">
                        <ul>
                            <li>
                                <span>playlists</span>
                                {this.state.loading && <Loading/>}
                            </li>
                            {this.state.playlist.map(e => (
                            <li key={e._id}><Link to={`/playlist/${e._id}`}>{e.name}</Link></li> 
                            ))}
                        </ul>
                        </div>
                        <div className="playlist">
                            <button><img src={AddPlaylistIcon} alt="playlist"/></button>
                            Nova playlist
                        </div>
                    </div>
                </Menu>
              </div>
            <div className="menu-desktop">
                <div className="sidebar">
                    <div className="nav">
                    <ul>
                        <li><strong><Link to="/">Navegar</Link></strong></li>
                        <li><strong><a href="#">Radio</a></strong></li>
                    </ul>
                    </div>
                    <div className="nav">
                    <ul>
                        <li><span>sua biblioteca</span></li>    
                        <li><a href="#">Seu Daily Mix</a></li>
                        <li><a href="#">Tocados Recentemente</a></li>
                    </ul>
                    </div>
                    <div className="nav">
                    <ul>     
                        <li><a href="#">Músicas</a></li>
                        <li><a href="#">Albúm</a></li>
                        <li><a href="#">Artistas</a></li>
                        <li><a href="#">Estações</a></li>
                        <li><a href="#">Arquivos locais</a></li>
                        <li><a href="#">Vídeos</a></li>
                        <li><a href="#">Podcasts</a></li>
                    </ul> 
                    </div>
                    <div className="nav">
                    <ul>
                        <li>
                            <span>playlists</span>
                            {this.state.loading && <Loading/>}
                        </li>
                        {this.state.playlist.map(e => (
                        <li key={e._id}><Link to={`/playlist/${e._id}`}>{e.name}</Link></li> 
                        ))}
                    </ul>
                    </div>
                    <div className="playlist">
                        <button><img src={AddPlaylistIcon} alt="playlist"/></button>
                        Nova playlist
                    </div>
                </div>
            </div>  
          </section>  
        );
    }
}

export default Sidebar;