import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import React, {useState} from 'react';
import {LocaleConfig} from 'react-native-calendars';
import {View, Text} from 'react-native';
import moment from 'moment';
import styleFile from '../style';

LocaleConfig.locales['ru'] = {
  monthNames: [],

  dayNames: [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
  ],
  dayNamesShort: ['Вс.', 'Пн.', 'Вт.', 'Ср.', 'Чт.', 'Пт.', 'Сб.'],
  // today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = 'ru';

export const CalendarPicker = ({array}) => {
  const [date, setdate] = useState(array);

  const nameMonth = moment(new Date(date[0].timeStart))
    .local('ru')
    .format('YYYY-MM-DD');

  let markedDates = new Object();
  for (let i = 0; i < array.length; i++) {
    markedDates[
      moment(new Date(array[i].timeStart)).local('ru').format('YYYY-MM-DD')
    ] = {selected: true, selectedColor: styleFile.tab.colorActive};
  }

  return (
    <>
      <Calendar
        current={nameMonth}
        customHeaderTitle={<></>}
        onDayPress={day => {
          console.log('selected day', day);
        }}
        hideArrows={true}
        firstDay={1}
        hideExtraDays={true}
        markedDates={markedDates}
      />
    </>
  );
};
