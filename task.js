import * as TaskManager from 'expo-task-manager';
import { connect } from "react-redux";
const TASK_FETCH_LOCATION_TEST = 'background-location-task';
import ourReducer from './store/reducer';
import { createStore } from 'redux';
const store = createStore(ourReducer);

export const configureBgTasks = ({ reducerSubmitted, autoCheckin, autoCheckout }) => {

    TaskManager.defineTask(TASK_FETCH_LOCATION_TEST, ({ data, error }) => {

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
            
            if (store.getState().reducer.submitted === false) {
                autoCheckin();
                //store.dispatch({ type: "SUBMITTED", value: true })
                //console.log('****CHECKING YOU IN...');

            } else if(store.getState().reducer.submitted === true) {
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