import React from 'react';
import AllEntries from './AllEntries';
import ClockRecords from './ClockRecords';
import Settings from './Settings';
import {MounthStats} from './MounthStats';
import {Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import styleFile from './style';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function Navigate() {
  function HomeTabs() {
    return (
      <Tab.Navigator
        screenOptions={({navigation}) => ({
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate('Settings')}>
              {({pressed}) => (
                <Icon
                  name={'setting'}
                  style={{
                    color: pressed
                      ? styleFile.button.underlayColor
                      : styleFile.text.color,
                    fontSize: 23,
                    fontWeight: 'bold',
                    marginRight: 16,
                  }}
                />
              )}
            </Pressable>
          ),

          headerStyle: {
            backgroundColor: styleFile.view.backgroundColor,
            borderBottomWidth: 1,
            borderColor: styleFile.border.borderColor,
          },
          headerTintColor: styleFile.text.color,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
          tabBarStyle: {
            backgroundColor: styleFile.view.backgroundColor,
            borderTopColor: styleFile.border.borderColor,
          },
          tabBarInactiveTintColor: styleFile.tab.color,
          tabBarActiveTintColor: styleFile.tab.colorActive,
        })}>
        <Tab.Screen
          name="ClockRecords"
          component={ClockRecords}
          options={{
            title: 'Запись часов',
            tabBarLabelStyle: {fontSize: 10},
            tabBarIcon: ({focused}) => {
              let color = styleFile.tab.color;
              if (focused) {
                color = styleFile.tab.colorActive;
              }
              return <Icon name={'form'} size={20} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="AllEntries"
          component={AllEntries}
          options={{
            tabBarLabelStyle: {fontSize: 10},
            title: 'Записи',
            tabBarIcon: ({focused}) => {
              let color = styleFile.tab.color;
              if (focused) {
                color = styleFile.tab.colorActive;
              }
              return <Icon name={'profile'} size={20} color={color} />;
            },
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={({navigation}) => ({
            title: 'Настройки',
            headerRight: false,
            headerStyle: {
              backgroundColor: styleFile.view.backgroundColor,
              borderBottomWidth: 1,
              borderColor: styleFile.border.borderColor,
            },
            headerTintColor: styleFile.text.color,
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 18,
            },
          })}
        />
        <Stack.Screen
          name="MounthStats"
          component={MounthStats}
          options={({navigation, route}) => ({
            title: 'Статистика',
            headerRight: false,
            headerStyle: {
              backgroundColor: styleFile.view.backgroundColor,
              borderBottomWidth: 1,
              borderColor: styleFile.border.borderColor,
            },
            headerTintColor: styleFile.text.color,
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 18,
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
