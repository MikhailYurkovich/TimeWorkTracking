import React from 'react';
import Main from './Main';
import Settings from './Settings';
import Stats from './Stats';
import {Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import styleFile from './style';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function Navigate() {
  return (
    <NavigationContainer>
      <Stack.Navigator
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
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            title: 'Учет рабочих часов',
            headerTitleStyle: {fontSize: 18},
            tabBarLabelStyle: {fontSize: 10},
          }}
        />
        <Stack.Screen
          name="Stats"
          component={Stats}
          options={{
            title: 'Статистика',
            headerTitleStyle: {fontSize: 18},
            tabBarLabelStyle: {fontSize: 10},
          }}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
