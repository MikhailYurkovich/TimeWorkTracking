import {insertListWork} from '../../database/allSchemas';
import moment from 'moment';

export const writeToDB = obj => {
  const idMounth = Number(moment(obj.timeStart).format('YYYYMM'));
  const idDay = Number(moment(obj.timeStart).format('YYYYMMDD'));
  let dinner =
    moment(obj.timeDinner).hour() * 60 + moment(obj.timeDinner).minutes();

  //Вычетание даты
  let timeWork = obj.timeEnd - obj.timeStart;
  timeWork = timeWork / 1000 / 60;

  if (dinner >= timeWork) {
    dinner = 0;
  }

  //Вычесть обед
  timeWork = timeWork - dinner;

  const insertObj = {
    idDay: idDay,
    idMounth: idMounth,
    timeStart: new Date(obj.timeStart),
    timeEnd: new Date(obj.timeEnd),
    timeDinner: dinner,
    timeWork: timeWork,
    salarySettings: {
      tarifRate: obj.tarifRate,
    },
    dispatch: obj.dispatch,
  };

  insertListWork(insertObj);
};
