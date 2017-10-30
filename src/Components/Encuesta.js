import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import ConjuntoDeMateriasAprobadas from './ConjuntoDeMateriasAprobadas';
import ConjuntoDeMateriasCursables from './ConjuntoDeMateriasCursables';

class EncuestaForm extends Component {

  constructor(props) {
    super(props);
    this.state = props.oferta ;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
        return (
        <form onSubmit={this.handleSubmit} className="form-group">
          <div className="row">
                <ConjuntoDeMateriasAprobadas materias={this.state.materias_aprobadas} />
                <ConjuntoDeMateriasCursables materias={this.state.materias_cursables} />
         </div>
         <Button type='Submit' bsStyle="primary" bsSize="large"> Confirmar </Button>
       </form>
        );
  }
}

export default EncuestaForm;
