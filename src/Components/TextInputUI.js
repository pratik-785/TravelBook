import React from 'react';
import { View, Text, TextInput, Dimensions, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const TextInputUI = ({
    title,
    onChangeText,
    onBlur,
    value,
    autoCapitalize,
    placeHolder,
    keyboardType
}) => {
    return (
        <View style={{ borderColor: 'black', borderWidth: 1.2, borderRadius:6 }}>
            <View style={{
                height: 25, backgroundColor: 'white', justifyContent: 'flex-end', borderRadius:6
            }}>
                <Text style={{ paddingLeft: 10, fontWeight: 'bold', color: 'black' }}>{title}</Text>
            </View>
            <TextInput
                style={{
                    height: 40, backgroundColor: 'white', paddingLeft: 10, fontSize: 16, borderRadius:6
                }}
                onChangeText={onChangeText}
                onBlur={onBlur}
                value={value}
                autoCapitalize={autoCapitalize}
                placeholder={placeHolder}
                keyboardType={keyboardType}
            />
        </View>
    );
};

TextInputUI.propTypes = {
    title: PropTypes.string,
    onChangeText: PropTypes.func,
    onBlur: PropTypes.func,
    value: PropTypes.string,
    autoCapitalize: PropTypes.string,
    placeHolder: PropTypes.string,
    keyboardType: PropTypes.string,
};

TextInputUI.defaultProps = {
    title: 'Title'
};

export default TextInputUI;
