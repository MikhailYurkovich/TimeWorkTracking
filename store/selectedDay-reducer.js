import moment from 'moment';

const selectedDayState = moment(new Date()).format('YYYY-MM-DD');

export const selectedDayReducer = (state = selectedDayState, action) => {
  switch (action.type) {
    case 'UPPDATE_SELECTED_DAY': {
      return (state = action.payload);
    }
    default:
      return state;
  }
};
