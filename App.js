import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StatusBar} from 'react-native';
import {store} from './src/store/store';
import {Provider} from 'react-redux';
import AppStack from './src/Screens/AppStack';
import AuthStack from './src/Auth/AuthStack';

const Stack = createStackNavigator();

let isLoggedIn = true;

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar barStyle={'#CD1818'} backgroundColor={'#DA0037'} />
      <NavigationContainer>
        <Stack.Navigator>
          {isLoggedIn ? (
            <Stack.Screen
              name="AppStack"
              component={AppStack}
              options={{headerShown: false}}
            />
          ) : (
            <Stack.Screen
              name="AuthStack"
              component={AuthStack}
              options={{headerShown: false}}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
