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
              <div className="row">
                <div className="col-lg-10">
                    <TablaResultados datos={this.state.datos}/>
                </div>
                <div className="col-lg-2">
                    <GraficoBarras datos={this.state.datos.encuestas}/>
                </div>
              </div>
          </div>
      );
  }
}

export default VistaDirector;
