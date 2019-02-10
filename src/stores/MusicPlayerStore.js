import { observable, action, reaction } from 'mobx'

import PlaylistStore from './PlaylistStore'

class MusicPlayerStore {
  @observable inProgress = false
  @observable errors = undefined

  @observable audioPlayer
  @observable isPlaying = false
  @observable isMuted = false

  constructor() {
    reaction(
      () => PlaylistStore.currentSong,
      () => { 
        if(this.audioPlayer) {
          this.audioPlayer.load()
          this.play() 
        }
      },
      { name: 'play song on change'}
    )
  }

  @action.bound mute() {
    this.audioPlayer.muted = !this.audioPlayer.muted
    this.isMuted = this.audioPlayer.muted
  }

  @action.bound play() {
    this.audioPlayer.play()
    this.isPlaying = true
  }

  @action.bound pause() {
    this.audioPlayer.pause()
    this.isPlaying = false    
  }

  @action.bound nextSong() {
    if(PlaylistStore.currentSong === undefined) return
    const playlist = PlaylistStore.playlists.find(playlist => playlist.id === PlaylistStore.currentSong.user_id)
    let index = playlist.songs.indexOf(PlaylistStore.currentSong)
    index += index+1 < playlist.songs.length ? 1 : 0
    PlaylistStore.setCurrentSong(playlist.songs[index])
  }

  @action.bound previousSong() {
    if(PlaylistStore.currentSong === undefined) return
    const playlist = PlaylistStore.playlists.find(playlist => playlist.id === PlaylistStore.currentSong.user_id)
    let index = playlist.songs.indexOf(PlaylistStore.currentSong)
    index -= index > 0 ? 1 : 0
    PlaylistStore.setCurrentSong(playlist.songs[index])
  }

  @action.bound setAudioPlayer(audioPlayer) {
    this.audioPlayer = audioPlayer
  }
}

export default new MusicPlayerStore()
