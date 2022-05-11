import {statsState} from './state-reducer';

export const statsReducer = (state = statsState, action) => {
  switch (action.type) {
    case 'UPPDATE_TARIFFRATE': {
      return {...state, tariffRate: action.payload.value};
    }
    case 'UPPDATE_PREMIUM': {
      return {...state, premium: action.payload.value};
    }
    case 'UPPDATE_PROFMASTER': {
      return {...state, profMaster: action.payload.value};
    }
    case 'UPPDATE_WORKEXPERIENS': {
      return {...state, workExperiens: action.payload.value};
    }
    case 'UPPDATE_PREPAID': {
      return {...state, prepaid: action.payload.value};
    }
    case 'UPPDATE_INCOMETAX': {
      return {...state, incomeTax: action.payload.value};
    }
    case 'UPPDATE_PENSIONFUND': {
      return {...state, pensionFund: action.payload.value};
    }
    case 'UPPDATE_UNIONDUES': {
      return {...state, unionDues: action.payload.value};
    }

    default:
      return state;
  }
};
