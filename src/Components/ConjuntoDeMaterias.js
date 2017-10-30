import { Component } from 'react';

/*
    Clase padre de el conjunto de materias que el alumno va a determinar
    si cursa o no, en la encuesta.
*/

class ConjuntoDeMaterias extends Component {

    constructor(materias) {
      super();
      this.state = materias ;
    }

}

export default ConjuntoDeMaterias;
