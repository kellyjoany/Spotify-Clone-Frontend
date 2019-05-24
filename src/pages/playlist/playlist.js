import React, { Component } from 'react';
import './styles.css';
import ClockIcon from '../../Assets/assets/images/clock.svg'
import PlusIcon from '../../Assets/assets/images/plus.svg'
import service from '../../api/service';
import Loading from '../../components/Loading/Loading';
import Player from '../../components/Player/Player'

class Playlist extends Component{
    constructor(props){
        super(props);
        this.state = {
            songslist: [],
            render: false,
            loading: true,
            id: this.props.match.params.id,
            selectedMusic: '',
            indexMusic: '',
            position: null,
            duration: null,
            durationWF: null,
            positionShow: null,
            positionBar: null,
            progress: null,
            musicName: '',
            volume: 100,
            playok: '' 
        };
        this.loadingSong = this.loadingSong.bind(this);
        this.nextmusic = this.nextmusic.bind(this);
        this.prevmusic = this.prevmusic.bind(this);
        this.shufflemusic = this.shufflemusic.bind(this);
        this.isPlaying = this.isPlaying.bind(this);
        this.msToTime = this.msToTime.bind(this);
        this.handlePosition = this.handlePosition.bind(this);
        this.setPosition = this.setPosition.bind(this);
        this.setVolume = this.setVolume.bind(this);
    }

    componentDidMount(){
        service.getMusics(this.props.match.params.id)
        .then((result) => {
            this.setState({
                songslist: [result],
                render: true,
                loading: false,
            })  
        })
        .catch((erro) => {
            throw new Error(erro);
        });
    }
    startListSong(){
      const startMusicList = this.state.songslist[0].musics[0];
      this.setState({
        selectedMusic: startMusicList.audioUrl,
        indexMusic: 0,
        musicName: startMusicList.name,
        playok: true
    });
    }

    shufflemusic(){
        let index = Math.floor(Math.random() * this.state.songslist[0].musics.length);
        let shuffledMusic = this.state.songslist[0].musics[index];
        this.setState({
            selectedMusic: shuffledMusic.audioUrl,
            indexMusic: index,
            musicName: shuffledMusic.name,
        });
    }

    nextmusic(){
        if(this.state.playok === ''){
          return
        }
        let i = parseInt(this.state.indexMusic);
        if (i !== this.state.songslist[0].musics.length - 1) {
            i += 1;
            const nextMusicList = this.state.songslist[0].musics[i];
            this.setState({
                selectedMusic: nextMusicList.audioUrl,
                indexMusic: i,
                musicName: nextMusicList.name,
            });
        } else {
            return
        }
    }

    prevmusic() {
        let i = parseInt(this.state.indexMusic);
        if(i > 0){
            i -= 1;
            const nextMusicList = this.state.songslist[0].musics[i];
            this.setState({
                selectedMusic: nextMusicList.audioUrl,
                indexMusic: i,
                musicName: nextMusicList.name,
            });
        } else {
            return
        }
    }

    loadingSong(e){
        let url = e.currentTarget.dataset.value;
        let index = e.currentTarget.getAttribute('data-key');
        index = parseInt(index);
        let musicName = e.currentTarget.childNodes[1].innerText;
        this.setState({
            selectedMusic: url,
            indexMusic: index,
            musicName: musicName,
            playok: true
        }); 
    }

    msToTime(duration){
        let seconds = parseInt((duration / 1000) % 60, 10);
        const minutes = parseInt(((duration / (1000 * 60)) % 60), 10);
        if(seconds < 10){
            seconds = `0${seconds}`;
        }
        
        return `${minutes}:${seconds}`;
    }

    isPlaying(song){
         this.setState({
            position: this.msToTime(song.position),
            duration: this.msToTime(song.duration),
            positionShow: this.msToTime(this.state.positionBar),
            durationWF: song.duration,
            progress: parseInt((this.state.positionBar|| song.position) * (1000 / song.duration ), 10,) || 0,
        });
    }

    handlePosition(percent){
         this.setState({
             positionBar: this.state.durationWF * percent,
         });
    }

    setPosition(percent){
        this.setState({
            position: this.msToTime(this.state.durationWF * percent),
            positionShow: null,
            positionBar: null,
        });
    }

    setVolume(volume){
        this.setState({
            volume: volume,
        });
    }
    
    render(){
      /*service.getMusics(this.props.match.params.id)
        .then((result) => {
            this.setState({
                songslist: [result],
                render: true,
                loading: false,
            })  
        })
        .catch((erro) => {
            throw new Error(erro);
        }); */

        if (this.state.render) {
            const artistName = this.state.songslist[0].artist.artistName;
            const nameAlbum = this.state.songslist[0].name;
            const imageAlbum = this.state.songslist[0].imageAlbum;
            const qtdMusics = this.state.songslist[0].musics.length;
            const arrSongs = this.state.songslist[0].musics;
            return (
                 <div className="conteinerListMusics">
                 {this.state.loading && <Loading/>}
                    <div className="headerListMusics">
                    <img src={imageAlbum} alt="playlist" />
                       <div>
                           <span>PLAYLIST</span>
                           <h1>{nameAlbum}</h1>
                           <p>{qtdMusics} músicas</p>
                           <button onClick={() => this.startListSong()}>Play</button>
                       </div>
                    </div>
                    <div className="songList">
                        <table>
                             <thead>
                                <tr> 
                                    <th/>
                                    <th>Título</th>
                                    <th>Artista</th>
                                    <th>Álbum</th>
                                    <th><img src={ClockIcon} alt="Duracao"/></th>
                                </tr> 
                             </thead>
                             <tbody>
                                 {arrSongs.map((e,i) => (
                                    this.state.indexMusic === i ? (
                                        <tr className="musicLoaded" key={i} data-key={i} data-value={e.audioUrl} onClick={(e) => this.loadingSong(e)} >
                                            <td><img src={PlusIcon} alt="Adicionar"/></td>
                                            <td>{e.name}</td>
                                            <td>{artistName}</td>
                                            <td>{nameAlbum}</td>
                                            <td>{e.duration}</td>
                                        </tr>      
                                        ) : (
                                        <tr key={i} data-key={i} data-value={e.audioUrl} onClick={(e) => this.loadingSong(e)} >
                                            <td><img src={PlusIcon} alt="Adicionar"/></td>
                                            <td>{e.name}</td>
                                            <td>{artistName}</td>
                                            <td>{nameAlbum}</td>
                                            <td>{e.duration}</td>
                                        </tr>           
                                    ) 
                                 ))}
                             </tbody>
                        </table>    
                    </div> 
                   <Player play={this.state.playok} shuffle={this.shufflemusic} volumeValue={this.state.volume} volume={this.setVolume} musicName={this.state.musicName} pBar={this.state.positionBar} progres={this.state.progress} positionShown={this.state.positionShown} handlePosit={this.handlePosition} setPosit={this.setPosition} isStillPlaying={this.isPlaying} songPosition={this.state.position} songDuration={this.state.duration} nextsong={this.nextmusic} prevsong={this.prevmusic} song={this.state.selectedMusic} imageAlbum={imageAlbum} artistName={artistName} />
                </div >  
             );
        } else {
            return null;
        }
    }
}    

export default Playlist;