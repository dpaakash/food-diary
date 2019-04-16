import React from 'react';
import {Header} from './header';
import {FDEditor} from './FDEditor';
import {ItemAdder} from './ItemAdder';
import './App.css';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      date : new Date()
    }
  }
  
  render() {
    return (
      <div>
          <Header date={this.state.date} setDate={this.setDate} />
          <hr />
          <FDEditor date={this.state.date} />
          <hr />
          <ItemAdder />
      </div>
    );
  }

  setDate = (newDate) => {this.setState({date : newDate})};
}

export default App;
