import React, { Component } from 'react';
import { DropdownButton,MenuItem } from 'react-bootstrap';

class Oferta extends Component {

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

    handleSelect(eventKey,event)
    {
        if(eventKey.comision){
            // llama a preinscribir_prop
            eventKey.accion(eventKey.materia,eventKey.comision);
        }else{
            // llama a marcar_aprobada_prop
            eventKey.accion(eventKey.materia);
        }        
    }

    renderMaterias() {
        let self=this;
        return (
            <div>
            {this.state.materias.map(
                function(materia, i){
                    return (
                        <DropdownButton bsStyle="primary" title={materia.nombre} key={i} id={`dropdown-basic-${i}`}
                        onSelect={self.handleSelect}>
                              <MenuItem eventKey={{materia:materia,accion:self.props.marcar_aprobada_prop}}>Aprobada</MenuItem>
                              <MenuItem divider />
                              {materia.comisiones.map(function(comision,ic){
                                return (<MenuItem eventKey={
                                    {
                                        materia: materia,
                                        comision: comision,
                                        accion: self.props.preinscribir_prop
                                    }
                                }>Preinscribir C{comision.id} {comision.descripcion}</MenuItem>);
                              })}
                            </DropdownButton>
                    );
                })
            }
            </div>
        );
    }

    render() {
      return (
        <div id="Oferta" className="col-md-4">
            <hr></hr>
            <h3>Oferta</h3>
            {this.renderMaterias()}
            <hr></hr>
        </div>
      );
    }

}

export default Oferta;

