import React from 'react';
import './index.css';
import Header from '../Header';
import Aside from '../Aside';
import Status from '../Status';
class App extends React.Component {

  render(){
    return (
      <div className="App">
        <Header />
        <Aside />
          <div className="container">
            <Status />
          </div>
      </div>
    );
  }
}

export default App;
