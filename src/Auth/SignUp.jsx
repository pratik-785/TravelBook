import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableNativeFeedback,
  ToastAndroid,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import TextInputUI from '../Components/TextInputUI';
import {Button} from 'react-native-paper';
import {useState} from 'react';
import ButtonUI from '../Components/ButtonUI';
import { PostFetch } from '../Utility/Fetch/Fetch';
import { REGISTER } from '../Components/ApiEndpoints';

const SignUp = () => {
  const [signUpLoading, setSignUpLoading] = useState(false);

  const staffValidationSchema = yup.object().shape({
    name: yup.string().required('Please enter your name'),
    email: yup
      .string()
      .email('Invalid email')
      .required('Please enter your email'),
    mobile: yup
      .string()
      .min(10)
      .max(10)
      .required('Please enter your mobile number'),
    password: yup
      .string()
      .min(6, 'Password must be minimum 6 characters')
      .required('Please enter your password'),
  });

  onSubmitForm = async val => {
    try {
      const {name, mobile, email, password} = val;
      const data = {
        name: name,
        mobile_number: mobile,
        email: email,
        password: password,
      };
      const response = await PostFetch(REGISTER, data, "withoutauth")
      if (response.status === 200) {
        ToastAndroid.show('Register Successfully!', ToastAndroid.SHORT);
      }
    } catch (err) {
      console.log('Error---', err);
    }
  };

  const onConfirm = () => {

  }

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle={'#CD1818'} backgroundColor={'#DA0037'} />
      <Formik
        initialValues={{
          name: '',
          email: '',
          mobile: '',
          password: '',
        }}
        validateOnMount={true}
        validationSchema={staffValidationSchema}
        onSubmit={values => onSubmitForm(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          isValid,
          errors,
        }) => (
          <View
            style={{flex: 1, justifyContent: 'center', paddingHorizontal: 20}}>
            {/* For name */}
            <View style={{marginBottom: 5}}>
              <TextInputUI
                title={'Name'}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                autoCapitalize="words"
                placeHolder="Enter your name"
              />
            </View>
            {errors.name && touched.name && (
              <Text
                style={{fontSize: 14, color: '#CD1818', fontWeight: 'bold'}}>
                {errors.name}
              </Text>
            )}

            {/* For mobile */}
            <View style={{marginTop: 10, marginBottom: 5}}>
              <TextInputUI
                title={'Mobile'}
                onChangeText={handleChange('mobile')}
                onBlur={handleBlur('mobile')}
                value={values.mobile}
                autoCapitalize="words"
                placeHolder="Enter your mobile number"
                keyboardType={'numeric'}
              />
            </View>
            {errors.mobile && touched.mobile && (
              <Text
                style={{fontSize: 14, color: '#CD1818', fontWeight: 'bold'}}>
                {errors.mobile}
              </Text>
            )}

            {/* For email */}
            <View style={{marginTop: 10, marginBottom: 5}}>
              <TextInputUI
                title={'Email'}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                autoCapitalize="words"
                placeHolder="Enter your email"
              />
            </View>
            {errors.email && touched.email && (
              <Text
                style={{fontSize: 14, color: '#CD1818', fontWeight: 'bold'}}>
                {errors.email}
              </Text>
            )}

            {/* For password */}
            <View style={{marginTop: 10, marginBottom: 5}}>
              <TextInputUI
                title={'Password'}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                autoCapitalize="words"
                placeHolder="Enter your password"
              />
            </View>
            {errors.password && touched.password && (
              <Text
                style={{fontSize: 14, color: '#CD1818', fontWeight: 'bold'}}>
                {errors.password}
              </Text>
            )}

            <View style={{marginTop: 10, justifyContent: 'center', alignItems: 'center'}}>
              <ButtonUI
                buttonWidth={'100%'}
                buttonHeight={50}
                buttonFontSize={18}
                buttonTitle={'Submit'}
                buttonOnPress={onConfirm}
                buttonLoading={signUpLoading}
                buttonLoaderSize={30}
              />
            </View>
            <View>
              <Text style={{textAlign: 'center'}}>
                Already have an account:{' '}
              </Text>
              <Text
                style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}
                onPress={() => props.navigation.navigate('SignIn')}>
                Sign in
              </Text>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
