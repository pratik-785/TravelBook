import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ToastAndroid} from 'react-native';
import {ADD_NEW_TRIP, FETCH_ALL_TRIPS} from '../Components/ApiEndpoints';
import {GetFetch, PostFetch} from '../Utility/Fetch/Fetch';

export const fetchAllTrips = createAsyncThunk(
  'trips/fetchAllTrips',
  async (_, thunkAPI) => {
    try {
      const response = await GetFetch(FETCH_ALL_TRIPS, 'withoutAuth');
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({});
    }
  },
);

export const addNewTrip = createAsyncThunk(
  'trips/addNewTrip',
  async (newTripData, thunkAPI) => {
    console.log(newTripData);
    try {
      const response = await PostFetch(
        ADD_NEW_TRIP,
        newTripData.data,
        'withoutAuth',
      );
      if (response.status === 200) {
        ToastAndroid.show('New trip added successfully', ToastAndroid.SHORT);
        newTripData.props.navigation.navigate('Trips');
        return {
          _id: response.data,
          ...newTripData.data,
        };
      }
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({});
    }
  },
);

const tripSlice = createSlice({
  name: 'trips',
  initialState: {
    myTrips: null,
    myTripsLoading: false,
    addTripLoading: false,
    saveTripModal: false,
  },
  reducers: {
    setTrips: (state, action) => {
      state.myTrips.push(action.payload);
    },
    setSaveTripModal: (state, action) => {
      state.saveTripModal = action.payload;
    },
  },
  extraReducers: builder => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchAllTrips.pending, (state, action) => {
      state.myTripsLoading = true;
    });
    builder.addCase(fetchAllTrips.fulfilled, (state, action) => {
      state.myTrips = action.payload;
      state.myTripsLoading = false;
    });
    builder.addCase(fetchAllTrips.rejected, (state, action) => {
      state.myTripsLoading = false;
    });
    builder.addCase(addNewTrip.pending, (state, action) => {
      state.addTripLoading = true;
    });
    builder.addCase(addNewTrip.fulfilled, (state, action) => {
      console.log(action.payload);
      state.myTrips.unshift(action.payload);
      state.addTripLoading = false;
      state.saveTripModal = false;
    });
    builder.addCase(addNewTrip.rejected, (state, action) => {
      state.addTripLoading = false;
      state.saveTripModal = false;
    });
  },
});

export const {setTrips, setSaveTripModal} = tripSlice.actions;

export const selectMyTrips = state => state.trips.myTrips;
export const selectMyTripsLoading = state => state.trips.myTripsLoading;
export const selectAddTripLoading = state => state.trips.addTripLoading;
export const selectSaveTripModal = state => state.trips.saveTripModal;

export default tripSlice.reducer;
