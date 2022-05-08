import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import styleFile from '../style';
import {DeleteListWorkId} from '../../database/allSchemas';
import moment from 'moment/min/moment-with-locales';
import {SwipeListView} from 'react-native-swipe-list-view';
import ModalWinMessage from './ModalWindow';

export const SwipeListComponent = ({array, reloadDBMounthList}) => {
  const [modalWin, setmodalWin] = useState(false);
  const [listData, setListData] = useState(
    array
      .slice(0)
      .reverse()
      .map((l, i) => ({key: `${i}`, l: l})),
  );

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey, data) => {
    moment.locale('ru');
    const formatDate = `${moment(new Date(data.item.l.timeStart)).format(
      'DD.MM.YY',
    )}\n${moment(new Date(data.item.l.timeStart)).format('HH:mm')}-${moment(
      new Date(data.item.l.timeEnd),
    ).format('HH:mm')}`;
    const newData = [...listData];
    closeRow(rowMap, rowKey);
    const prevIndex = listData.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);

    setmodalWin({
      visible: true,
      textTitle: 'Удалить запись?',
      text: `${formatDate}`,
      fucnDelBd: DeleteListWorkId,
      idDel: data.item.l.id,
      reloadData: reloadDBMounthList,
      newData: newData,
      setListData: setListData,
    });
  };

  const renderItem = data => {
    moment.locale('ru');
    const dateStart = moment(new Date(data.item.l.timeStart)).format(
      'DD.(dd.)',
    );
    const titleStats = `Статистика за ${moment(
      new Date(data.item.l.timeStart),
    ).format('D MMM YYYY')}`;
    const dateStats = `Начало в ${moment(
      new Date(data.item.l.timeStart),
    ).format('HH:mm; DD/MM/YY')}\nКонец в ${moment(
      new Date(data.item.l.timeEnd),
    ).format('HH:mm; DD/MM/YY')}\nОбед: ${
      data.item.l.timeDinner
    } мин.\nОтработал: ${data.item.l.timeWork} ч.`;

    return (
      <TouchableHighlight
        onPress={() =>
          setmodalWin({
            visible: true,
            textTitle: titleStats,
            text: dateStats,
          })
        }>
        <View style={[styles.rowFront, styles.border]}>
          <Text style={[styles.textTitle, {flex: 1, textAlign: 'center'}]}>
            {dateStart}
          </Text>
          <Text style={[styles.textTitle, {flex: 4, textAlign: 'center'}]}>
            {data.item.l.formatDate}
          </Text>
          <Text style={[styles.textTitle, {flex: 1, textAlign: 'center'}]}>
            ({data.item.l.timeWork} ч.)
          </Text>
        </View>
      </TouchableHighlight>
    );
  };

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      {/* <TouchableHighlight
        activeOpacity={styleFile.button.activeOpacity}
        underlayColor={'#046BD2'}
        style={[styles.backBtn, styles.backLeftBtnLeft]}
        onPress={() => console.log(data.item.l.id)}>
        <Text style={styles.backTextWhite}>Изменить</Text>
      </TouchableHighlight> */}
      <TouchableHighlight
        activeOpacity={styleFile.button.activeOpacity}
        underlayColor={'#BE1111'}
        style={[styles.backBtn, styles.backRightBtnRight]}
        onPress={() => deleteRow(rowMap, data.item.key, data)}>
        <Text style={styles.backTextWhite}>Удалить</Text>
      </TouchableHighlight>
    </View>
  );

  return (
    <View style={styles.container}>
      <ModalWinMessage modalWin={modalWin} setmodalWin={setmodalWin} />
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        previewRowKey={'0'}
        previewRepeat={true}
        previewRepeatDelay={5000}
        previewOpenDelay={3000}
        leftOpenValue={75}
        rightOpenValue={-75}
        disableRightSwipe={true}
        onRowOpen={(rowKey, rowMap) => {
          setTimeout(() => {
            closeRow(rowMap, rowKey);
          }, 2000);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textTitle: {
    color: styleFile.text.color,
    fontSize: 15,
  },
  container: {
    backgroundColor: styleFile.view.backgroundColor,
    flex: 1,
  },
  backTextWhite: {
    color: 'white',
  },
  rowFront: {
    backgroundColor: styleFile.button.backgroundColor,
    alignItems: 'center',
    flexDirection: 'row',
    height: 45,
  },
  border: {
    borderBottomColor: styleFile.border.borderColor,
    borderBottomWidth: 1,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: styleFile.view.backgroundColor,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backLeftBtnLeft: {
    backgroundColor: '#0880F9',
    left: 0,
  },
  backRightBtnRight: {
    backgroundColor: '#EA1515',
    right: 0,
  },
  buttonClose: {
    paddingTop: 1,
    paddingBottom: 2,
    backgroundColor: styleFile.button.backgroundColor,
    borderRadius: 5,
    marginRight: 10,
    marginLeft: 10,
    width: '35%',
  },
  textBtn: {
    color: styleFile.text.color,
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 18 * 1.4,
  },
});
