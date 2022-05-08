import Realm from 'realm';

export const ListWork = {
  name: 'ListWork',
  properties: {
    id: 'int',
    idMounth: 'int',
    timeStart: 'string',
    timeEnd: 'string',
    timeDinner: 'int',
    timeWork: 'double',
    formatDate: 'string',
  },
  primaryKey: 'id',
};

export const Mounth = {
  name: 'Mounth',
  properties: {
    id: 'int',
    nameMounth: 'string',
    listWorks: {type: 'list', objectType: 'ListWork'},
  },
  primaryKey: 'id',
};
const dataBaseOptions = {
  path: 'TimeReal',
  schema: [Mounth, ListWork],
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
          if (checkIdDay) {
            reject({textTitle: 'Ошибка', text: 'Запись уже существует'});
            return false;
          }
          realm.create(
            'Mounth',
            {
              nameMounth: `${insertObj.nameMounth}`,
              id: insertObj.idMounth,
            },
            'modified',
          );
          const ListWork = realm.create('ListWork', {
            id: insertObj.idDay,
            idMounth: insertObj.idMounth,
            timeStart: `${insertObj.timeStart}`,
            timeEnd: `${insertObj.timeEnd}`,
            timeDinner: insertObj.timeDinner,
            timeWork: insertObj.timeWork,
            formatDate: `${insertObj.formatDate}`,
          });

          const Mounth = realm
            .objects('Mounth')
            .filtered(`id = ${insertObj.idMounth}`);

          const List = realm
            .objects('ListWork')
            .filtered(`idMounth = ${insertObj.idMounth}`);

          Mounth.forEach(Mounth => {
            Mounth.listWorks = List;
            resolve(`Запись добавлена`);
          });
        });
      })
      .catch(error => reject(error));
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

export const queryAllListWork = () =>
  new Promise((resolve, reject) => {
    Realm.open(dataBaseOptions)
      .then(realm => {
        realm.write(() => {
          const allList = realm.objects('ListWork');
          const allListSorted = allList.sorted('id');
          resolve(allListSorted);
        });
      })
      .catch(error => {
        reject(error);
      });
  });

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

export const deleteMounthIdListId = idMounth =>
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

export const DeleteListWorkId = (id, reloadData) => {
  Realm.open(dataBaseOptions)
    .then(realm => {
      realm.write(() => {
        const idDay = realm.objectForPrimaryKey('ListWork', id);

        const idMounth = idDay.idMounth;

        let deleteDay = realm.delete(idDay);

        const Mounth = realm.objectForPrimaryKey('Mounth', idMounth);

        if (Mounth.listWorks.length == 0) {
          realm.delete(Mounth);
          reloadData();
        }
      });
    })
    .catch(error => console.log(error));
};
