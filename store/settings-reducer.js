const set = {
  timeDinner: 60,
  timeEndHour: 17,
  timeEndMin: 0,
  timeStartHour: 8,
  timeStartMin: 0,
  countriesDinner: [0, 30, 60, 90],
};

export const settingsReducer = (state = set, action) => {
  switch (action.type) {
    case 'UPPDATE_SETTINGS': {
      return (state = action.payload);
    }

    default:
      return state;
  }
};
