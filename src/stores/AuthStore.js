import { observable, action } from 'mobx'
import api from '../api'

import CommonStore from './CommonStore'

class AuthStore {
  @observable inProgress = false
  @observable errors = undefined

  @observable values = {
    id: 'user',
    password: 'user',
  }

  @action.bound setId(id) {
    this.values.id = id
  }

  @action.bound setPassword(password) {
    this.values.password = password
  }

  @action reset() {
    this.values.id = ''
    this.values.password = ''
  }

  @action.bound login() {
    this.inProgress = true
    this.errors = undefined
    return api.Auth.login(this.values.id, this.values.password)
      .then(CommonStore.setToken)
      .catch(
        action('login errors', err => {
          this.errors = err.message
        }),
      )
      .finally(
        action('login completed', () => {
          this.inProgress = false
        }),
      )
  }

  logout() {
    CommonStore.setToken(undefined)
    return Promise.resolve()
  }
}

export default new AuthStore()
