import React, { Fragment, Component } from 'react';
import Sound from 'react-sound';
import './styles.css'
import VolumeIcon from '../../Assets/assets/images/volume.svg'
import ShuffleIcon from '../../Assets/assets/images/shuffle.svg'
import BackwardIcon from '../../Assets/assets/images/backward.svg'
import PlayIcon from '../../Assets/assets/images/play.svg'
import PauseIcon from '../../Assets/assets/images/pause.svg'
import ForwardIcon from '../../Assets/assets/images/forward.svg'
import RepeatIcon from '../../Assets/assets/images/repeat.svg'
import Slider from 'rc-slider';

class Player extends Component{
    constructor(props){
        super(props);
        this.state = {
            isPlaying: '',
            isMusicActive: '',
            play: Sound.status.PLAYING,
            repeat: false,
            shuffle: false
        }
        this.pause = this.pause.bind(this);
        this.play = this.play.bind(this);
        this.shuf = this.shuf.bind(this);
        this.shufActive = this.shufActive.bind(this);
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.repeat = this.repeat.bind(this);
        this.activePlaying = this.activePlaying.bind(this);
        this.handlePos = this.handlePos.bind(this);
        this.setPos = this.setPos.bind(this);
        this.setVol = this.setVol.bind(this);
    }

    pause(){
        this.setState({
            isPlaying: false,
            play: Sound.status.PLAYING,
        }); 
    }

    play(){
        this.setState({
            isPlaying: true,
            play: Sound.status.PAUSED,
        }); 
    }

    shufActive(){
        this.props.shuffle();
    }
        
    shuf(){
       if(this.state.shuffle){
            this.setState({
                shuffle: false,
            });
        } else { 
            this.setState({
                shuffle: true,
            });
            this.props.shuffle();
        }    
    }

    next(){
        if(this.state.shuffle){
           this.shufActive();
           return
        }
        this.props.nextsong();
        return
    }

    prev(){
        this.props.prevsong();
        return
    }

    repeat(){
        if(this.state.repeat){
            this.setState({
                repeat: false,
            });
        }else{
            this.setState({
                repeat: true,
            });
        }   
    }

    activePlaying(song){
        this.props.isStillPlaying(song);
        return
    }

    handlePos(percent){
        this.props.handlePosit(percent);
        return
    }

    setPos(percent){
        this.props.setPosit(percent);
        return
    }

    setVol(volume){
        this.props.volume(volume);
        return
    }

    render(){
    const { props } = this;  
    return (    
    <div className="Player">
    {props && <Sound id="songActive" url={props.song} playStatus={this.state.play} onPlaying={this.activePlaying} position={props.pBar} volume={props.volumeValue} loop={this.state.repeat} onFinishedPlaying={this.next} />}
        <div>
            {props && (
                <Fragment>
                <div className="current">
                    <img src={props.imageAlbum} alt={props.artistName}/>
                </div>
                <div className="currentTitle">
                    <span>{props.musicName}</span>
                    <small>{props.artistName}</small>
                </div>
                </Fragment> 
            )}
        </div>
        <div>    
            <div className="progressMusic">
                <div className="controlsMusic">
                {this.state.shuffle === true ? (
                    <button className="shuffle" onClick={() => this.shuf()}><img src={ShuffleIcon} alt="ShuffleIcon"/></button>
                    ) : (
                    <button onClick={() => this.shuf()}><img src={ShuffleIcon} alt="ShuffleIcon"/></button>
                )}
                    <button onClick={() => this.prev()}><img src={BackwardIcon} alt="BackwardIcon"/></button>
                        {this.state.isPlaying === props.play ? (
                            <Fragment>
                                <button onClick={this.pause}><img src={PlayIcon} alt="PlayIcon"/></button>
                            </Fragment>    
                        ) : (
                            <Fragment>
                                <button onClick={this.play}><img src={PauseIcon} alt="PauseIcon"/></button>
                            </Fragment>
                        )}
                    <button onClick={() => this.next()}><img src={ForwardIcon} alt="ForwardIcon"/></button>
                {this.state.repeat === true ? (
                    <button className="repeat" onClick={() => this.repeat()}><img src={RepeatIcon} alt="RepeatIcon"/></button>
                    ) : (
                    <button onClick={() => this.repeat()}><img src={RepeatIcon} alt="RepeatIcon"/></button>
                )}       
                </div>
            </div>
            <div className="timeMusic">
                <span>{props.positionShown || props.songPosition}</span>
                <div className="progressSlider">
                    <Slider railStyle={{ background: '#404040', borderRadius: 10 }}
                    trackStyle={{background: '#1ed760'}}
                    handleStyle={{border: 0}}
                    max={1000}
                    onChange={value => this.handlePos(value / 1000)}
                    onAfterChange={value => this.setPos(value / 1000)}
                    value={props.progres}
                    />
                </div>
                <span>{props.songDuration}</span>
            </div>
        </div>    
        <div className="volume">
            <img src={VolumeIcon} alt="volume"/>
            <Slider railStyle={{ background: '#404040', borderRadius: 10 }}
             trackStyle={{background: '#FFF'}}
             handleStyle={{display: 'none'}}
             value={props.volumeValue}
             onChange={this.setVol}
             />
        </div>
    </div>
    );
 }
}

export default Player;
