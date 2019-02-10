import { observable, action, reaction, computed } from 'mobx'
import cookie from 'react-cookies'

// import ReconnectComponent from '../components/Reconnect'

class CommonStore {
  @observable appName = 'Music Player'
  @observable token = cookie.load('token')
  @observable isOnline = true

  constructor() {
    reaction(
      () => this.token,
      token => {
        if (token) {
          const expires = new Date()
          expires.setDate(expires.getDate() + 90)
          cookie.save('token', token, { path: '/', expires })
        } else {
          cookie.remove('token', { path: '/' })
        }
      },
      { name: 'update token cookie' }
    )

    reaction(
      () => this.isOnline,
      () => this.handleConnectionChange(),
      { name: 'Show reconnect error if lost connection' }
    )

    this.listenToConnectionChanges()
  }

  @computed get isLoggedIn() {
    return !!this.token
  }

  @action.bound setToken(token) {
    this.token = token
  }

  @action.bound setAppLoaded() {
    this.appLoaded = true
  }

  handleConnectionChange() {
    if(this.isOnline) window.location.reload()
    // else errorStore && errorStore.displayError(<ReconnectComponent/>)
  }

  listenToConnectionChanges() {
    window.addEventListener('offline', this.setIsOnline)
    window.addEventListener('online', this.setIsOnline)
  }

  @action.bound setIsOnline(event) {
    this.isOnline = event.type === "online"
  }
}

export default new CommonStore()
