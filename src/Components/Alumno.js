import React, { Component } from 'react';

class Alumno extends Component {

    constructor(props) {
      super(props);
      this.state = {nombre: props.datos.nombre, id: props.datos.id}
    }

  render() {
    return (
        <div id="alumno" className="col-md-4">
            <h5>Bienvenido {this.state.nombre}</h5>
        </div>
       );

  }
}

export default Alumno;
