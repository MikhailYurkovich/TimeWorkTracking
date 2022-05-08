import {combineReducers} from 'redux';
import {settingsReducer} from './settings-reducer';
import {statsReducer} from './stats-reducer';

export const rootReducer = combineReducers({
  settings: settingsReducer,
  stats: statsReducer,
});
