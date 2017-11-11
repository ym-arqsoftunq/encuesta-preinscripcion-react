import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class MateriasAprobadas extends Component {

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
                        <li key={i}>{materia.nombre} <Button bsStyle="link" bsSize="xsmall"
                        onClick={function(){
                            self.props.desmarcar_aprobada_prop(materia);
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
        <div id="MateriasAprobadas" className="col-md-4">
            <hr></hr>
            <h3>Materias aprobadas</h3>
            {this.renderMaterias()}
            <hr></hr>
        </div>
      );
    }

}

export default MateriasAprobadas;

