import React, { Component } from 'react';
import Header from './Components/Header';
import Materia from './Components/Materia';
import './App.css';

class App extends Component {
  render() {
    return (
        <div className="App">
            <Header />
            <Materia />
        </div>
    );
  }
}

export default App;
