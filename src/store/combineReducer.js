import { combineReducers } from 'redux'

import { applicationReducer } from './reducer'

export const rootReducer = combineReducers({
  aplication: applicationReducer,
});
