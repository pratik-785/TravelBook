import React from 'react';
import {View, Image, Dimensions, StyleSheet, Text} from 'react-native';
import Header from '../Components/Header';
import Carousel from 'react-native-snap-carousel';
import AnimatedTextUI from '../Components/AnimatedTextUI';
import {fetchAllTrips, selectMyTrips} from '../store/tripSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';

const Width = Dimensions.get('window').width;

const Home = props => {
  const photos = [
    {
      id: 1,
      image: require('../Utility/Images/Nursing2.jpg'),
    },
    {
      id: 2,
      image: require('../Utility/Images/Nursing3.jpg'),
    },
    {
      id: 3,
      image: require('../Utility/Images/Nursing4.jpg'),
    },
  ];

  const myTrips = useSelector(selectMyTrips);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!myTrips) {
      dispatch(fetchAllTrips());
    }
  }, [myTrips]);

  const renderItem = ({item, index}) => {
    return (
      <View>
        <Image
          source={item.image}
          style={{
            width: Width - 20,
            height: 150,
            resizeMode: 'cover',
            borderRadius: 6,
          }}
        />
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#f2f2f2'}}>
      <Header
        headerTitle={'TravelBook'}
        showArrow={false}
        navigation={props.navigation}
      />
      <View style={{flex: 1}}>
        <View style={{height: 150, marginVertical: 10, borderRadius: 6}}>
          <Carousel
            data={photos}
            renderItem={renderItem}
            layout={'default'}
            sliderWidth={Width}
            itemWidth={Width}
            slideStyle={{alignItems: 'center'}}
          />
        </View>
        <View
          style={{
            height: 200,
            backgroundColor: 'white',
            borderRadius: 6,
            marginHorizontal: 10,
          }}>
          <View style={{height: 100}}>
            <View>
              <AnimatedTextUI
                value={myTrips?.length}
                fontSize={35}
                fontWeight={'900'}
                textColor={'#CD1818'}
              />
              <Text
                style={{
                  fontSize: 18,
                  marginTop: 60,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Total Trips
              </Text>
            </View>
          </View>
          <View
            style={{
              height: 100,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <View style={{marginBottom: 15}}>
              <AnimatedTextUI
                value={65}
                fontSize={24}
                fontWeight={'900'}
                textColor={'#CD1818'}
              />
              <Text style={{fontSize: 15, marginTop: 50, fontWeight: 'bold'}}>
                Trips this month
              </Text>
            </View>
            <View style={{marginBottom: 15}}>
              <AnimatedTextUI
                value={55}
                fontSize={24}
                fontWeight={'900'}
                textColor={'#CD1818'}
              />
              <Text style={{fontSize: 15, marginTop: 50, fontWeight: 'bold'}}>
                Trips last month
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
