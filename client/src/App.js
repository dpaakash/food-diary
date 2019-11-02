import React from 'react';
import Header from './components/Header';
import {FDEditor} from './components/FDEditor';
import {FDViewer} from './components/FDViewer';
import {ItemAdder} from './components/ItemAdder';
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
          <FDViewer date={this.state.date} />
          <FDEditor date={this.state.date} />
          <ItemAdder />
      </div>
    );
  }

  setDate = (newDate) => {this.setState({date : newDate})};
}

export default App;
