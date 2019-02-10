import './styles/bundle.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'
import { Provider, onError } from 'mobx-react'
import { syncHistoryWithStore, RouterStore } from 'mobx-react-router'
import { configure } from 'mobx'

import App from './components/App'
import registerServiceWorker from './registerServiceWorker'

import AuthStore from './stores/AuthStore'
import CommonStore from './stores/CommonStore'
import ModalStore from './stores/ModalStore'
import PlaylistStore from './stores/PlaylistStore'
import MusicPlayerStore from './stores/MusicPlayerStore'

const browserHistory = createBrowserHistory()
const history = syncHistoryWithStore(browserHistory, new RouterStore())

let stores = {
  CommonStore: CommonStore,
  MusicPlayerStore: MusicPlayerStore,
  PlaylistStore: PlaylistStore,
  AuthStore: AuthStore,
  ModalStore: ModalStore
}

configure({
  enforceActions: 'observed',
})
// Global error handler
onError(error => console.log(error))

// For easier debugging
window._____APP_STATE_____ = stores

ReactDOM.render(
  <Provider {...stores}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
)

registerServiceWorker()
