import { Middleware } from "redux";

export type TWsActions = {
    wsOpen: string,
    wsClose: string,
    onClose: () => any,
    onError: () => any,
    onMessage: (data: any) => any,
};

export const socketMiddleware = (wsUrl: string, wsActions: TWsActions): Middleware => {
    return store => {
      let socket: WebSocket | null = null;
  
      return next => action => {
        const { dispatch } = store;
        const { wsOpen, wsClose, onClose, onError, onMessage } = wsActions;
        if (wsOpen === action.type) {
          socket = new WebSocket(`${wsUrl}`);
        }
        if (wsClose === action.type) {
            socket?.close();
            dispatch(onClose());
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
            dispatch(onClose());
          };
        }
  
        next(action);
      };
    };
  };