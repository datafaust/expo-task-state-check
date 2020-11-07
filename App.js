import React, {Component} from 'react';
import Home from './components/Home'
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import ourReducer from './store/reducer';
const store = createStore(ourReducer);

export default class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { loading: true };
  // }

  // async componentDidMount() {
  //   await Font.loadAsync({
  //     Roboto: require('native-base/Fonts/Roboto.ttf'),
  //     Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
  //   });
  //   this.setState({ loading: false });
  // }
  

  render(){
    // if (this.state.loading) {
    //   return (
    //     <Root>
    //       <AppLoading />
    //     </Root>
    //   );
    // } else {
    return (
      
      <Provider store={ store }>
       
        <Home/>
      </Provider>
    );
    }
  //}

}
