import React, { Component } from 'react';
import Header from './Components/Header';
import Encuesta from './Components/Encuesta';
import Alumno from './Components/Alumno';
import PantallaCargando from './Components/PantallaCargando';
import './App.css';
import axios from 'axios';
import GoogleLogin from 'react-google-login';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usuario: null,
            oferta: null
        };
        this.onSuccessResponseGoogleCallback = this.onSuccessResponseGoogleCallback.bind(this);
    }

    onSuccessResponseGoogleCallback(response)
    {
        //console.log(response);
        //return;
        this.setState({usuario: response.profileObj.name});
        //alert(response.profileObj.name);
        // local flask
        let url = 'https://encuesta-preinscripcion-bknd.herokuapp.com/login';

        // Heroku
        //let url = 'https://encuesta-preinscripcion-bknd.herokuapp.com/login'

        let self = this;
        axios.post(url,{ token: response.tokenId }
                            ).then(function(response){
                                self.setState({ oferta: response.data });
                            }).catch(function(error){
                                console.log(error);
                            });
    }

  render() {
    if(this.state.usuario === null){
        const responseGoogle = (response) => {
            console.log(response);
        }
        return (<GoogleLogin
                    //clientId de react-google-login
                    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={this.onSuccessResponseGoogleCallback}
                    onFailure={responseGoogle}/>);
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
