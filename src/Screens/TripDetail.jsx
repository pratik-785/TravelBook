import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Header from '../Components/Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Linking} from 'react-native';
import StepIndicator from 'react-native-step-indicator';

const TripDetail = props => {
  const item = props.route.params;
  const [currentPosition, setCurrentPosition] = useState(3);

  const dialCall = number => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };

  let Total =
    item.totalDistance * item.kmCharges +
    item.stayCharges +
    item.tip -
    item.discount;
  let Cost =
    item.dieselCost +
    item.tolls +
    item.carMaintain +
    item.fines +
    item.misc +
    item.commission;

  const labels =
    item.typeOfTrip === 1
      ? [
          {location: item.start, date: item.startDateTime},
          {location: item.destination},
          {location: item.start, date: item.endDateTime},
        ]
      : [
          {location: item.start, date: item.startDateTime},
          {location: item.destination, date: item.endDateTime},
        ];
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
      <Header
        headerTitle={item.title}
        navigation={props.navigation}
        rightIconTitle={'phone'}
        onRightIconPress={() => {
          dialCall(item.contact);
        }}
      />
      <View style={{padding: 10}}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 6,
            paddingVertical: 25,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FontAwesome
              name="rupee"
              size={29}
              color={'#CD1818'}
              style={{marginTop: 5}}
            />
            <Text
              style={{
                fontSize: 35,
                fontWeight: 'bold',
                color: '#CD1818',
                paddingLeft: 5,
              }}>
              {Total}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Total Pay
          </Text>
        </View>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 6,
            paddingBottom: 25,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FontAwesome
                name="rupee"
                size={20}
                color={'#CD1818'}
                style={{marginTop: 5}}
              />
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: '#CD1818',
                  paddingLeft: 5,
                }}>
                {Total - Cost}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Total Profit
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FontAwesome
                name="rupee"
                size={20}
                color={'#CD1818'}
                style={{marginTop: 5}}
              />
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: '#CD1818',
                  paddingLeft: 5,
                }}>
                {Cost}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Total Cost
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: 'white',
            borderRadius: 6,
            marginVertical: 10,
            height: '40%',
            paddingVertical: 10,
            paddingHorizontal: 20,
          }}>
          <View>
            <StepIndicator
              customStyles={customStyles}
              currentPosition={currentPosition}
              labels={labels}
              stepCount={item.typeOfTrip === 1 ? 3 : 2}
              direction={'vertical'}
              renderStepIndicator={() => {
                return <Ionicons name="location" size={15} color={'white'} />;
              }}
              renderLabel={data => {
                return (
                  <View>
                    <Text
                      style={{
                        paddingLeft: 15,
                        fontSize: 16,
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}>
                      {data?.label?.location}
                    </Text>
                    {data?.label?.date && (
                      <Text
                        style={{
                          paddingLeft: 15,
                          fontSize: 12,
                        }}>
                        {data?.label?.date}
                      </Text>
                    )}
                  </View>
                );
              }}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: '#CD1818',
                }}>
                {item.totalDistance}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#CD1818',
                  paddingLeft: 5,
                }}>
                KM
              </Text>
            </View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Total Distance
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TripDetail;

const styles = StyleSheet.create({});
