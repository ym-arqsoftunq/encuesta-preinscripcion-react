import React, { Component } from 'react';
import TablaResultados from './TablaResultados';

class VistaDirector extends Component {

  constructor(props) {
    super(props);
    this.state = {
      datos: props.datos
    };
  }

  render() {
      return (
          <div className="container">
              <div className="row">
                  <TablaResultados datos={this.state.datos}/>
              </div>
          </div>
      );
  }
}

export default VistaDirector;
