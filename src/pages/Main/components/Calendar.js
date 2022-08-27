import React from 'react';
import {Calendar} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';

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

export const CalendarPicker = ({listMonth}) => {
  const selectedDay = useSelector(state => state.selectedDay);
  const dispatch = useDispatch();

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
        dispatch({
          type: 'UPPDATE_SELECTED_MOUNT',
          payload: month.dateString,
        });
      }}
      onDayPress={day => {
        dispatch({
          type: 'UPPDATE_SELECTED_DAY',
          payload: day.dateString,
        });
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
