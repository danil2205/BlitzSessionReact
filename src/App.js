import './App.css';
import { Component } from 'react';
import { BrowserRouter} from 'react-router-dom';
import Main from './components/MainComponent.js';
import { ConfigureStore } from './redux/configureStore.js';
import { Provider } from 'react-redux';

const store = ConfigureStore();

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className='App'>
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}


export default App;
