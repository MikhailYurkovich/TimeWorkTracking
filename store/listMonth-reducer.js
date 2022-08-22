export const listMonthReducer = (state = null, action) => {
  switch (action.type) {
    case 'UPPDATE_LIST_MONTH': {
      return (state = action.payload);
    }
    default:
      return state;
  }
};
