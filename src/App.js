import React, { Component } from 'react';
import Header from './Components/Header';
import Encuesta from './Components/Encuesta';
import Alumno from './Components/Alumno';
import PantallaCargando from './Components/PantallaCargando';
import './App.css';
import axios from 'axios';

class App extends Component {

    constructor(props) {
      super(props);
      this.state = { oferta: null}
    }

    traerOferta() {
        var self = this;
        //local flask 
        //let url = 'http://localhost:5000/oferta/15';
        // heroku
        let url = 'https://encuesta-preinscripcion-bknd.herokuapp.com/oferta/15';
        axios.get(url)
          .then(res => {
            //console.log(res.data)
            self.setState({ oferta: res.data });
        });
    }

    componentWillMount() {
        this.traerOferta();
    }

  render() {
    //Si ya tengo los datos, genero los componentes
    if (this.state.oferta) {
        return (
            <div className="container">
                <div className="row">
                    <Header />
                    <Alumno datos={this.state.oferta.alumno}/>
                </div>
                <div className="row">
                    <Encuesta oferta={this.state.oferta} />
                </div>
            </div>
        );
    }
    else{
        //Mientras espero que llegue la oferta, muestro lo que esta aca
        return (<PantallaCargando />)
    }
  }
}

export default App;
