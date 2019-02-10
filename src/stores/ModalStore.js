import { observable, action } from 'mobx'

import Login from '../components/Login'

class ModalStore {

  @observable isVisible = false
  @observable activeComponent

  @action.bound showLogin() {
    this.activeComponent = Login
    this.isVisible = true
  }

  @action.bound setVisible(value = undefined) {
    this.isVisible = value === undefined || typeof value !== 'boolean' ? !this.isVisible : value
  }
}

export default new ModalStore()
