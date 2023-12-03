import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import jwtServiceConfig from 'src/configs/jwtServiceConfig';
import AppUtils from 'src/utilities/AppUtils';

/* eslint-disable camelcase */

class JwtService extends AppUtils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
            // if you ever get an unauthorized response, logout the user
            this.emit('onAutoLogout', 'Invalid access_token');
            this.setSession(null);
          }
          throw err;
        });
      },
    );
  };

  handleAuthentication = () => {
    const access_token = this.getAccessToken();

    if (!access_token) {
      this.emit('onNoAccessToken');

      return;
    }

    if (this.isAuthTokenValid(access_token)) {
      this.setSession(access_token);
      this.emit('onAutoLogin', true);
    } else {
      this.setSession(null);
      this.emit('onAutoLogout', 'access_token expired');
    }
  };

  createUser = (user, queryParams = new URLSearchParams()) => {
    return new Promise((resolve, reject) => {
      axios.post(`${jwtServiceConfig.signUp}?${queryParams}`, user).then((response) => {
        if (response.data.user) {
          this.setSession(response.data.token);
          resolve(response.data.user);
          this.emit('onLogin', response.data.user);
        } else {
          reject(response.data.error);
        }
      });
    });
  };

  signInWithEmailAndPassword = (email, password, remember = true) => {
    return new Promise((resolve, reject) => {
      axios
        .post(jwtServiceConfig.signIn, {
          email,
          password,
        })
        .then((response) => {
          if (response.data.user) {
            this.setSession(response.data.token, remember);
            resolve(response.data.user);
            this.emit('onLogin', response.data.user);
          } else {
            reject(response.data.error);
          }
        });
    });
  };

  signInWithToken = () => {
    return new Promise((resolve, reject) => {
      this.getMe()
        .then((response) => {
          if (response.data) {
            this.setSession(this.getAccessToken());
            resolve(response.data);
          } else {
            this.logout();
            reject(new Error('Failed to login with token.'));
          }
        })
        .catch((error) => {
          this.logout();
          reject(new Error('Failed to login with token.'));
        });
    });
  };

  getMe = () => {
    return axios.get(jwtServiceConfig.getMe);
  };

  setSession = (access_token, remember = true) => {
    const storage = remember ? localStorage : sessionStorage;
    if (access_token) {
      storage.setItem('jwt_access_token', access_token);
      axios.defaults.headers.common['X-JWT-Assertion'] = access_token;
    } else {
      localStorage.removeItem('jwt_access_token');
      sessionStorage.removeItem('jwt_access_token');
      delete axios.defaults.headers.common['X-JWT-Assertion'];
    }
  };

  logout = () => {
    this.setSession(null);
    this.emit('onLogout', 'Logged out');
  };

  isAuthTokenValid = (access_token) => {
    if (!access_token) {
      return false;
    }
    const decoded = jwtDecode(access_token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn('access token expired');
      return false;
    }

    return true;
  };

  getAccessToken = () => {
    return window.localStorage.getItem('jwt_access_token');
  };
}

const instance = new JwtService();

export default instance;
