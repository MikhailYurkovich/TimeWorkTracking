import Realm from 'realm';
import {CalculateState} from '../pages/scripts/calculateState';

export const ListWork = {
  name: 'ListWork',
  properties: {
    id: 'int',
    idMounth: 'int',
    timeStart: 'date',
    timeEnd: 'date',
    timeDinner: 'int',
    timeWork: 'int',
    salarySettings: '{}',
    note: 'string',
  },
  primaryKey: 'id',
};

export const Mounth = {
  name: 'Mounth',
  properties: {
    id: 'int',
    listWorks: {type: 'list', objectType: 'ListWork'},
  },
  primaryKey: 'id',
};

export const Settings = {
  name: 'Settings',
  properties: {
    id: 'int',
    timeStart: '{}',
    timeEnd: '{}',
    timeDinner: 'int',
    tarifRate: 'double',
  },
  primaryKey: 'id',
};

const dataBaseOptions = {
  path: 'TimeReal', //TimeReal
  schema: [Mounth, ListWork, Settings],
  schemaVersion: 4, //3
};

export const updateSettings = (dispatch, insertObjSettings) => {
  return Realm.open(dataBaseOptions).then(realm => {
    realm.write(() => {
      const settings = realm.create(
        'Settings',
        {
          id: 1,
          timeStart: insertObjSettings.timeStart,
          timeEnd: insertObjSettings.timeEnd,
          timeDinner: insertObjSettings.timeDinner,
          tarifRate: insertObjSettings.tarifRate,
        },
        'modified',
      );

      dispatch({
        type: 'UPPDATE_SETTINGS',
        payload: settings,
      });
    });
  });
};
export const querySettings = dispatch => {
  return Realm.open(dataBaseOptions).then(realm => {
    realm.write(() => {
      const settings = realm.objectForPrimaryKey('Settings', 1);

      if (settings) {
        dispatch({
          type: 'UPPDATE_SETTINGS',
          payload: settings,
        });
      }
    });
  });
};
export const insertListWork = insertObj =>
  Realm.open(dataBaseOptions).then(realm => {
    realm.write(() => {
      realm.create(
        'Mounth',
        {
          id: insertObj.idMounth,
        },
        'modified',
      );
      const ListWork = realm.create(
        'ListWork',
        {
          id: insertObj.idDay,
          idMounth: insertObj.idMounth,
          timeStart: insertObj.timeStart,
          timeEnd: insertObj.timeEnd,
          timeDinner: insertObj.timeDinner,
          timeWork: insertObj.timeWork,
          salarySettings: insertObj.salarySettings,
          note: insertObj.note,
        },
        'modified',
      );

      const Mounth = realm
        .objects('Mounth')
        .filtered(`id = ${insertObj.idMounth}`);

      const List = realm
        .objects('ListWork')
        .filtered(`idMounth = ${insertObj.idMounth}`)
        .sorted('id');

      Mounth.forEach(Mounth => {
        Mounth.listWorks = List;
        const fullTimeFullSalary = new CalculateState(Mounth);
        Mounth['fullTimeFullSalary'] = fullTimeFullSalary.timeWork_Salary;
        insertObj.dispatch({
          type: 'UPPDATE_LIST_MONTH',
          payload: Mounth,
        });
      });
    });
  });
export const queryListMonth = (dispatch, id) => {
  return Realm.open(dataBaseOptions).then(realm => {
    realm.write(() => {
      const Mounth = realm.objectForPrimaryKey('Mounth', id);
      if (Mounth) {
        const fullTimeFullSalary = new CalculateState(Mounth);
        Mounth['fullTimeFullSalary'] = fullTimeFullSalary.timeWork_Salary;
        dispatch({
          type: 'UPPDATE_LIST_MONTH',
          payload: Mounth,
        });
      } else {
        dispatch({
          type: 'UPPDATE_LIST_MONTH',
          payload: null,
        });
      }
    });
  });
};
export const deleteDay = (dispatch, id) => {
  return Realm.open(dataBaseOptions).then(realm => {
    realm.write(() => {
      const workDay = realm.objectForPrimaryKey('ListWork', id);

      if (workDay) {
        const idMounth = workDay.idMounth;
        realm.delete(workDay);

        const Mounth = realm.objectForPrimaryKey('Mounth', idMounth);
        if (Mounth.listWorks.length == 0) {
          realm.delete(Mounth);
        }

        const MounthNew = realm.objectForPrimaryKey('Mounth', idMounth);
        if (MounthNew) {
          const fullTimeFullSalary = new CalculateState(MounthNew);
          MounthNew['fullTimeFullSalary'] = fullTimeFullSalary.timeWork_Salary;
          dispatch({
            type: 'UPPDATE_LIST_MONTH',
            payload: MounthNew,
          });
        } else {
          dispatch({
            type: 'UPPDATE_LIST_MONTH',
            payload: null,
          });
        }
      }
    });
  });
};

export const clearDB = dispatch => {
  Realm.open(dataBaseOptions).then(realm => {
    realm.write(() => {
      const ListWork = realm.objects('ListWork');
      const Mounth = realm.objects('Mounth');
      const Settings = realm.objects('Settings');

      if ((ListWork && Settings) || (Mounth && Settings)) {
        realm.delete(Mounth);
        realm.delete(ListWork);
        realm.delete(Settings);
        dispatch({
          type: 'RESET',
        });
      }
    });
  });
};
