import { observable, action, runInAction } from 'mobx'
import api from '../api/index'

import localforage from 'localforage'

class PlaylistStore {
  @observable inProgress = false
  @observable errors = undefined

  @observable playlists
  @observable currentPlaylist
  @observable currentSong
  @observable favSongNames = []

  constructor() {
    this.fetchPlaylists()

    localforage.getItem('favSongs')
      .then(action(res =>  this.favSongNames = res || []))
  }

  @action.bound setcurrentPlaylist(playlistID) {
    this.currentPlaylist = this.playlists
      .find(playlist => playlist.id === playlistID)
      
    this.sortPlaylist()
  }

  @action.bound sortPlaylist() {
    this.currentPlaylist.songs = this.currentPlaylist.songs.slice().sort((songA, songB) => this.favSongNames.find( favSong => favSong === songA.artist_title ) ? -1 : 1)
  } 

  @action.bound setCurrentSong(song) {
    this.currentSong = song
  }

  @action.bound fetchPlaylists() {
    this.inProgress = true
    this.errors = undefined
    return api.Playlist.getAll()
      .then(action('fetch playlists ids', res => {
        this.playlists = res.playlists
      }))
      .catch(action('fetching playlists ids errored', err => {
        this.errors = 'fetching playlists ids errored'
      }))
      .finally(action('fetch playlists ids completed', () => { this.inProgress = false }))
  }

  @action.bound favSong(song) {
    if(this.favSongNames.find(favSongName => favSongName === song.artist_title))
      this.favSongNames.remove(song.artist_title)
    else
      this.favSongNames.push(song.artist_title)
    this.sortPlaylist()

    localforage.setItem('favSongs', this.favSongNames.slice())
  }
}

export default new PlaylistStore()
