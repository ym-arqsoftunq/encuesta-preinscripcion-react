import React, { Component } from 'react';
import { DropdownButton,MenuItem,Panel,ButtonToolbar } from 'react-bootstrap';

class Cuatrimestre extends Component {

    constructor(props) {
      super(props);
      this.state = {
      	numero: 0,
      	materias: []
      };
      this.renderMaterias = this.renderMaterias.bind(this);
    }

    componentWillMount()
    {
        this.setState({
        	numero: this.props.numero,
            materias: this.props.materias
        });
    }

    componentWillReceiveProps(nextProps)
    {
        this.setState({
        	numero: nextProps.numero,
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
            {self.state.materias.map(
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
            <Panel collapsible header={'Cuatrimestre ' + this.state.numero}>
            		{this.renderMaterias()}
            </Panel>        
      );
    }

}

export default Cuatrimestre;

