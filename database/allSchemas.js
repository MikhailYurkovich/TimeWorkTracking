import Realm from 'realm';

export const ListWork = {
  name: 'ListWork',
  properties: {
    id: 'int',
    idMounth: 'int',
    timeStart: 'date',
    timeEnd: 'date',
    timeDinner: 'int',
    timeWork: 'double',
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
const dataBaseOptions = {
  path: 'TimeReal',
  schema: [Mounth, ListWork],
  schemaVersion: 2,
};
export const insertListWork = insertObj =>
  new Promise((resolve, reject) => {
    Realm.open(dataBaseOptions)
      .then(realm => {
        realm.write(() => {
          const checkIdDay = realm.objectForPrimaryKey(
            'ListWork',
            insertObj.idDay,
          );
          realm.create(
            'Mounth',
            {
              id: insertObj.idMounth,
            },
            'modified',
          );
          const ListWork = realm.create('ListWork', {
            id: insertObj.idDay,
            idMounth: insertObj.idMounth,
            timeStart: insertObj.timeStart,
            timeEnd: insertObj.timeEnd,
            timeDinner: insertObj.timeDinner,
            timeWork: insertObj.timeWork,
          });

          const Mounth = realm
            .objects('Mounth')
            .filtered(`id = ${insertObj.idMounth}`);

          const List = realm
            .objects('ListWork')
            .filtered(`idMounth = ${insertObj.idMounth}`);

          Mounth.forEach(Mounth => {
            Mounth.listWorks = List;
            resolve(true);
          });
        });
      })
      .catch(error => reject(error));
  });

export const updateWorkDay = updateObj =>
  new Promise((resolve, reject) => {
    Realm.open(dataBaseOptions)
      .then(realm => {
        realm.write(() => {
          const ListWork = realm.objectForPrimaryKey('ListWork', updateObj.id);
          ListWork.timeStart = updateObj.timeStart;
          ListWork.timeEnd = updateObj.timeEnd;
          ListWork.timeDinner = updateObj.timeDinner;
          ListWork.timeWork = updateObj.timeWork;
          resolve('ok');
        });
      })
      .catch(error => {
        reject(error);
      });
  });

export const queryAllListMount_ListWork = () =>
  new Promise((resolve, reject) => {
    Realm.open(dataBaseOptions)
      .then(realm => {
        realm.write(() => {
          const allList = realm.objects('Mounth');
          const allListSorted = allList.sorted('id');
          resolve(allListSorted.slice(0).reverse());
        });
      })
      .catch(error => {
        reject(error);
      });
  });

export const queryListMonth_ListWork_id = id =>
  new Promise((resolve, reject) => {
    Realm.open(dataBaseOptions)
      .then(realm => {
        realm.write(() => {
          const Mounth = realm.objectForPrimaryKey('Mounth', id);
          resolve(Mounth);
        });
      })
      .catch(error => {
        reject(error);
      });
  });

export const queryWorkDayId = id =>
  new Promise((resolve, reject) => {
    Realm.open(dataBaseOptions)
      .then(realm => {
        realm.write(() => {
          const workDay = realm.objectForPrimaryKey('ListWork', id);
          resolve(workDay);
        });
      })
      .catch(error => {
        reject(error);
      });
  });

// export const queryAllListWork = () =>
//   new Promise((resolve, reject) => {
//     Realm.open(dataBaseOptions)
//       .then(realm => {
//         realm.write(() => {
//           const allList = realm.objects('ListWork');
//           const allListSorted = allList.sorted('id');
//           resolve(allListSorted);
//         });
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });

export const DeleteAllMounth = () => {
  Realm.open(dataBaseOptions)
    .then(realm => {
      realm.write(() => {
        realm.delete(realm.objects('Mounth'));
        realm.delete(realm.objects('ListWork'));
      });
    })
    .catch(error => console.log(error));
};

export const deleteMounthId = idMounth =>
  new Promise((resolve, reject) => {
    Realm.open(dataBaseOptions)
      .then(realm => {
        realm.write(() => {
          const Mounth = realm.objectForPrimaryKey('Mounth', idMounth);
          const ListWork = realm
            .objects('ListWork')
            .filtered(`idMounth = ${idMounth}`);
          realm.delete(ListWork);
          realm.delete(Mounth);
        });
      })
      .catch(error => {
        reject(error);
      });
  });

export const DeleteListWorkId = id => {
  Realm.open(dataBaseOptions)
    .then(realm => {
      realm.write(() => {
        const idDay = realm.objectForPrimaryKey('ListWork', id);

        const idMounth = idDay.idMounth;

        realm.delete(idDay);

        const Mounth = realm.objectForPrimaryKey('Mounth', idMounth);

        if (Mounth.listWorks.length == 0) {
          realm.delete(Mounth);
        }
      });
    })
    .catch(error => console.log(error));
};
