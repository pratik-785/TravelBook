import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableNativeFeedback,
} from 'react-native';
import React from 'react';
import Header from '../Components/Header';
import {Formik} from 'formik';
import * as yup from 'yup';
import TextInputUI from '../Components/TextInputUI';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {useState} from 'react';
import {RadioButton} from 'react-native-paper';
import StepIndicator from 'react-native-step-indicator';
import ConfirmModal from '../Components/ConfirmModal';
import {useDispatch, useSelector} from 'react-redux';
import {
  addNewTrip,
  selectAddTripLoading,
  selectSaveTripModal,
  setSaveTripModal,
} from '../store/tripSlice';

const NewTripForm = props => {
  const [newTripData, setNewTripData] = useState({});
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');
  const [isDatePickerVisible, setIsDatePickerVisible] = useState({});
  const [typeOfTrip, setTypeOfTrip] = useState(1);
  const [currentPosition, setCurrentPosition] = useState(0);
  const saveTripModal = useSelector(selectSaveTripModal);
  const addTripLoading = useSelector(selectAddTripLoading);

  const dispatch = useDispatch();

  const distanceFormValidationSchema = yup.object().shape({
    title: yup.string().required('Please enter customer name'),
    start: yup.string().required('Please enter your starting location'),
    destination: yup.string().required('Please enter your destination'),
  });

  const chargesFormValidationSchema = yup.object().shape({
    totalDistance: yup.string().required('Please enter total distance'),
    kmCharges: yup.string().required('Please enter charges per km'),
  });

  const costFormValidationSchema = yup.object().shape({
    dieselCost: yup.string().required('Please enter your diesel cost'),
  });

  const handleConfirm = date => {
    if (isDatePickerVisible['startDateTime']) {
      setStartDateTime(date);
    } else {
      setEndDateTime(date);
    }
    setIsDatePickerVisible({startDateTime: false});
    setIsDatePickerVisible({endDateTime: false});
  };

  const hideDatePicker = () => {
    setIsDatePickerVisible({startDateTime: false});
    setIsDatePickerVisible({endDateTime: false});
  };

  const onSaveTripConfirm = () => {
    dispatch(addNewTrip({props: props, data: newTripData}));
  };

  const onSubmitForm = values => {
    if (currentPosition !== 2) {
      setCurrentPosition(currentPosition + 1);
    } else {
      setNewTripData({
        title: values.title,
        contact: Number(values.contact),
        typeOfTrip: typeOfTrip,
        start: values.start,
        startDateTime: moment(startDateTime.toString()).format('lll'),
        destination: values.destination,
        endDateTime: moment(endDateTime.toString()).format('lll'),
        totalDistance: Number(values.totalDistance),
        kmCharges: Number(values.kmCharges),
        stayCharges: Number(values.stayCharges),
        tip: Number(values.tip),
        discount: Number(values.discount),
        dieselCost: Number(values.dieselCost),
        tolls: Number(values.tolls),
        carMaintain: Number(values.carMaintain),
        fines: Number(values.fines),
        misc: Number(values.misc),
        commission: Number(values.commission),
      });
      dispatch(setSaveTripModal(true));
    }
  };

  const labels = ['Distance', 'Charges', 'Cost'];
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 25,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#CD1818',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#CD1818',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#CD1818',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#CD1818',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#CD1818',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#CD1818',
  };

  return (
    <View style={{flex: 1, backgroundColor: '#f2f2f2'}}>
      <Header headerTitle={'Add new trip'} navigation={props.navigation} />
      <ConfirmModal
        isVisible={saveTripModal}
        title="Add new trip"
        action="Add"
        onTouchOutside={() => dispatch(setSaveTripModal(false))}
        onConfirm={() => onSaveTripConfirm()}
        onCancelPress={() => dispatch(setSaveTripModal(false))}
        loading={addTripLoading}
      />
      <View style={{marginTop: 20, marginBottom: 10}}>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={currentPosition}
          labels={labels}
          stepCount={3}
        />
      </View>
      <Formik
        initialValues={{
          title: '',
          start: '',
          destination: '',
          totalDistance: '',
          kmCharges: '',
          stayCharges: '',
          tip: '',
          discount: '',
          dieselCost: '',
          tolls: '',
          carMaintain: '',
          fines: '',
          misc: '',
          commission: '',
        }}
        validateOnMount={true}
        validationSchema={
          currentPosition === 0
            ? distanceFormValidationSchema
            : currentPosition === 1
            ? chargesFormValidationSchema
            : costFormValidationSchema
        }
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
            style={{
              flex: 1,
              paddingHorizontal: 20,
              justifyContent: 'space-between',
            }}>
            <View style={{flex: 1, height: '100%'}}>
              {currentPosition === 0 && (
                <ScrollView showsVerticalScrollIndicator={false}>
                  {/* For title */}
                  <View style={{marginBottom: 5}}>
                    <TextInputUI
                      title={'Title'}
                      onChangeText={handleChange('title')}
                      onBlur={handleBlur('title')}
                      value={values.title}
                      autoCapitalize="words"
                      placeHolder="Enter your title"
                    />
                  </View>
                  {errors.title && touched.title && (
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#CD1818',
                        fontWeight: 'bold',
                      }}>
                      {errors.title}
                    </Text>
                  )}

                  {/* For mobile number */}
                  <View style={{marginVertical: 10}}>
                    <TextInputUI
                      title={'Contact'}
                      onChangeText={handleChange('contact')}
                      onBlur={handleBlur('contact')}
                      value={values.contact}
                      autoCapitalize="words"
                      placeHolder="Enter your contact"
                      keyboardType={'numeric'}
                    />
                  </View>
                  {errors.contact && touched.contact && (
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#CD1818',
                        fontWeight: 'bold',
                      }}>
                      {errors.contact}
                    </Text>
                  )}

                  {/* For Type of trip */}
                  <View
                    style={{
                      marginVertical: 10,
                      borderColor: 'black',
                      borderWidth: 1.2,
                    }}>
                    <View
                      style={{
                        height: 25,
                        backgroundColor: 'white',
                        justifyContent: 'flex-end',
                      }}>
                      <Text
                        style={{
                          paddingLeft: 10,
                          fontWeight: 'bold',
                          color: 'black',
                        }}>
                        Type of Trip
                      </Text>
                    </View>
                    <View
                      style={{
                        height: 40,
                        flexDirection: 'row',
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          height: 40,
                          width: '50%',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <RadioButton
                          value={1}
                          uncheckedColor="#CD1818"
                          color="#CD1818"
                          status={typeOfTrip === 1 ? 'checked' : 'unchecked'}
                          onPress={() => setTypeOfTrip(1)}
                        />
                        <Text style={{fontWeight: 'bold', color: 'black'}}>
                          Return
                        </Text>
                      </View>
                      <View
                        style={{
                          height: 40,
                          width: '50%',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <RadioButton
                          value={0}
                          uncheckedColor="#CD1818"
                          color="#CD1818"
                          status={typeOfTrip === 0 ? 'checked' : 'unchecked'}
                          onPress={() => setTypeOfTrip(0)}
                        />
                        <Text style={{fontWeight: 'bold', color: 'black'}}>
                          Drop
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* For start location */}
                  <View style={{marginTop: 10, marginBottom: 5}}>
                    <TextInputUI
                      title={'Start location'}
                      onChangeText={handleChange('start')}
                      onBlur={handleBlur('start')}
                      value={values.start}
                      autoCapitalize="words"
                      placeHolder="Enter your starting location"
                    />
                  </View>
                  {errors.start && touched.start && (
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#CD1818',
                        fontWeight: 'bold',
                      }}>
                      {errors.start}
                    </Text>
                  )}

                  {/* For start date and time */}
                  <TouchableNativeFeedback
                    onPress={() =>
                      setIsDatePickerVisible({startDateTime: true})
                    }>
                    {startDateTime.length === 0 ? (
                      <View
                        style={{
                          marginVertical: 10,
                          borderColor: 'black',
                          borderWidth: 1.2,
                        }}>
                        <View
                          style={{
                            height: 25,
                            backgroundColor: 'white',
                            justifyContent: 'flex-end',
                          }}>
                          <Text
                            style={{
                              paddingLeft: 10,
                              fontWeight: 'bold',
                              color: 'black',
                            }}>
                            Start Date and time
                          </Text>
                        </View>
                        <View
                          style={{
                            height: 40,
                            backgroundColor: 'white',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              paddingLeft: 10,
                              fontSize: 16,
                              color: 'grey',
                            }}>
                            Tap to select start date and time
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <View
                        style={{
                          marginVertical: 10,
                          borderColor: 'black',
                          borderWidth: 1.2,
                        }}>
                        <View
                          style={{
                            height: 25,
                            backgroundColor: 'white',
                            justifyContent: 'flex-end',
                          }}>
                          <Text style={{paddingLeft: 10, fontWeight: 'bold'}}>
                            Start date and time
                          </Text>
                        </View>
                        <View
                          style={{
                            height: 40,
                            backgroundColor: 'white',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              paddingLeft: 10,
                              fontSize: 16,
                              color: 'black',
                            }}>
                            {moment(startDateTime.toString()).format('lll')}
                          </Text>
                        </View>
                      </View>
                    )}
                  </TouchableNativeFeedback>

                  {/* For destination */}
                  <View style={{marginTop: 10, marginBottom: 5}}>
                    <TextInputUI
                      title={'Destination'}
                      onChangeText={handleChange('destination')}
                      onBlur={handleBlur('destination')}
                      value={values.destination}
                      autoCapitalize="words"
                      placeHolder="Enter your destination"
                    />
                  </View>
                  {errors.destination && touched.destination && (
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#CD1818',
                        fontWeight: 'bold',
                      }}>
                      {errors.destination}
                    </Text>
                  )}

                  {/* For end date and time */}
                  <TouchableNativeFeedback
                    onPress={() => setIsDatePickerVisible({endDateTime: true})}>
                    {endDateTime.length === 0 ? (
                      <View
                        style={{
                          marginTop: 10,
                          borderColor: 'black',
                          borderWidth: 1.2,
                        }}>
                        <View
                          style={{
                            height: 25,
                            backgroundColor: 'white',
                            justifyContent: 'flex-end',
                          }}>
                          <Text
                            style={{
                              paddingLeft: 10,
                              fontWeight: 'bold',
                              color: 'black',
                            }}>
                            End Date and time
                          </Text>
                        </View>
                        <View
                          style={{
                            height: 40,
                            backgroundColor: 'white',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              paddingLeft: 10,
                              fontSize: 16,
                              color: 'grey',
                            }}>
                            Tap to select end date and time
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <View
                        style={{
                          marginVertical: 10,
                          borderColor: 'black',
                          borderWidth: 1.2,
                        }}>
                        <View
                          style={{
                            height: 25,
                            backgroundColor: 'white',
                            justifyContent: 'flex-end',
                          }}>
                          <Text style={{paddingLeft: 10, fontWeight: 'bold'}}>
                            End date
                          </Text>
                        </View>
                        <View
                          style={{
                            height: 40,
                            backgroundColor: 'white',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              paddingLeft: 10,
                              fontSize: 16,
                              color: 'black',
                            }}>
                            {moment(endDateTime.toString()).format('lll')}
                          </Text>
                        </View>
                      </View>
                    )}
                  </TouchableNativeFeedback>
                </ScrollView>
              )}
              {currentPosition === 1 && (
                <>
                  {values.totalDistance && values.kmCharges && (
                    <View
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        height: 40,
                        backgroundColor: '#CD1818',
                        borderRadius: 6,
                      }}>
                      <Text
                        style={{
                          paddingLeft: 10,
                          fontWeight: 'bold',
                          color: 'white',
                        }}>
                        Total Charges:{' '}
                        {Number(values?.totalDistance) *
                          Number(values?.kmCharges) +
                          Number(values?.stayCharges) +
                          Number(values?.tip) -
                          Number(values?.discount)}
                      </Text>
                    </View>
                  )}
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                      paddingTop:
                        !values.totalDistance && !values.kmCharges ? 20 : 5,
                      paddingBottom: 20,
                    }}>
                    {/* For total distance */}
                    <View>
                      <TextInputUI
                        title={'Total Distance'}
                        onChangeText={handleChange('totalDistance')}
                        onBlur={handleBlur('totalDistance')}
                        value={values.totalDistance}
                        autoCapitalize="words"
                        placeHolder="Enter total distance"
                        keyboardType={'numeric'}
                      />
                    </View>
                    {errors.totalDistance && touched.totalDistance && (
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#CD1818',
                          fontWeight: 'bold',
                        }}>
                        {errors.totalDistance}
                      </Text>
                    )}

                    {/* For charges per km */}
                    <View style={{marginTop: 10, marginBottom: 5}}>
                      <TextInputUI
                        title={'KM Charges'}
                        onChangeText={handleChange('kmCharges')}
                        onBlur={handleBlur('kmCharges')}
                        value={values.kmCharges}
                        autoCapitalize="words"
                        placeHolder="Enter charges per km"
                        keyboardType={'numeric'}
                      />
                    </View>
                    {errors.kmCharges && touched.kmCharges && (
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#CD1818',
                          fontWeight: 'bold',
                        }}>
                        {errors.kmCharges}
                      </Text>
                    )}

                    {/* For Stay Charges */}
                    <View style={{marginTop: 10, marginBottom: 5}}>
                      <TextInputUI
                        title={'Stay Charges'}
                        onChangeText={handleChange('stayCharges')}
                        onBlur={handleBlur('stayCharges')}
                        value={values.stayCharges}
                        autoCapitalize="words"
                        placeHolder="Enter stay charges"
                        keyboardType={'numeric'}
                      />
                    </View>
                    {errors.stayCharges && touched.stayCharges && (
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#CD1818',
                          fontWeight: 'bold',
                        }}>
                        {errors.stayCharges}
                      </Text>
                    )}

                    {/* For tip */}
                    <View style={{marginTop: 10, marginBottom: 5}}>
                      <TextInputUI
                        title={'Tip'}
                        onChangeText={handleChange('tip')}
                        onBlur={handleBlur('tip')}
                        value={values.tip}
                        autoCapitalize="words"
                        placeHolder="Enter tip"
                        keyboardType={'numeric'}
                      />
                    </View>
                    {errors.tip && touched.tip && (
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#CD1818',
                          fontWeight: 'bold',
                        }}>
                        {errors.tip}
                      </Text>
                    )}

                    {/* For discount */}
                    <View style={{marginTop: 10, marginBottom: 5}}>
                      <TextInputUI
                        title={'Discount'}
                        onChangeText={handleChange('discount')}
                        onBlur={handleBlur('discount')}
                        value={values.discount}
                        autoCapitalize="words"
                        placeHolder="Enter discount"
                        keyboardType={'numeric'}
                      />
                    </View>
                    {errors.discount && touched.discount && (
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#CD1818',
                          fontWeight: 'bold',
                        }}>
                        {errors.discount}
                      </Text>
                    )}
                  </ScrollView>
                </>
              )}
              {currentPosition === 2 && (
                <>
                  {values.dieselCost && (
                    <View
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        height: 40,
                        backgroundColor: '#CD1818',
                        borderRadius: 6,
                      }}>
                      <Text
                        style={{
                          paddingLeft: 10,
                          fontWeight: 'bold',
                          color: 'white',
                        }}>
                        Total Cost:{' '}
                        {Number(values?.dieselCost) +
                          Number(values?.tolls) +
                          Number(values?.carMaintain) +
                          Number(values?.fines) +
                          Number(values?.misc) +
                          Number(values?.commission)}
                      </Text>
                    </View>
                  )}
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                      paddingTop: !values.dieselCost ? 20 : 5,
                      paddingBottom: 20,
                    }}>
                    {/* For Diesel */}
                    <View>
                      <TextInputUI
                        title={'Diesel cost'}
                        onChangeText={handleChange('dieselCost')}
                        onBlur={handleBlur('dieselCost')}
                        value={values.dieselCost}
                        autoCapitalize="words"
                        placeHolder="Enter diesel cost"
                        keyboardType={'numeric'}
                      />
                    </View>
                    {errors.dieselCost && touched.dieselCost && (
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#CD1818',
                          fontWeight: 'bold',
                        }}>
                        {errors.dieselCost}
                      </Text>
                    )}

                    {/* For tolls */}
                    <View style={{marginTop: 10, marginBottom: 5}}>
                      <TextInputUI
                        title={'Tolls cost'}
                        onChangeText={handleChange('tolls')}
                        onBlur={handleBlur('tolls')}
                        value={values.tolls}
                        autoCapitalize="words"
                        placeHolder="Enter tolls"
                        keyboardType={'numeric'}
                      />
                    </View>
                    {errors.tolls && touched.tolls && (
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#CD1818',
                          fontWeight: 'bold',
                        }}>
                        {errors.tolls}
                      </Text>
                    )}

                    {/* For Car Maintenance */}
                    <View style={{marginTop: 10, marginBottom: 5}}>
                      <TextInputUI
                        title={'Car Maintenance cost'}
                        onChangeText={handleChange('carMaintain')}
                        onBlur={handleBlur('carMaintain')}
                        value={values.carMaintain}
                        autoCapitalize="words"
                        placeHolder="Enter car maintenance cost"
                        keyboardType={'numeric'}
                      />
                    </View>
                    {errors.carMaintain && touched.carMaintain && (
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#CD1818',
                          fontWeight: 'bold',
                        }}>
                        {errors.carMaintain}
                      </Text>
                    )}

                    {/* For Fines */}
                    <View style={{marginTop: 10, marginBottom: 5}}>
                      <TextInputUI
                        title={'Fines cost'}
                        onChangeText={handleChange('fines')}
                        onBlur={handleBlur('fines')}
                        value={values.fines}
                        autoCapitalize="words"
                        placeHolder="Enter fines cost"
                        keyboardType={'numeric'}
                      />
                    </View>
                    {errors.fines && touched.fines && (
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#CD1818',
                          fontWeight: 'bold',
                        }}>
                        {errors.fines}
                      </Text>
                    )}

                    {/* For Miscellenous */}
                    <View style={{marginTop: 10, marginBottom: 5}}>
                      <TextInputUI
                        title={'Miscellenous cost'}
                        onChangeText={handleChange('misc')}
                        onBlur={handleBlur('misc')}
                        value={values.misc}
                        autoCapitalize="words"
                        placeHolder="Enter miscellenous cost"
                        keyboardType={'numeric'}
                      />
                    </View>
                    {errors.misc && touched.misc && (
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#CD1818',
                          fontWeight: 'bold',
                        }}>
                        {errors.misc}
                      </Text>
                    )}

                    {/* For Commission */}
                    <View style={{marginTop: 10, marginBottom: 5}}>
                      <TextInputUI
                        title={'Commission'}
                        onChangeText={handleChange('commission')}
                        onBlur={handleBlur('commission')}
                        value={values.commission}
                        autoCapitalize="words"
                        placeHolder="Enter commission cost"
                        keyboardType={'numeric'}
                      />
                    </View>
                    {errors.commission && touched.commission && (
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#CD1818',
                          fontWeight: 'bold',
                        }}>
                        {errors.commission}
                      </Text>
                    )}
                  </ScrollView>
                </>
              )}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 70,
              }}>
              {currentPosition !== 0 && (
                <TouchableNativeFeedback
                  onPress={() => setCurrentPosition(currentPosition - 1)}>
                  <View
                    style={{
                      width: '49%',
                      height: 50,
                      borderRadius: 6,
                      marginVertical: 10,
                      backgroundColor: '#CD1818',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 20,
                        fontWeight: 'bold',
                      }}>
                      Prev
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              )}
              {currentPosition !== 2 ? (
                <TouchableNativeFeedback onPress={handleSubmit}>
                  <View
                    style={{
                      width: currentPosition === 0 ? '100%' : '49%',
                      height: 50,
                      borderRadius: 6,
                      marginVertical: 10,
                      backgroundColor: '#CD1818',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 20,
                        fontWeight: 'bold',
                      }}>
                      Next
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              ) : (
                <TouchableNativeFeedback onPress={handleSubmit}>
                  <View
                    style={{
                      width: '49%',
                      height: 50,
                      borderRadius: 6,
                      marginVertical: 10,
                      backgroundColor: '#CD1818',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 20,
                        fontWeight: 'bold',
                      }}>
                      Submit
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              )}
            </View>
          </View>
        )}
      </Formik>
      <DateTimePickerModal
        isVisible={
          isDatePickerVisible['startDateTime'] ||
          isDatePickerVisible['endDateTime']
        }
        mode="datetime"
        onConfirm={date => handleConfirm(date)}
        onCancel={() => {
          hideDatePicker();
        }}
      />
    </View>
  );
};

export default NewTripForm;

const styles = StyleSheet.create({});
