import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import { rootReducer } from './combineReducer';

const middleWare = applyMiddleware(ReduxThunk, createLogger())(createStore);

export default middleWare(rootReducer);
