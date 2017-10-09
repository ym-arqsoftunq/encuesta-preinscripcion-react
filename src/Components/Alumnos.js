import React, { Component } from 'react';
import axios from 'axios';

class Alumnos extends Component {

    constructor(props) {
        super(props);

        this.state = {
          alumnos: []
        };
    }

    componentWillMount() {
      axios.get('https://encuesta-preinscripcion-bknd.herokuapp.com/alumnos')
          .then(res => {
            const alumnos = res.data['alumnos'];
            this.setState({ alumnos });
        });
    }


    state = {
        alumnos: [],
      };

    render() {
            return (
              <ul>
                {this.state.alumnos.map(function(listValue){
                  return <li>{listValue.nombre}</li>;
                })}
              </ul>
            )
          }

}


export default Alumnos;
