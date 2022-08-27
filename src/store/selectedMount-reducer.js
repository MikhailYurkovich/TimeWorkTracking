import moment from 'moment';

const selectedMountState = moment(new Date()).format('YYYY-MM-DD');

export const selectedMountReducer = (state = selectedMountState, action) => {
  switch (action.type) {
    case 'UPPDATE_SELECTED_MOUNT': {
      return (state = action.payload);
    }
    default:
      return state;
  }
};
