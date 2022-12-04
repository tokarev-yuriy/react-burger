/**
 * Token storage singleton
 * @returns 
 */
 export const tokenStorage = (function () {
    var instance;
  
    const getToken = () => {
        return localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null;
    }

    const setToken = (token) => {
        localStorage.setItem('token', JSON.stringify(token));
    }
  
    const createInstance = () => {
      console.log('createInstance');
      return {
        getToken: getToken,
        setToken: setToken
      }
    }
  
    return {
      getInstance: function () {
        return instance || (instance = createInstance());
      }
    }
  })();