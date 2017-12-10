import React, { Component } from 'react';

class Alumno extends Component {

    constructor(props) {
      super(props);
      this.state = {email: props.email}
    }

  render() {
    return (
        <div id="alumno" className="col-md-4">
            <h5>Bienvenido {this.state.email}</h5>
        </div>
       );

  }
}

export default Alumno;
