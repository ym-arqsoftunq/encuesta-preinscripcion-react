import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Preinscripcion extends Component {

    constructor(props) {
      super(props);
      this.state = {materias: []};
      this.renderMaterias = this.renderMaterias.bind(this);
    }

    componentWillMount()
    {
        this.setState({
            materias: this.props.materias
        });
    }

    componentWillReceiveProps(nextProps)
    {
        this.setState({
            materias: nextProps.materias
        });
    }

    renderMaterias() {
        let self=this;
        return (
            <div>
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

