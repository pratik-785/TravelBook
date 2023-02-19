import React from 'react'
import { Text, View, StyleSheet, StatusBar, TouchableNativeFeedback } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import TextInputUI from "../Components/TextInputUI"

const SignIn = (props) => {

    const staffValidationSchema = yup.object().shape({
        email: yup.string().required('Please enter your email'),
        password: yup.string().required('Please enter your password'),
    });

    const onSubmitForm = (values) => {
        console.log(values)
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle={'#CD1818'} backgroundColor={'#DA0037'} />
            <Formik
                initialValues={{
                    email: ''
                }}
                validateOnMount={true}
                validationSchema={staffValidationSchema}
                onSubmit={(values) => onSubmitForm(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values, touched, isValid, errors }) => (
                    <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 20 }}>

                        {/* For email */}
                        <View style={{ marginBottom: 5 }}>
                            <TextInputUI
                                title={'Email'}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                autoCapitalize='words'
                                placeHolder='Enter your email'
                            />
                        </View>
                        {(errors.email && touched.email) &&
                            <Text style={{ fontSize: 14, color: '#CD1818', fontWeight: 'bold' }}>{errors.email}</Text>
                        }

                        {/* For password */}
                        <View style={{ marginTop: 10, marginBottom:5 }}>
                            <TextInputUI
                                title={'Password'}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                autoCapitalize='words'
                                placeHolder='Enter your password'
                            />
                        </View>
                        {(errors.password && touched.password) &&
                            <Text style={{ fontSize: 14, color: '#CD1818', fontWeight: 'bold' }}>{errors.password}</Text>
                        }

                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableNativeFeedback onPress={handleSubmit}>
                                <View style={{
                                    width: '100%', height: 50, borderRadius: 6,
                                    marginVertical: 10, backgroundColor: '#CD1818',
                                    justifyContent: 'center', alignItems: 'center'
                                }}>
                                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Submit</Text>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                        <View>
                            <Text style={{textAlign:'center'}}>Don't have an account: </Text>
                            <Text style={{fontSize:18, fontWeight:'bold', textAlign:'center'}} onPress={() => props.navigation.navigate("SignUp")}>Sign up</Text>
                        </View>
                    </View>
                )}
            </Formik>
        </View>
    )
}

export default SignIn

const styles = StyleSheet.create({})
