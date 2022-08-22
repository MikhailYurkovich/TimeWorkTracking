import {combineReducers} from 'redux';
import {settingsReducer} from './settings-reducer';
import {statsReducer} from './stats-reducer';
import {selectedDayReducer} from './selectedDay-reducer';
import {selectedMountReducer} from './selectedMount-reducer';
import {listMonthReducer} from './listMonth-reducer';

export const appReducer = combineReducers({
  settings: settingsReducer,
  stats: statsReducer,
  selectedDay: selectedDayReducer,
  selectedMount: selectedMountReducer,
  listMonth: listMonthReducer,
});

export const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined;
  }

  return appReducer(state, action);
};
