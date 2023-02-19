import {ActivityIndicator, StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

const ButtonUI = ({
  buttonWidth,
  buttonHeight,
  buttonBackgroundColor,
  buttonTextColor,
  buttonTitle,
  buttonLoading,
  buttonLoaderColor,
  buttonLoaderSize,
  buttonFontSize,
  buttonOnPress,
}) => {
  return (
    <TouchableNativeFeedback onPress={buttonOnPress}>
      <View
        style={{
          width: buttonWidth,
          height: buttonHeight,
          backgroundColor: buttonBackgroundColor,
          borderRadius: 6,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {buttonLoading ? (
          <ActivityIndicator
            color={buttonLoaderColor}
            size={buttonLoaderSize}
          />
        ) : (
          <Text
            style={{
              color: buttonTextColor,
              fontWeight: 'bold',
              fontSize: buttonFontSize,
            }}>
            {buttonTitle}
          </Text>
        )}
      </View>
    </TouchableNativeFeedback>
  );
};

ButtonUI.propTypes = {
  buttonHeight: PropTypes.number,
  buttonBackgroundColor: PropTypes.string,
  buttonTextColor: PropTypes.string,
  buttonTitle: PropTypes.string,
  buttonLoaderColor: PropTypes.string,
  buttonLoaderSize: PropTypes.number,
  buttonFontSize: PropTypes.number,
};

ButtonUI.defaultProps = {
  buttonWidth: 70,
  buttonHeight: 50,
  buttonBackgroundColor: '#CD1818',
  buttonTextColor: 'white',
  buttonLoading: false,
  buttonLoaderColor: 'white',
  buttonLoaderSize: 30,
  buttonFontSize: 20,
};

export default ButtonUI;

const styles = StyleSheet.create({});
