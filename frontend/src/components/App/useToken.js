import { useState } from 'react';
import { checkUserByToken } from '../../services/auth';

export function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    try {
      const userToken = JSON.parse(tokenString);
      if (userToken === null || userToken === undefined) {
        return null;
      }
      return userToken;
    } catch (e) {
      return null;
    }
  };

  const saveToken = userToken => {
    if (userToken !== null && userToken !== undefined) {
      localStorage.setItem('token', JSON.stringify(userToken));
      setToken(userToken.token);
    }
  };

  const checkToken = () => {
    const tokenString = localStorage.getItem('token');
    return checkUserByToken({
        token: tokenString
      }).then( result => {
        const token = result;
        if (token.status === 200) {
          setValidToken(true);
        } else {
          setValidToken(false);
        }
      })
      .then(result => result);
  };

  const [token, setToken] = useState(getToken());
  const [validToken, setValidToken] = useState(false);

  return {
    setToken: saveToken,
    token,
    validToken,
    setValidToken: checkToken
  }
}
