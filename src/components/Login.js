import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

const passEventValueTo = func => e => func(e.target.value)

@inject('AuthStore')
@observer
export default class Login extends Component {
  render() {
    const { AuthStore } = this.props

    const inputFieldClass = 'my-1 px-3 py-3 w-4/5 text-blue border border-blue-lighter rounded gotham text-sm'
    return (
      <div className="main py-32 bg-indigo-lightest text-pretty-dark-blue">
        <div className="m-auto w-3/5 lg:w-2/5">
          <p className="mb-4 text-xl font-black">Login</p>
          <div>Try with "user"</div>
          <input
            className={inputFieldClass}
            type="text"
            placeholder="username"
            value={AuthStore.id}
            onChange={passEventValueTo(AuthStore.setId)}
          />
          <div>Try with "user"</div>
          <input
            className={inputFieldClass}
            type="Password"
            placeholder="password"
            value={AuthStore.password}
            onChange={passEventValueTo(AuthStore.setPassword)}
          />
          <div
            className="mt-4 cursor-pointer py-2 mb-8 lg:mb-0 text-white w-3/5 rounded bg-pretty-dark-blue text-center"
            onClick={AuthStore.login}
          >
            login
          </div>
        </div>
        <div className="clearfix" />
      </div>
    )
  }
}
