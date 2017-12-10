import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Preinscripcion extends Component {

    constructor(props) {
      super(props);
      this.state = {materias: [], materias_cursaria: []};
      this.renderMaterias = this.renderMaterias.bind(this);
    }

    componentWillMount()
    {
        this.setState({
            materias: this.props.materias,
            materias_cursaria: this.props.materias_cursaria
        });
    }

    componentWillReceiveProps(nextProps)
    {
        this.setState({
            materias: nextProps.materias,
            materias_cursaria: nextProps.materias_cursaria
        });
    }

    renderMaterias() {
        let self=this;
        let quisiera_cursar = null;
        if(this.state.materias_cursaria.length>0){
            quisiera_cursar = <div><hr/><h4>Materias que quisiera cursar pero no puedo</h4></div>;
        }
        return (
            <div id="Preinscripcion">
            <ul>
            {this.state.materias.map(
                function(materia, i){
                    return (
                        <li key={i}>{materia.nombre} {materia.comision_seleccionada.descripcion}
                            <Button bsStyle="link" bsSize="xsmall" onClick={function(){
                            self.props.des_preinscribir_prop(materia);
                        }}>X</Button></li>
                    );
                })
            }
            </ul>
            {quisiera_cursar}
            {this.state.materias_cursaria.map(
                function(materia, i){
                    return (
                        <li key={i}>{materia.nombre}
                            <Button bsStyle="link" bsSize="xsmall" onClick={function(){
                            self.props.desmarcar_cursaria(materia);
                        }}>X</Button></li>
                    );
                })
            }
            </div>
        );
    }

    render() {
      return (
        <div id="Preinscripcion" className="col-md-4">
            <hr></hr>
            <h3>Preinscripcion</h3>
            {this.renderMaterias()}
            <hr></hr>
        </div>
      );
    }

}

export default Preinscripcion;
