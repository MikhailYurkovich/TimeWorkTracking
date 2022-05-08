import React, {useState, useCallback} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import ModalWinMessage from './components/ModalWindow';
import {ListItemComponent} from './components/ListItem';
import {useFocusEffect} from '@react-navigation/native';
import styleFile from './style';
import {queryAllListMount_ListWork} from '../database/allSchemas';

const AllEntries = ({navigation}) => {
  const [listMounth, setlistMounth] = useState(null);
  const [modalWin, setmodalWin] = useState(false);

  const reloadDBMounthList = () => {
    queryAllListMount_ListWork().then(result => {
      setlistMounth(result);
    });
  };

  useFocusEffect(
    useCallback(() => {
      reloadDBMounthList();
      return () => {
        setlistMounth(null);
      };
    }, []),
  );

  const Render = props => {
    const list = props.listMounth;

    if (!list) {
      return (
        <View
          style={[
            styles.view,
            {justifyContent: 'center', alignItems: 'center'},
          ]}>
          <Text style={{color: styleFile.text.color, fontSize: 22}}>
            Загрузка...
          </Text>
        </View>
      );
    }
    if (list.length == 0) {
      return (
        <View
          style={[
            styles.view,
            {justifyContent: 'center', alignItems: 'center'},
          ]}>
          <Text style={{color: styleFile.text.color, fontSize: 22}}>
            Записи отсутствуют
          </Text>
        </View>
      );
    }
    return (
      <View>
        <FlatList
          data={list}
          renderItem={({item, index}) => (
            <ListItemComponent
              item={item}
              i={index}
              reloadDBMounthList={reloadDBMounthList}
              setmodalWin={setmodalWin}
              navigation={navigation}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    );
  };

  return (
    <View style={styles.view}>
      <Render listMounth={listMounth} />
      <ModalWinMessage modalWin={modalWin} setmodalWin={setmodalWin} />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: styleFile.view.backgroundColor,
  },
  text: {
    fontSize: 20,
    color: styleFile.text.color,
  },
});

export default AllEntries;
