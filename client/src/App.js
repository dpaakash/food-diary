import React from 'react';
import Header from './components/Header';
import FDEditor from './components/FDEditor';
import FDViewer from './components/FDViewer';
import ItemAdder from './components/ItemAdder';
import './App.css';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      date : new Date(),
      // set to true when save button is clicked
      saved: false
    }
  }
  
  render() {
    return (
      <div>
          <Header date={this.state.date} setDate={this.setDate} />
          <FDViewer date={this.state.date} saved={this.state.saved} />
          <FDEditor date={this.state.date} setSaved={this.setSaved} saved={this.state.saved} />
          <ItemAdder />
      </div>
    );
  }

  setDate = (newDate) => {this.setState({date : newDate})};
  setSaved = (val) =>  {this.setState({saved: val})};
}

export default App;
