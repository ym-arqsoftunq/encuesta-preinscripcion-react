import React, { Component } from 'react';
import TablaResultados from './TablaResultados';

class VistaDirector extends Component {

  constructor(props) {
    super(props);
  }

  render() {
      return (
          <div className="container">
              <div className="row">
                  <TablaResultados/>
              </div>
          </div>
      );
  }
}

export default VistaDirector;
