import {insertListWork, updateWorkDay} from '../../database/allSchemas';
import moment from 'moment';

export const writeToDB = (timeStart, timeEnd, timeDinner, queryMount) => {
  const idMounth = Number(moment(timeStart).format('YYYYMM'));
  const idDay = Number(moment(timeStart).format('YYYYMMDD'));
  let dinner = moment(timeDinner).hour() * 60 + moment(timeDinner).minutes();

  //Вычетание даты
  let timeWork = timeEnd - timeStart;
  timeWork = timeWork / 1000 / 60;

  //Проверить, чтобы дата начала и окончания не были равны
  if (dinner >= timeWork) {
    dinner = 0;
  }

  //Вычесть обед
  timeWork = (timeWork - dinner) / 60;
  const insertObj = {
    idMounth: idMounth,
    timeStart: new Date(timeStart),
    timeEnd: new Date(timeEnd),
    timeDinner: dinner,
    timeWork: timeWork,
    idDay: idDay,
  };

  insertListWork(insertObj).then(record => {
    queryMount(idMounth);
  });
};

export const updateDay = (
  timeStart,
  timeEnd,
  timeDinner,
  queryMount,
  workDay,
) => {
  let dinner = moment(timeDinner).hour() * 60 + moment(timeDinner).minutes();

  //Вычетание даты
  let timeWork = timeEnd - timeStart;
  timeWork = timeWork / 1000 / 60;

  //Проверить, чтобы дата начала и окончания не были равны
  if (dinner >= timeWork) {
    dinner = 0;
  }
  //Вычесть обед
  timeWork = (timeWork - dinner) / 60;

  let updateObj = {
    id: workDay.id,
    timeStart: timeStart,
    timeEnd: timeEnd,
    timeDinner: dinner,
    timeWork: timeWork,
  };
  updateWorkDay(updateObj).then(record => {
    queryMount(workDay.idMounth);
  });
};
