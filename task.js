import * as TaskManager from 'expo-task-manager';
import { connect } from "react-redux";
const TASK_FETCH_LOCATION_TEST = 'background-location-task';
import ourReducer from './store/reducer';
import { createStore } from 'redux';
const store = createStore(ourReducer);
import AsyncStorage from '@react-native-community/async-storage';

export const configureBgTasks = async ({ reducerSubmitted, autoCheckin, autoCheckout }) => {

    TaskManager.defineTask(TASK_FETCH_LOCATION_TEST, async ({ data, error }) => {

        console.log(store.getState().reducer.test)

        if (error) {
            // Error occurred - check `error.message` for more details.
            return;
        }
        if (data) {
            //get location data from background
            const { locations } = data;
            //let myStatus = store.getState().reducer.submitted
            console.log('****PASSED LOCATION PINGING... submitted IS NOW:', reducerSubmitted);
            console.log('****REDUCER LOCATION PINGING... submitted IS NOW:', store.getState().reducer.submitted);
            console.log(store.getState().reducer.submitted)
            try{
                var value = await AsyncStorage.getItem('submitted')
              } catch(e){
          console.log('error')
              }
            if (value === 'FALSE') {
                console.log(value)
                autoCheckin();
                //store.dispatch({ type: "SUBMITTED", value: true })
                //console.log('****CHECKING YOU IN...');

            } else if(value === 'TRUE') {
                console.log(value)
                autoCheckout();
                //store.dispatch({ type: "SUBMITTED", value: false })
                //console.log('*****CHECKING YOU OUT...')
            }
        }
    })
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
  
  //export default connect(mapStateToProps, mapDispachToProps)(configureBgTasks);
  //export default configureBgTasks;
  store.subscribe(configureBgTasks)