import React, { Component } from 'react';
import Login from './Components/Login';
import Header from './Components/Header';
import Encuesta from './Components/Encuesta';
import Alumno from './Components/Alumno';
import PantallaCargando from './Components/PantallaCargando';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usuario: null,
            oferta: null
        };
        this.login = this.login.bind(this);
    }

    // el login me trae el usuario y la oferta correspondiente
    login(usuario,oferta)
    {
        this.setState({usuario: usuario, oferta: oferta});
    }

  render() {
    if(this.state.usuario === null){
        return (<Login login={this.login}/>);
    }

    //Si ya tengo los datos, genero los componentes
    if (this.state.oferta) {
        return (
            <div className="container">
                <div className="row">
                    <Header />
                    <Alumno datos={this.state.usuario}/>
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
