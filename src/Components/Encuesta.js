import React, { Component } from 'react';
import MateriasAprobadas from './MateriasAprobadas';
import Oferta from './Oferta';
import Preinscripcion from './Preinscripcion';
import axios from 'axios';
import Entorno from '../Entorno';
import { Grid,Row, Col, Button, Alert } from 'react-bootstrap';

class Encuesta extends Component {

  constructor(props) {
    super(props);
    this.state = {
      alumno: props.datos.alumno,
      materias_cursables: props.datos.materias_cursables,
      materias_aprobadas: props.datos.materias_aprobadas,
      oferta: props.datos.oferta,
      materias_cursaria: props.datos.materias_cursaria,
      materias_preinscripcion: props.datos.materias_preinscripcion
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.marcar_aprobada = this.marcar_aprobada.bind(this);
    this.desmarcar_aprobada = this.desmarcar_aprobada.bind(this);
    this.preinscribir = this.preinscribir.bind(this);
    this.des_preinscribir = this.des_preinscribir.bind(this);
    this.marcar_cursaria = this.marcar_cursaria.bind(this);
    this.desmarcar_cursaria = this.desmarcar_cursaria.bind(this);
  }

  handleChange(event) {
      this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    let url = Entorno.getBackendUrl() + 'preinscribir';
    let self = this;
    axios.post(url, {
      alumno: this.state.alumno,
      materias_aprobadas: this.state.materias_aprobadas,
      materias_preinscripcion: this.state.materias_preinscripcion,
      materias_cursaria: this.state.materias_cursaria,
      materias_cursables: this.state.materias_cursables,
      oferta: this.state.oferta
    })
      .then(function (response) {
        self.setState({ mostrarMensajeSuccess: true });
      })
      .catch(function (error) {
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

  marcar_cursaria(materia)
  {
    // quito la materia de materias cursables (Oferta)
    let materias_cursables = this.state.materias_cursables.filter(function(m){
      return m.id !== materia.id;
    });

    // agrego la materia a materias que cursaria pero no puedo
    let materias_cursaria = this.state.materias_cursaria;
    materias_cursaria.push(materia);

    this.setState({
      materias_cursables: materias_cursables,
      materias_cursaria: materias_cursaria
    });
  }

  desmarcar_cursaria(materia)
  {
    // quito la materia de materias que quisiera cursar pero no puedo
    let materias_cursaria = this.state.materias_cursaria.filter(function(m){
      return m.id !== materia.id;
    });

    // agrego la materia a materias cursables
    let materias_cursables = this.state.materias_cursables;
    materias_cursables.push(materia);

    this.setState({
      materias_cursables: materias_cursables,
      materias_cursaria: materias_cursaria
    });
  }

  render() {
        return (
            <div id="Grid">
            <Grid>
            <Row>

            <Col xs={6} xsOffset={3}>
                { this.state.mostrarMensajeSuccess ?
                    <Alert bsStyle="success">
                        La encuesta se guardó con éxito
                    </Alert> : null }
            </Col>
            </Row>
            </Grid>
        <form onSubmit={this.handleSubmit} className="form-group">
          <div className="row">
                <MateriasAprobadas  materias={this.state.materias_aprobadas}
                                    desmarcar_aprobada_prop={this.desmarcar_aprobada}/>
                <Oferta materias={this.state.materias_cursables}
                        marcar_aprobada_prop={this.marcar_aprobada}
                        preinscribir_prop={this.preinscribir}
                        marcar_cursaria = {this.marcar_cursaria}/>
                <Preinscripcion materias = {this.state.materias_preinscripcion}
                                materias_cursaria = {this.state.materias_cursaria}
                                des_preinscribir_prop = {this.des_preinscribir}
                                desmarcar_cursaria = {this.desmarcar_cursaria}/>
         </div>
         <Button type='submit' bsStyle="primary" bsSize="large"> Confirmar </Button>
       </form>
       </div>
        );
  }
}

export default Encuesta;
