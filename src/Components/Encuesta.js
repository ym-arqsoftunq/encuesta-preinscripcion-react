import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import MateriasAprobadas from './MateriasAprobadas';
import Oferta from './Oferta';
import Preinscripcion from './Preinscripcion';
import axios from 'axios';

class Encuesta extends Component {

  constructor(props) {
    super(props);
    let estado = props.oferta;
    this.state = estado;
    this.state.backend_url= props.backend_url;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.marcar_aprobada = this.marcar_aprobada.bind(this);
    this.desmarcar_aprobada = this.desmarcar_aprobada.bind(this);
    this.preinscribir = this.preinscribir.bind(this);
    this.des_preinscribir = this.des_preinscribir.bind(this);
  }

  handleChange(event) {
      this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    let url = this.state.backend_url + 'preinscribir';
    axios.post(url, {
      alumno: this.state.alumno,
      materias_aprobadas: this.state.materias_aprobadas,
      materias_preinscripcion: this.state.materias_preinscripcion,
      materias_cursables: this.state.materias_cursables,
      oferta: this.state.oferta
    })
      .then(function (response) {
        alert('Preincripcion exitosa');
      })
      .catch(function (error) {
        alert('Preincripcion fallida');
        console.log(error);
      });
  }

  marcar_aprobada(materia)
  {
    // quito la materia de materias cursables (Oferta)
    let materias_cursables = this.state.materias_cursables.filter(function(m){
      return m.id !== materia.id;
    });

    // agrego la materia a materias aprobadas
    let materias_aprobadas = this.state.materias_aprobadas;
    materias_aprobadas.push(materia);

    this.setState({
      materias_cursables: materias_cursables,
      materias_aprobadas: materias_aprobadas
    });
  }

  desmarcar_aprobada(materia)
  {
    // quito la materia de materias aprobadas
    let materias_aprobadas = this.state.materias_aprobadas.filter(function(m){
      return m.id !== materia.id;
    });

    // agrego la materia a materias cursables
    let materias_cursables = this.state.materias_cursables;
    materias_cursables.push(materia);

    this.setState({
      materias_cursables: materias_cursables,
      materias_aprobadas: materias_aprobadas
    });
  }

  preinscribir(materia,comision)
  {
    // quito la materia de materias cursables (Oferta)
    let materias_cursables = this.state.materias_cursables.filter(function(m){
      return m.id !== materia.id;
    });

    // agrego la materia a Preinscripcion
    let materias_preinscripcion = this.state.materias_preinscripcion;
    materia.comision_seleccionada = comision;
    materias_preinscripcion.push(materia);

    this.setState({
      materias_cursables: materias_cursables,
      materias_preinscripcion: materias_preinscripcion
    });
  }

  des_preinscribir(materia)
  {
    // quito la materia de Preinscripcion
    let materias_preinscripcion = this.state.materias_preinscripcion.filter(function(m){
      return m.id !== materia.id;
    });

    // agrego la materia a materias cursables
    let materias_cursables = this.state.materias_cursables;
    materias_cursables.push(materia);

    this.setState({
      materias_cursables: materias_cursables,
      materias_preinscripcion: materias_preinscripcion
    });
  }

  render() {
        return (
        <form onSubmit={this.handleSubmit} className="form-group">
          <div className="row">
                <MateriasAprobadas materias={this.state.materias_aprobadas} desmarcar_aprobada_prop={this.desmarcar_aprobada}/>
                <Oferta materias={this.state.materias_cursables} marcar_aprobada_prop={this.marcar_aprobada}
                preinscribir_prop={this.preinscribir}/>
                <Preinscripcion materias={this.state.materias_preinscripcion} des_preinscribir_prop={this.des_preinscribir}/>
         </div>
         <Button type='Submit' bsStyle="primary" bsSize="large"> Confirmar </Button>
       </form>
        );
  }
}

export default Encuesta;
