import React from 'react';
import { TextInput, Animated, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const AnimatedInput = Animated.createAnimatedComponent(TextInput);

const AnimatedTextUI = ({
    value,
    valueStyle,
    duration,
    fontSize,
    fontWeight,
    delay,
    textColor,
}) => {
    const animatedValue = React.useRef(new Animated.Value(0)).current;
    const inputRef = React.useRef();
    const animation = toValue => {
        return Animated.timing(animatedValue, {
            toValue,
            duration,
            delay,
            useNativeDriver: true,
        }).start(() => {
            animation(toValue);
        });
    };
    React.useEffect(() => {
        animation(value);

        animatedValue.addListener(v => {
            if (inputRef?.current) {
                inputRef.current.setNativeProps({
                    text: Math.round(v.value) > 9 ? `${Math.round(v.value)}` : `0${Math.round(v.value)}`,
                });
            }
        });
        return () => {
            animatedValue.removeAllListeners();
        };
    }, [value]);
    return (
        <AnimatedInput
            ref={inputRef}
            underlineColorAndroid="transparent"
            editable={false}
            defaultValue="0"
            style={[
                StyleSheet.absoluteFillObject,
                { fontSize: fontSize, color: textColor, ...valueStyle },
                { fontWeight: fontWeight, textAlign: 'center' },
            ]}
        />
    );
};

AnimatedTextUI.propTypes = {
    value: PropTypes.number,
    duration: PropTypes.number,
    color: PropTypes.string,
    delay: PropTypes.number,
    fontSize: PropTypes.number,
    fontWeight: PropTypes.string,
    textColor: PropTypes.string,
};

AnimatedTextUI.defaultProps = {
    value: 0,
    duration: 1000,
    color: '#7ac143',
    delay: 1000,
    fontSize: 25,
    fontWeight: '600'
};
export default AnimatedTextUI;
