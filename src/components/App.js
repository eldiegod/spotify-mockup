import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import DevTools from 'mobx-react-devtools'
import { observer, inject } from 'mobx-react';

import Footer from './Footer'
import Sidebar from './Sidebar'
import SongsList from './SongsList'
import Login from './Login'

@inject('CommonStore')
@observer
class App extends Component {
  render() {
    const { CommonStore } = this.props
    return (
      <div className="App h-screen lato">
        {/* <DevTools /> */}
        { CommonStore.isLoggedIn ?
          <SongsList /> :
          <Login/> 
        }
        <Sidebar />
        <Footer />
      </div>
    )
  }
}

export default hot(module)(App)
