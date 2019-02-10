import React, { Component } from 'react'
import { observer, inject } from 'mobx-react';

@inject('PlaylistStore', 'CommonStore', 'AuthStore')
@observer
export default class Playlists extends Component {
  render() {
    const { PlaylistStore, CommonStore, AuthStore } = this.props
    return (
      <div className='sidebar p-8 pt-32 text-justify text-indigo-lighter text-center bg-indigo-darkest' >
        { CommonStore.isLoggedIn && 
          <div className='pb-8 link hover:text-indigo-lightest' onClick={AuthStore.logout}>LOGOUT</div>
        }
        <p>PLAYLISTS</p>
        { !PlaylistStore.inProgress && PlaylistStore.playlists.map( ( playlist, index ) => <Playlist key={playlist.id} id={playlist.id}></Playlist> )}
      </div>
    )
  }
}

@inject('PlaylistStore')
@observer
class Playlist extends Component {
  render() {
    const { id, PlaylistStore } = this.props
    const activeStyles = PlaylistStore.currentPlaylist && id === PlaylistStore.currentPlaylist.id ? 'text-green-dark' : 'hover:text-indigo-lightest'
    return (
      <div 
        onClick={() => PlaylistStore.setcurrentPlaylist(id)}
        className={`link pt-4 ${activeStyles}`}>
        {id}
      </div>
    )
  }
}
