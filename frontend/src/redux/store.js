import { createStore, applyMiddleware } from 'redux';
import { attemptReducer } from './reducer';

const thunkMiddleware = require('redux-thunk').default;

export const store = createStore(attemptReducer, applyMiddleware(thunkMiddleware));
