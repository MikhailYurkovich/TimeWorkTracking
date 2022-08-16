import {insertListWork, updateWorkDay} from '../../database/allSchemas';
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

  const timeWorkNew = (timeWork / 60).toString();
  const result = timeWorkNew.split('.');
  const hours = result[0];
  let minutesRound;
  if (result[1]) {
    const minutes = Number(`0.${result[1]}`) * 60;
    minutesRound = Math.round(minutes * Math.pow(1, 1)) / Math.pow(1, 1);
  } else {
    minutesRound = 0;
  }

  const insertObj = {
    idMounth: idMounth,
    timeStart: new Date(obj.timeStart),
    timeEnd: new Date(obj.timeEnd),
    timeDinner: dinner,
    timeWork: timeWork,
    idDay: idDay,
    timeWorkObj: {
      hours: hours,
      minutes: minutesRound,
    },
    salarySettings: {
      tarifRate: obj.tarifRate,
    },
  };

  insertListWork(insertObj).then(record => {
    obj.queryMount(idMounth);
  });
};

export const updateDay = obj => {
  let dinner =
    moment(obj.timeDinner).hour() * 60 + moment(obj.timeDinner).minutes();

  //Вычетание даты
  let timeWork = obj.timeEnd - obj.timeStart;
  timeWork = timeWork / 1000 / 60;

  //Проверить, чтобы дата начала и окончания не были равны
  if (dinner >= timeWork) {
    dinner = 0;
  }
  //Вычесть обед
  timeWork = timeWork - dinner;

  const timeWorkNew = (timeWork / 60).toString();
  const result = timeWorkNew.split('.');
  const hours = result[0];
  let minutesRound;
  if (result[1]) {
    const minutes = Number(`0.${result[1]}`) * 60;
    minutesRound = Math.round(minutes * Math.pow(1, 1)) / Math.pow(1, 1);
  } else {
    minutesRound = 0;
  }

  let updateObj = {
    id: obj.workDay.id,
    timeStart: new Date(obj.timeStart),
    timeEnd: new Date(obj.timeEnd),
    timeDinner: dinner,
    timeWork: timeWork,
    timeWorkObj: {
      hours: hours,
      minutes: minutesRound,
    },
    salarySettings: {
      tarifRate: obj.tarifRate,
    },
  };

  updateWorkDay(updateObj).then(record => {
    obj.queryMount(obj.workDay.idMounth);
  });
};
