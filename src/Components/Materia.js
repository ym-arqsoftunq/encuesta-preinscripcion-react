import React, { Component } from 'react';

class Materia extends Component {

  constructor(props) {
    super(props);
    this.state = props.datos;
  }

  renderMateria(){
      return (
          <div>
          <h5>{this.state.nombre}</h5>
          <select id={this.state.id} key={this.state.id}>
      {this.state.comisiones.map(
          function(comision, i){
              return <option id={comision.id} value={comision.id} key={i}>{comision.descripcion}</option>;
          })
      }
      </select>
      </div>)
  }

  render() {
    return (
        <div>
            {this.renderMateria()}
       </div>

      );

  }
}

export default Materia;
