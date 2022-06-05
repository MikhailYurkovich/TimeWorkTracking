import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import styleFile from '../style';
import {deleteMounthIdListId} from '../../database/allSchemas';
import Icon from 'react-native-vector-icons/AntDesign';
import {SwipeListComponent} from './SwipeList';
import {CalendarPicker} from './Calendar';

export const ListItemComponent = ({
  item,
  setmodalWin,
  reloadDBMounthList,
  navigation,
}) => {
  const [currentIndex, setCurrentIndex] = useState(false);
  const animatedController = useRef(new Animated.Value(0)).current;
  const [bodySectionHeight, setBodySectionHeight] = useState(0);

  const bodyHeight = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: [0, bodySectionHeight],
  });

  const toggleListItem = () => {
    const duration_ms = item.listWorks.length * 40;

    if (currentIndex) {
      //Анимация закрытия
      Animated.timing(animatedController, {
        duration: 200 + duration_ms,
        easing: Easing.ease,

        toValue: 0,
        useNativeDriver: false,
      }).start();
    } else {
      //Анимация открытия
      Animated.timing(animatedController, {
        duration: 400 + duration_ms,
        easing: Easing.ease,
        toValue: 1,
        useNativeDriver: false,
      }).start();
    }
    setCurrentIndex(!currentIndex);
  };

  // Сумма часов
  let timeWorkSum = 0;
  for (let i = 0; i < item.listWorks.length; i++) {
    timeWorkSum += item.listWorks[i].timeWork;
  }

  return (
    <View style={[styles.view]}>
      <TouchableOpacity
        style={[!currentIndex ? styles.buttonContainer : {borderWidth: 0}]}
        onPress={() => {
          toggleListItem();
        }}
        activeOpacity={styleFile.button.activeOpacity}
        underlayColor={styleFile.button.underlayColor}>
        <View style={[styles.buttonMounthList]}>
          {/* Кнопка статистики */}
          <TouchableOpacity
            style={styles.buttonStats}
            onPress={() => {
              navigation.navigate('MounthStats', {
                timeWorkSum: timeWorkSum,
                nameMounth: item.nameMounth,
              });
            }}>
            <Icon name={'barschart'} style={styles.iconButton} />
          </TouchableOpacity>

          <Text style={styles.textTitle}>
            {item.nameMounth} ({timeWorkSum} ч.)
          </Text>

          {/* кнопка удаления месяца из бд */}
          <TouchableOpacity
            style={styles.buttonDelete}
            activeOpacity={styleFile.button.activeOpacity}
            underlayColor={styleFile.button.backgroundColor}
            onPress={() => {
              setmodalWin({
                visible: true,
                textTitle: 'Удалить запись?',
                text: `${item.nameMounth}`,
                fucnDelBd: deleteMounthIdListId,
                idDel: item.id,
                reloadData: reloadDBMounthList,
              });
            }}>
            <Icon name={'delete'} style={styles.iconButton} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <Animated.View style={{height: bodyHeight, overflow: 'hidden'}}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
          }}
          onLayout={event =>
            setBodySectionHeight(event.nativeEvent.layout.height)
          }>
          {/* <CalendarPicker array={item.listWorks} /> */}
          <SwipeListComponent
            array={item.listWorks}
            reloadDBMounthList={reloadDBMounthList}
            setmodalWin={setmodalWin}
          />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: styleFile.view.backgroundColor,
  },
  buttonContainer: {
    borderBottomWidth: 1,
    borderBottomColor: styleFile.border.borderColor,
  },
  buttonMounthList: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 12,
    justifyContent: 'center',
    position: 'relative',
  },
  buttonStats: {
    position: 'absolute',
    left: 0,
  },
  buttonDelete: {
    position: 'absolute',
    right: 0,
  },
  iconButton: {
    fontSize: 18,
    color: styleFile.tab.colorActive,
    padding: 12,
  },
  textTitle: {
    fontSize: 16,
    color: styleFile.text.color,
  },
});
