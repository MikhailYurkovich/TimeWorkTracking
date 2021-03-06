import React from 'react';
import {Calendar} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import moment from 'moment';

LocaleConfig.locales['ru'] = {
  monthNames: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ],
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
};
LocaleConfig.defaultLocale = 'ru';

export const CalendarPicker = ({
  listMonth,
  queryMount,
  setselectedDay,
  selectedDay,
  setselectedMount,
}) => {
  let markedDates = {
    [selectedDay]: {
      selected: true,
      disableTouchEvent: false,
      customStyles: {
        container: {
          backgroundColor: 'red',
        },
      },
    },
  };

  if (listMonth) {
    const marked = listMonth.listWorks.reduce((target, key) => {
      if (
        moment(key.timeStart).format('YYYY-MM-DD') ==
        moment(new Date()).format('YYYY-MM-DD')
      ) {
        target[moment(new Date(key.timeStart)).format('YYYY-MM-DD')] = {
          selected: true,
          customStyles: {
            text: {
              color: 'red',
            },
          },
        };
      } else {
        target[moment(new Date(key.timeStart)).format('YYYY-MM-DD')] = {
          selected: true,

          disableTouchEvent: false,
        };
      }

      return target;
    }, {});

    markedDates = Object.assign(marked, markedDates);
  }
  return (
    <Calendar
      initialDate={moment(new Date()).format('YYYY-MM-DD')}
      onMonthChange={month => {
        queryMount(Number(moment(month.dateString).format('YYYYMM')));
        setselectedMount(month.dateString);
      }}
      onDayPress={day => {
        setselectedDay(day.dateString);
      }}
      monthFormat={'MMMM yyyy'}
      firstDay={1}
      hideExtraDays={true}
      markingType={'custom'}
      markedDates={markedDates}
      theme={{
        todayTextColor: 'red',
        textSectionTitleColor: 'black',
      }}
    />
  );
};
