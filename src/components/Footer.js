import React, { Component } from 'react'
import { observer, inject } from 'mobx-react';

@inject('PlaylistStore', 'MusicPlayerStore')
@observer
export default class Footer extends Component {

  componentDidMount() {
    const { MusicPlayerStore } = this.props
    MusicPlayerStore.setAudioPlayer(document.getElementById("Audio-Player"))    
  }

  render() {
    const { PlaylistStore, MusicPlayerStore } = this.props
    const songURL = PlaylistStore.currentSong ? PlaylistStore.currentSong.file_url : ''
    return (
      <div className='footer py-8 text-center bg-indigo-darkest text-indigo' >
        <p className='py-4 underline' >LISTENING: {PlaylistStore.currentSong && PlaylistStore.currentSong.artist_title} </p>
        <audio id='Audio-Player'><source src={songURL} /></audio>
        { MusicPlayerStore.isMuted ? 
          <Button onClick={() => MusicPlayerStore.mute()} size='lg' iconClass='fa-volume-off' /> :
          <Button onClick={() => MusicPlayerStore.mute()} size='md' iconClass='fa-volume-up' />
        }
        <Button onClick={() => MusicPlayerStore.previousSong()} size='lg' iconClass='fa-backward' />
        { MusicPlayerStore.isPlaying ? 
          <Button onClick={() => MusicPlayerStore.pause()} size='2x' iconClass='fa-pause' /> :
          <Button onClick={() => MusicPlayerStore.play()} size='2x' iconClass='fa-play' />
        }
        <Button onClick={() => MusicPlayerStore.nextSong()} size='lg' iconClass='fa-forward' />
      </div>
    )
  }
}

class Button extends Component {
  render() {
    const { size, iconClass, onClick } = this.props
    const buttonClass = 'cursor-pointer align-middle fas mx-5 hover:text-indigo-lighter'
    return (
      <i onClick={onClick} className={`${buttonClass} fa-${size} ${iconClass}`} />
    )
  }
}