import React, { Component } from 'react';
import Header from './Components/Header';
import Encuesta from './Components/Encuesta';
import Alumno from './Components/Alumno';
import PantallaCargando from './Components/PantallaCargando';
import './App.css';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { Grid,Row, Panel, Form,FormGroup, Col,FormControl, Button } from 'react-bootstrap';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usuario: null,
            oferta: null,
            email: '',
            password: ''
        };
        this.onSuccessResponseGoogleLoginCallback = this.onSuccessResponseGoogleLoginCallback.bind(this);
        this.onSuccessResponseFacebookLoginCallback = this.onSuccessResponseFacebookLoginCallback.bind(this);
        if(props.es_produccion){
            this.state.backend_url = 'https://encuesta-preinscripcion-bknd.herokuapp.com/';
            this.state.facebookLoginAppId = "677725579018243";
        }else{
            this.state.backend_url = 'http://localhost:8000/';
            this.state.facebookLoginAppId = "900337603475842"
        }
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
    }

    onSuccessResponseGoogleLoginCallback(response)
    {
        this.setState({usuario: response.profileObj.name});
        let url = this.state.backend_url + 'google-login';
        let self = this;
        axios.post(url,{ token: response.tokenId }
                            ).then(function(response){
                                self.setState({ oferta: response.data });
                            }).catch(function(error){
                                alert('Error al loguearse con Google. Ver log de consola.');
                                console.log(error);
                            });
    }

    onSuccessResponseFacebookLoginCallback(response)
    {
        this.setState({usuario: response.name});
        let url = this.state.backend_url + 'facebook-login';
        let self = this;
        axios.post(url,{ token: response.accessToken, email: response.email}
                            ).then(function(response){
                                self.setState({ oferta: response.data });
                            }).catch(function(error){
                                alert('Error al loguearse con Facebook. Ver log de consola.');
                                console.log(error);
                            });
    }

    handleLoginSubmit()
    {
        console.log('handleLoginSubmit');
        //this.setState({usuario: response.name});
        let url = this.state.backend_url + 'login';
        //let self = this;
        axios.post(url,{ email: this.state.email, password: this.state.password}
                            ).then(function(response){                          
                                alert('then');
                            //console.log('hola');      
                                // self.setState({
                                //     oferta: response.data,
                                //     usuario: self.state.email
                                //  });

                                console.log('WACHINNNNNNNNNNNNNNNNN');
                                //console.log('email ' + self.state.email);
                            }).catch(function(error){
                                alert('Error al loguearse. Ver log de consola.');
                                console.log(error);
                            });
    }

    handleUserInput(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

  render() {
    if(this.state.usuario === null){
        const responseGoogleLoginOnFailure = (response) => {
            console.log(response);
        };
        const responseFacebookLoginOnFailure = (response) => {
          console.log(response);
        };
        return (<div>
                <Header />
                <Grid>
                <Row>
                <Col xs={6} xsOffset={3}>
                <Panel header="Ingresar">
                    <Form horizontal onSubmit={this.handleLoginSubmit}>
                        <FormGroup controlId="formHorizontalEmail">
                          <Col sm={10}>
                            <FormControl type="email" placeholder="Email" value={this.state.email}
                            onChange={this.handleUserInput} name="email"/>
                          </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalPassword">
                          <Col sm={10}>
                            <FormControl type="password" placeholder="Password"  value={this.state.password}
                            onChange={this.handleUserInput} name="password"/>
                          </Col>
                        </FormGroup>

                        <FormGroup>
                          <Col sm={10}>
                            <Button type="submit">
                              Ingresar
                            </Button>
                          </Col>
                        </FormGroup>
                    </Form>
                    <Panel header="O ingresa con">
                        <Grid>
                        <Row>
                        <Col md={3}>
                            <GoogleLogin
                                //clientId de Nestor
                                clientId="24020407875-f97tlhpiqr92q6c5jc4o19jdelrc2bhg.apps.googleusercontent.com"
                                buttonText="Google"
                                onSuccess={this.onSuccessResponseGoogleLoginCallback}
                                onFailure={responseGoogleLoginOnFailure}/>
                        </Col>
                        <Col md={3}>
                            <FacebookLogin
                                appId={this.state.facebookLoginAppId}
                                autoLoad={false}
                                fields="name,email,picture"
                                callback={this.onSuccessResponseFacebookLoginCallback}
                                onFailure={responseFacebookLoginOnFailure}
                                textButton="Facebook"
                                size="small"/>
                        </Col>
                        </Row>
                        </Grid>
                    </Panel>    
                </Panel>
                </Col>
                </Row>
                </Grid>
            </div>);
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
                    <Encuesta backend_url={this.state.backend_url} oferta={this.state.oferta} />
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
