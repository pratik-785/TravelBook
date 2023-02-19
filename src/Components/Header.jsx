import React from 'react';
import {Text, View, StyleSheet, TouchableNativeFeedback} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Header = ({
  headerTitle,
  showArrow = true,
  navigation,
  rightIconTitle,
  onRightIconPress,
} = props) => {
  return (
    <View
      style={{
        height: 50,
        backgroundColor: '#CD1818',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {showArrow && (
          <TouchableNativeFeedback onPress={() => navigation.goBack()}>
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Ionicons name="arrow-back" size={25} color={'white'} />
            </View>
          </TouchableNativeFeedback>
        )}
        <Text
          style={{
            fontSize: 20,
            color: 'white',
            paddingLeft: 10,
            fontWeight: 'bold',
          }}>
          {headerTitle}
        </Text>
      </View>
      <TouchableNativeFeedback onPress={onRightIconPress}>
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FontAwesome name={rightIconTitle} size={25} color={'white'} />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
