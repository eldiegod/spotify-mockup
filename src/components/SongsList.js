import React, { Component } from 'react'
import { observer, inject } from 'mobx-react';

@inject('PlaylistStore')
@observer
export default class SongsList extends Component {
  render() {
    const { PlaylistStore } = this.props
    return (
      <div className='main px-16 md:px-32 py-16 text-indigo-lighter text-justify bg-indigo-darker overflow-y-scroll' >
        <h2 className='uppercase pb-8' >{PlaylistStore.currentPlaylist && PlaylistStore.currentPlaylist.id}</h2>
        { PlaylistStore.currentPlaylist && PlaylistStore.currentPlaylist.songs.map( ( song, index ) => <Song key={index} song={song} /> )}
      </div>
    )
  }
}

@inject('PlaylistStore')
@observer
class Song extends Component {
  render() {
    const { PlaylistStore } = this.props
    const { song } = this.props
    
    const activeStyles = PlaylistStore.currentSong && PlaylistStore.currentSong.artist_title === song.artist_title ? 'text-green-dark' : 'hover:text-indigo-lightest'
    
    const isFavClass = !PlaylistStore.favSongNames.find(favSong => favSong === song.artist_title) ? 'hover:text-yellow' : 'text-yellow hover:text-indigo-lighter'
    return (
      <div 
        className={`pt-4`}>
        <span
          className={`link pr-2 ${activeStyles}`}
          onClick={() => PlaylistStore.setCurrentSong(song)} 
        > 
          {song.artist_title} -
        </span>
        <i
          onClick={() => PlaylistStore.favSong(song)}
          className={`link ${isFavClass} fa fa-md fa-star`}
        />
      </div>
    )
  }
}
