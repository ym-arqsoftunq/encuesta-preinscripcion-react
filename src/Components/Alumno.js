import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';

class Alumno extends Component {

  constructor(props) {
    super(props);
    this.state = {email: props.email}
  }

  render() {
    return (
        <div id="alumno" className="col-md-4">
            <h5>Bienvenido {this.state.email} &nbsp;&nbsp;&nbsp;&nbsp;
            <Button onClick={this.props.salir} bsStyle="primary" bsSize="small">Salir</Button></h5>
        </div>
       );

  }
}

export default Alumno;
