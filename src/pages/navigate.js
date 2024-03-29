import React, {useRef} from 'react';
import Main from './Main/Main';
import Settings from './Settings/Settings';
import Stats from './Stats/Stats';
import {Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import styleFile from './style';

import analytics from '@react-native-firebase/analytics';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function Navigate() {
  const routeNameRef = useRef();
  const navigationRef = useRef();
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }
        routeNameRef.current = currentRouteName;
      }}>
      <Stack.Navigator
        initialRouteName="Main"
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
          headerTitleAlign: 'center',
        })}>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            title: 'Главная',
          }}
        />

        <Stack.Screen
          name="Settings"
          component={Settings}
          options={({navigation}) => ({
            title: 'Настройки',
            headerRight: false,
          })}
        />
        <Stack.Screen
          name="Stats"
          component={Stats}
          options={{
            title: 'Статистика',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

{
}
