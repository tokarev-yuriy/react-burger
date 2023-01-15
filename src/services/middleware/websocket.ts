import { Middleware } from "redux";
import { tokenStorage } from "../token-storage";

export type TWsActions = {
    wsOpen: string,
    wsClose: string,
    onError: () => any,
    onMessage: (data: any) => any,
};

export const socketMiddleware = (wsUrl: string, wsActions: TWsActions, withToken: boolean = false): Middleware => {
    return store => {
      let socket: WebSocket | null = null;
  
      return next => action => {
        const { dispatch } = store;
        const { wsOpen, wsClose, onError, onMessage } = wsActions;
        if (wsOpen === action.type) {
          if (withToken) {
            const accessToken = tokenStorage.getInstance().getAccessToken().replace('Bearer ','');
            socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
          } else {
            socket = new WebSocket(`${wsUrl}`);
          }
        }
        if (wsClose === action.type) {
          if (socket && socket.readyState === WebSocket.OPEN) {
            socket.close();
          }
        }
        if (socket) {
          socket.onerror = event => {
            dispatch(onError());
          };
  
          socket.onmessage = event => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            const { success } = parsedData;
            if (success) {
                try {
                    dispatch(onMessage(parsedData));
                } catch(e) {
                    dispatch(onError());
                }
            } else {
                dispatch(onError());
            }
          };
  
          socket.onclose = event => {
            dispatch(onError());
          };
        }
  
        next(action);
      };
    };
  };