import { ActionTypes } from './constants';

const AplicationState = {
};

export const applicationReducer = (state = AplicationState, action) => {
  switch (action.type) {
    case ActionTypes.INITIAL_STATE: {
      return state
    }

    default: {
      return state;
    }
  }
};
