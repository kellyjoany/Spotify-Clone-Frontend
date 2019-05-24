import axios from 'axios';

class AuthService {
  constructor() {
    let auth = axios.create({
      baseURL: 'http://192.168.0.24:5000/api',
      withCredentials: true
    });
    this.auth = auth;
  }
  
  handleUpload = (theFile) => {
    return this.auth.post('/user/upload', theFile)
    .then(res => res.data)
  }

  signup = (username, password, artistName, email, image, albums, role) => {
    return this.auth.post('/signup', {username, password, artistName, email, image, albums, role})
    .then(response => response.data)
  }

  loggedin = () => {
    return this.auth.get('/loggedin')
    .then(response => response.data)
  }

  login = (username, password) => {
    return this.auth.post('/login', {username, password})
    .then(response => response.data)
  }

  logout = () => {
    return this.auth.get('/logout', {})
    .then(response => response.data)
  }

}

export default AuthService;