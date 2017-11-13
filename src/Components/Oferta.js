import React, { Component } from 'react';
import Cuatrimestre from './Cuatrimestre';
import { PanelGroup } from 'react-bootstrap';

class Oferta extends Component {

    constructor(props) {
      super(props);
      this.state = {materias: []};
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

    render() {
        //agrupo las materias por cuatrimestre
        let cuatrimestres_nros = [];
        for(let i=0;i<this.state.materias.length;i++){
            //si no esta en el array lo agrego
            if(cuatrimestres_nros.indexOf(this.state.materias[i].cuatrimestre) < 0){
                cuatrimestres_nros.push(this.state.materias[i].cuatrimestre);
            }
        }
        let cuatrimestres = [];
        for(let i=0;i<cuatrimestres_nros.length;i++){
            let materias_por_cuatri = [];
            for(let ii=0;ii<this.state.materias.length;ii++){
                if(cuatrimestres_nros[i] === this.state.materias[ii].cuatrimestre){
                    materias_por_cuatri.push(this.state.materias[ii]);
                }
            }
            cuatrimestres.push({
                numero: cuatrimestres_nros[i],
                materias: materias_por_cuatri
            });
        }
        cuatrimestres.sort(function(c1,c2){
            return c1.numero > c2.numero;
        });

        let self=this;

      return (
        <div id="Oferta" className="col-md-4">
            <hr></hr>
            <h3>Oferta</h3>
            <PanelGroup>
            {
                cuatrimestres.map(function(c){
                    return (
                            <Cuatrimestre
                                key={c.numero}
                                numero={c.numero} materias={c.materias}
                                marcar_aprobada_prop={self.props.marcar_aprobada_prop}
                                preinscribir_prop={self.props.preinscribir_prop}/>
                            );
                })
            }
            </PanelGroup>
        </div>
      );
    }

}

export default Oferta;
