import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Platform, Alert } from 'react-native';
import * as Location from "expo-location";
import { configureBgTasks } from '../task';
import * as TaskManager from 'expo-task-manager';
import AsyncStorage from '@react-native-community/async-storage';

import { connect } from "react-redux";

import ourReducer from '../store/reducer';

const TASK_FETCH_LOCATION_TEST = 'background-location-task';

class Home extends Component {

  state = {
    submitted: false
  }

  async componentDidMount() {
    const { status } = await Location.requestPermissionsAsync();
    if (status === 'granted') {
      console.log('location permissions are granted...')
    }
  }
  
    stopBackgroundUpdate = async () => {
      Alert.alert('TRACKING IS STOPPED');
      await AsyncStorage.setItem('submitted', 'FALSE')
      //Location.stopLocationUpdatesAsync(TASK_FETCH_LOCATION_TEST)
  
      //UNREGISTER TASK
      //const TASK_FETCH_LOCATION_TEST = 'background-location-task_global';
      TaskManager.unregisterTaskAsync(TASK_FETCH_LOCATION_TEST);
    }

    //REFERENCES TO STATE
    autoTrackingCheckin = async () => {
      console.log('^^firing checkin')
      this.setState({ submitted: true });
      await AsyncStorage.setItem('submitted', 'TRUE')
      this.props.storeCheck(true)
      //store.dispatch({ type: "SUBMITTED", value: true })
    }

    autoTrackingCheckout = async () => {
      console.log('^^firing checkout')
      this.setState({ submitted: false });
      await AsyncStorage.setItem('submitted', 'FALSE')
      //store.dispatch({ type: "SUBMITTED", value: false })
    }
  
    executeBackground = async () => {

      //START LOCATION TRACKING
      const startBackgroundUpdate = async () => {
        Alert.alert('TRACKING IS STARTED');
    
        if(Platform.OS==='ios') {
    
          await Location.startLocationUpdatesAsync(TASK_FETCH_LOCATION_TEST, {
            accuracy: Location.Accuracy.BestForNavigation,
            //timeInterval: 1000,
            distanceInterval: 2, // minimum change (in meters) betweens updates
            //deferredUpdatesInterval: 1000, // minimum interval (in milliseconds) between updates
            // foregroundService is how you get the task to be updated as often as would be if the app was open
            foregroundService: {
              notificationTitle: 'Using your location for TESTING',
              notificationBody: 'To turn off, go back to the app and toggle tracking.',
            },
            pausesUpdatesAutomatically: false,
          });
    
        } else {
    
          await Location.startLocationUpdatesAsync(TASK_FETCH_LOCATION_TEST, {
            accuracy: Location.Accuracy.BestForNavigation,
            timeInterval: 10000,
            //distanceInterval: 1, // minimum change (in meters) betweens updates
            //deferredUpdatesInterval: 1000, // minimum interval (in milliseconds) between updates
            // foregroundService is how you get the task to be updated as often as would be if the app was open
            foregroundService: {
              notificationTitle: 'Using your location for TESTING',
              notificationBody: 'To turn off, go back to the app and toggle tracking.',
            },
            pausesUpdatesAutomatically: false,
          });
  
        }
      }

       //WHERE THE MAGIC IS SUPPOSED TO HAPPEN
        try {

          //REFERENCES FOR VARIABLES AND FUNCTIONS
          const submitted = this.state.submitted
          const autoCheckin = this.autoTrackingCheckin
          const autoCheckout = this.autoTrackingCheckout
          const reducerSubmitted = this.props.reducer.submitted

          //console.log('THE VARIABLE BEING PASSED...',reducerSubmitted)
          configureBgTasks({ reducerSubmitted,autoCheckin, autoCheckout })
          startBackgroundUpdate();
        }
        catch (error) {
          console.log(error)
        }

    }

  render() {

    //console.log('***********APP.JS STATUS:', this.state.submitted);
    console.log('***********REDUCER APP.JS STATUS:', this.props.reducer.submitted);

    return (
   
      <View style={styles.container}>
      
      <Button
          onPress={this.executeBackground}
          title="START TRACKING"
        />
        
        <Button
          onPress={this.stopBackgroundUpdate}
          title="STOP TRACKING"
        />
      <StatusBar style="auto" />
      </View>
  
    );
  }
}

const mapStateToProps = (state) => {

  const { reducer } = state
  return { reducer }
};

const mapDispachToProps = dispatch => {
  return {
    storeCheck: (y) => dispatch({ type: "SUBMITTED", value: y })

  };
};

export default connect(mapStateToProps, mapDispachToProps)(Home);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
