import React, { Component } from 'react';
import TablaResultados from './TablaResultados';
import GraficoBarras from './GraficoBarras';


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
          <GraficoBarras datos={this.state.datos.encuestas}/>
              <div className="row">
                  <TablaResultados datos={this.state.datos}/>
              </div>
          </div>
      );
  }
}

export default VistaDirector;
