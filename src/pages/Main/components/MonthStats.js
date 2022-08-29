import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Platform,
} from 'react-native';
import styleFile from '../../style';
import Icon from 'react-native-vector-icons/AntDesign';

export const MonthStats = ({listMonth, navigation, selectedMount}) => {
  return (
    <TouchableHighlight
      underlayColor={styleFile.button.underlayColor}
      activeOpacity={styleFile.button.activeOpacity}
      style={styles.button}
      onPress={() =>
        navigation.navigate('Stats', {
          selectedMount: selectedMount,
        })
      }>
      <View style={styles.wrap}>
        <View style={[styles.textWrap]}>
          <Text style={[styles.text, {paddingBottom: 2}]}>{`Итого: ${
            listMonth ? listMonth.fullTimeFullSalary.timeWork : 0
          } ч.`}</Text>
          <Text style={styles.text}>{`Заработная плата: ${
            listMonth ? listMonth.fullTimeFullSalary.salary : 0
          } р.`}</Text>
        </View>
        <Icon name={'table'} style={styles.icon} />
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    marginHorizontal: 15,
  },
  button: {
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: styleFile.window.backgroundColor,
  },
  textWrap: {
    flex: 3,
    paddingVertical: 10,
  },
  text: {
    color: styleFile.text.color,
    fontSize: styleFile.text.fontSize,
  },
  icon: {
    fontSize: 26,
    fontWeight: 'bold',
    flex: 1,
    alignSelf: 'center',
    textAlign: 'right',
    color: styleFile.text.color,
  },
});
