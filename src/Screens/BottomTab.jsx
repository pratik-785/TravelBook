import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home';
import Profile from './Profile';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Trips from './Trips';
const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false, tabBarShowLabel: false}}>
      <Tab.Screen
        options={({route}) => ({
          tabBarIcon: ({focused}) => {
            if (focused) {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    borderRightColor: '#bfbfbf',
                    borderRightWidth: 0.5,
                  }}>
                  <Image
                    source={require('../Utility/Images/home.png')}
                    style={{
                      width: 24,
                      height: 24,
                    }}
                  />
                  <Text
                    style={{
                      marginLeft: 10,
                      fontWeight: 'bold',
                      color: 'black',
                    }}>
                    HOME
                  </Text>
                </View>
              );
            } else {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    borderRightColor: '#bfbfbf',
                    borderRightWidth: 0.5,
                  }}>
                  <Image
                    source={require('../Utility/Images/home-outline.png')}
                    style={{
                      width: 24,
                      height: 24,
                      opacity: 0.5,
                    }}
                  />
                  <Text style={{marginLeft: 10, fontWeight: 'bold'}}>HOME</Text>
                </View>
              );
            }
          },
        })}
        name="HOME"
        component={Home}
      />
      <Tab.Screen
        options={({route}) => ({
          tabBarIcon: ({focused}) => {
            if (focused) {
              return (
                // <MaterialIcons name='directions-car' size={30} color={'#CD1818'} />
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={require('../Utility/Images/travel.png')}
                    style={{
                      width: 28,
                      height: 28,
                    }}
                  />
                  <Text
                    style={{
                      marginLeft: 10,
                      fontWeight: 'bold',
                      color: 'black',
                    }}>
                    TRIPS
                  </Text>
                </View>
              );
            } else {
              return (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={require('../Utility/Images/travel-outline.png')}
                    style={{
                      width: 28,
                      height: 28,
                      opacity: 0.5,
                    }}
                  />
                  <Text style={{marginLeft: 10, fontWeight: 'bold'}}>
                    TRIPS
                  </Text>
                </View>
              );
            }
          },
        })}
        name="Trips"
        component={Trips}
      />
      {/* <Tab.Screen
                options={({ route }) => ({
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return (
                                <MaterialCommunityIcons name='account-group' size={30} color={'#CD1818'} />
                            )
                        } else {
                            return (
                                <MaterialCommunityIcons name='account-group-outline' size={30} color={'grey'} />
                            )
                        }
                    },
                })}
                name="CLIENT" component={Client} /> */}
      {/* <Tab.Screen
                options={({ route }) => ({
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return (
                                <Image
                                    source={require("../Utility/Images/user.png")}
                                    style={{
                                        width: 24,
                                        height: 24,
                                        opacity: 0.5
                                    }}
                                />
                            )
                        } else {
                            return (
                                <Image
                                    source={require("../Utility/Images/user-outline.png")}
                                    style={{
                                        width: 24,
                                        height: 24,
                                        opacity: 0.5
                                    }}
                                />
                            )
                        }
                    },
                })}
                name="PROFILE" component={Profile} /> */}
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({});
