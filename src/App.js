import React, { Component } from 'react';
import Login from './Components/Login';
import Header from './Components/Header';
import Encuesta from './Components/Encuesta';
import Alumno from './Components/Alumno';
import PantallaCargando from './Components/PantallaCargando';
import VistaDirector from './Components/VistaDirector';
import './App.css';
import Entorno from './Entorno';
import axios from 'axios';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: null,
            rol: null,
            oferta: null,
            info_director: null
        };
        this.login = this.login.bind(this);
    }

    // el login me trae el email y el rol
    login(email,rol)
    {
        this.setState({email: email, rol: rol});
        switch(rol) {
            case 'alumno':
                this.getEncuestaAlumno();
                break;
            case 'director':
                this.getInfoDirector();
                break;
            default:
                alert('Rol invalido: ' + rol);
        }
    }

    getEncuestaAlumno()
    {
        let url = Entorno.getBackendUrl() + 'oferta/' + this.state.email.substring(0,this.state.email.indexOf('@'));
        let self = this;
        axios.get(url).then(function(response){
            self.setState({oferta: response.data});
        }).catch(function(error){
            alert('Error al recuperar encuesta del alumno ' + this.state.email);
            console.log(error);
        });
    }

    getInfoDirector()
    {
        let url = Entorno.getBackendUrl() + 'resultados';
        let self = this;
        axios.get(url).then(function(response){
            self.setState({info_director: response.data});
        }).catch(function(error){
            alert('Error al recuperar la informacion de la encuesta');
            console.log(error);
        });
    }

  render() {
    if(this.state.email === null){
        return (<Login login={this.login}/>);
    }

    let pantalla;
    switch(this.state.rol) {
        case 'alumno':
            pantalla = <Encuesta oferta={this.state.oferta}/>
            break;
        case 'director':
            pantalla = <VistaDirector datos={this.state.info_director}/>
            break;
        default:
            pantalla = null;
    }

    //Si ya tengo los datos, genero los componentes
    if (this.state.oferta || this.state.info_director) {
        return (
            <div className="container">
                <div className="row">
                    <Header />
                    <Alumno email={this.state.email}/>
                </div>
                <div className="row">
                    {pantalla}
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
