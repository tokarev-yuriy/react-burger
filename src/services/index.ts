import { compose, createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers';
import thunk from 'redux-thunk';
import { socketMiddleware, TWsActions } from './middleware/websocket';
import { ACTION_FEED_CLOSE, ACTION_FEED_OPEN, getFeedFailedAction, getFeedSuccessAction } from './actions/feed';


declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const wsFeedUrl = "wss://norma.nomoreparties.space/orders/all";
const wsFeedActions: TWsActions = {
    wsOpen: ACTION_FEED_OPEN,
    wsClose: ACTION_FEED_CLOSE,
    onClose: getFeedFailedAction,
    onError: getFeedFailedAction,
    onMessage: getFeedSuccessAction
};

const enhancer = composeEnhancers(
    applyMiddleware(thunk),
    applyMiddleware(socketMiddleware(wsFeedUrl, wsFeedActions))
);

export const store = createStore(rootReducer, enhancer);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch