import React from 'react';
import ConjuntoDeMaterias from './ConjuntoDeMaterias';
import Materia from './Materia';

/*
    Conjunto de materias cursables por el alumno
*/

class ConjuntoDeMateriasCursables extends ConjuntoDeMaterias {

    renderMaterias() {
        return (
            <div>
            {this.state.materias.map(
                function(materia, i){
                    return (
                        <div key={i}>
                            <Materia datos={materia}/>
                        </div>
                    );

                })
            }
            </div>
        );
    }

    render() {
      return (
        <div id="MateriasCursables">
            <hr></hr>
            <h5>Este es el componente de materias cursables</h5>
            {this.renderMaterias()}
            <hr></hr>
        </div>
      );
    }

}

export default ConjuntoDeMateriasCursables;
