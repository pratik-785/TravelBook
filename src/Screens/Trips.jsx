import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import React from 'react';
import Header from '../Components/Header';
import {FAB} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchAllTrips,
  selectMyTrips,
  selectMyTripsLoading,
} from '../store/tripSlice';
import {useEffect} from 'react';

const Trips = props => {
  const dispatch = useDispatch();
  const myTrips = useSelector(selectMyTrips);
  const myTripsLoading = useSelector(selectMyTripsLoading);

  useEffect(() => {
    if (!myTrips) {
      dispatch(fetchAllTrips());
    }
  }, [myTrips]);

  const renderRowItem = (itemData, key) => {
    return (
      <TouchableNativeFeedback
        onPress={() => props.navigation.navigate('TripDetail', itemData)}>
        <View
          id={key}
          style={{
            width: '100%',
            backgroundColor: 'white',
            padding: 10,
            marginVertical: 10,
            borderRadius: 6,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 16, color: '#CD1818', fontWeight: 'bold'}}>
              {itemData.title}
            </Text>
            <Text style={{fontSize: 18, color: '#CD1818', fontWeight: 'bold'}}>
              {itemData.totalDistance} KM
            </Text>
          </View>
          {itemData.typeOfTrip === 1 ? (
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                {itemData.start}
              </Text>
              <Text style={{fontSize: 14, fontWeight: 'bold'}}>------</Text>
              <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                {itemData.destination}
              </Text>
              <Text style={{fontSize: 14, fontWeight: 'bold'}}>------</Text>
              <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                {itemData.start}
              </Text>
            </View>
          ) : (
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                {itemData.start}
              </Text>
              <Text style={{fontSize: 14, fontWeight: 'bold'}}>------</Text>
              <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                {itemData.destination}
              </Text>
            </View>
          )}
        </View>
      </TouchableNativeFeedback>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#f2f2f2'}}>
      <Header headerTitle={'My Trips'} navigation={props.navigation} />
      <FAB
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
          backgroundColor: '#CD1818',
        }}
        medium
        icon="plus"
        color="white"
        onPress={() => props.navigation.navigate('NewTripForm')}
      />
      <View style={{padding: 10}}>
        {myTripsLoading ? (
          <View
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator color={'#CD1818'} size={35} />
          </View>
        ) : (
          <FlatList
            data={myTrips}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => renderRowItem(item, index)}
          />
        )}
      </View>
    </View>
  );
};

export default Trips;

const styles = StyleSheet.create({});
