const settingsState = {
  timeStart: {hours: 8, minutes: 0},
  timeEnd: {hours: 17, minutes: 0},
  timeDinner: 60,
  tarifRate: 0,
};

export const settingsReducer = (state = settingsState, action) => {
  switch (action.type) {
    case 'UPPDATE_SETTINGS': {
      return (state = action.payload);
    }

    default:
      return state;
  }
};
