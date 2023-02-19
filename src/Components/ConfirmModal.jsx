import React from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import ButtonUI from './ButtonUI';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const ConfirmModal = ({
  isVisible,
  title,
  action,
  onTouchOutside,
  onConfirm,
  onCancelPress,
  loading,
}) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onTouchOutside}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.modalView}>
          <View style={styles.deleteModalViewStyle}>
            <View
              style={{
                marginHorizontal: 20,
                height: 50,
                justifyContent: 'center',
              }}>
              <Text style={styles.textStyle}>{title}</Text>
            </View>
            <View
              style={{
                marginHorizontal: 20,
                height: 50,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <TouchableNativeFeedback onPress={onCancelPress}>
                <View style={{padding: 10}}>
                  <Text style={styles.deleteTextStyle}>Cancel</Text>
                </View>
              </TouchableNativeFeedback>
              <ButtonUI
                buttonWidth={70}
                buttonHeight={30}
                buttonFontSize={15}
                buttonTitle={action}
                buttonOnPress={onConfirm}
                buttonLoading={loading}
                buttonLoaderSize={20}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

ConfirmModal.propTypes = {
  title: PropTypes.string,
  action: PropTypes.string,
  isVisible: PropTypes.bool,
  onTouchOutside: PropTypes.func,
  onDeletePress: PropTypes.func,
  onCancelPress: PropTypes.func,
};

const styles = StyleSheet.create({
  modalView: {
    width: Width,
    elevation: 5,
    borderRadius: 10,
  },
  textStyle: {
    fontSize: 18,
    color: '#CD1818',
    fontWeight: 'bold',
  },
  deleteModalViewStyle: {
    marginHorizontal: 20,
    height: 100,
    backgroundColor: 'white',
    elevation: 3,
    marginVertical: 5,
    borderRadius: 10,
  },
  deleteTextStyle: {
    fontSize: 15,
    color: '#CD1818',
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
});

export default ConfirmModal;
