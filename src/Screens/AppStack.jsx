import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTab from './BottomTab';
import NewTripForm from './NewTripForm';
import TripDetail from './TripDetail';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTab"
        component={BottomTab}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NewTripForm"
        component={NewTripForm}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TripDetail"
        component={TripDetail}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;

const styles = StyleSheet.create({});
