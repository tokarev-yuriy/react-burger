import { TToken } from "../utils/types";

interface ITokenStorage {
  getToken: () => TToken|null;
  setToken: (token: TToken|null) => void;
  getRefreshToken: () => string;
  getAccessToken: () => string;
  clearToken: () => void;
}

interface ITokenStorageSingletone {
  getInstance: () => ITokenStorage;
}

/**
 * Token storage singleton
 * @returns 
 */
 export const tokenStorage: ITokenStorageSingletone = (function (): ITokenStorageSingletone {
    let instance: ITokenStorage;
  
    const getToken = (): TToken|null => {
        return localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token') as string) as TToken : null;
    }

    const setToken = (token: TToken|null): void => {
        localStorage.setItem('token', JSON.stringify(token));
    }

    const getRefreshToken = (): string => {
        const token = getToken();
        return token !== null ? token.refresh : '';
    }

    const getAccessToken = (): string => {
        const token = getToken();
        return token !== null ? token.access : '';
    }

    const clearToken = (): void => {
        return setToken(null);
    }
  
    const createInstance: () => ITokenStorage = () => {
      return {
        getToken: getToken,
        setToken: setToken,
        getRefreshToken: getRefreshToken,
        getAccessToken: getAccessToken,
        clearToken: clearToken,
      }
    }
  
    return {
      getInstance: function (): ITokenStorage {
        return instance || (instance = createInstance());
      }
    }
  })();