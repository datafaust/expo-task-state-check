import * as TaskManager from 'expo-task-manager';
const TASK_FETCH_LOCATION_TEST = 'background-location-task';


export const configureBgTasks = ({ submitted, autoCheckin, autoCheckout }) => {

    

    TaskManager.defineTask(TASK_FETCH_LOCATION_TEST, ({ data, error }) => {

        if (error) {
            // Error occurred - check `error.message` for more details.
            return;
        }
        if (data) {
            //get location data from background
            const { locations } = data;
            console.log('****LOCATION PINGING... submitted IS NOW:', submitted);
            

            if (submitted === false) {
                autoCheckin();
                console.log('****CHECKING YOU IN...');
            } else if(submitted === true) {
                autoCheckout();
                console.log('*****CHECKING YOU OUT...')
            }
        }
    })
}