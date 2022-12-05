/**
 * Token storage singleton
 * @returns 
 */
 export const tokenStorage = (function () {
    let instance;
  
    const getToken = () => {
        return localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null;
    }

    const setToken = (token) => {
        localStorage.setItem('token', JSON.stringify(token));
    }

    const getRefreshToken = () => {
        return getToken() ? getToken().refresh : '';
    }

    const getAccessToken = () => {
        return getToken() ? getToken().access : '';
    }

    const clearToken = () => {
        return setToken(null);
    }
  
    const createInstance = () => {
      return {
        getToken: getToken,
        setToken: setToken,
        getRefreshToken: getRefreshToken,
        getAccessToken: getAccessToken,
        clearToken: clearToken,
      }
    }
  
    return {
      getInstance: function () {
        return instance || (instance = createInstance());
      }
    }
  })();