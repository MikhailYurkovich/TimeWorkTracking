import {settingsState} from './state-reducer';

export const settingsReducer = (state = settingsState, action) => {
  switch (action.type) {
    case 'UPPDATE_SETTINGS': {
      return (state = action.payload);
    }

    default:
      return state;
  }
};
