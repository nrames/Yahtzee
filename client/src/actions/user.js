import axios from 'axios';

export const login = (email, password, history) => {
  return (dispatch) => {
  axios.post('/auth/sign_in', { email, password })
    .then( res => {
      dispatch(loginUser(res.data.data, res.headers));
      history.push('/');
    })
  }
}

export const register = (email, password, password_confirmation, history) => {
  return (dispatch) => {
    axios.post('/auth', { email, password, password_confirmation })
      .then( res => {
        dispatch(loginUser(res.data.data, res.headers));
        history.push('/')
      })
  }
}

export const logout = (history) => {
  return (dispatch) => {
    axios.delete('/auth/sign_out')
      .then( res => {
        dispatch({ type: 'LOGOUT' })
        history.push('/login')
      });
  }
}

export const validateToken = (callBack = () => {}) => {
  return (dispatch) => {
    dispatch({ type: 'VALIDATE_TOKEN' })
    const headers = axios.defaults.headers.common;
    axios.get('/auth/validate_token', headers)
      .then( res => {
        dispatch(loginUser(res.data.data, res.headers));
      })
      .catch( () => callBack() );
  }
}

const loginUser = (user, headers) => {
  return { type: 'LOGIN', user, headers }
}