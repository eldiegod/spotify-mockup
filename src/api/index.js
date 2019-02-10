import requests from './requests'

const loginMockup = async (id, password) => {
  const users = await import('./data/users.json')
  const user = users.find( user => (user.id === id && user.pass === password))
  if(user)
    return Promise.resolve({ token: '12313123lasdahsidhaushdhasdhashdhsdhasduasiudiuas' })

  return Promise.reject({message: 'Wrong username or password'})
}

const Auth = {
  login: (id, password) => loginMockup(id, password),
}

const Playlist = {
  getAll: () => Promise.resolve(import('./data/playlists.json')),
}

export default {
  Playlist,
  Auth
}
