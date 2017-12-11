import React, { Component } from 'react';
import Header from './Header';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { Grid,Row, Panel, Form,FormGroup, Col,FormControl, Button, Alert } from 'react-bootstrap';
import Entorno from '../Entorno';

class Login extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            email: '',
            password: '',
            emailValidationState: null,
            passwordValidationState: null
        };
        this.onSuccessResponseGoogleLoginCallback = this.onSuccessResponseGoogleLoginCallback.bind(this);
        this.onSuccessResponseFacebookLoginCallback = this.onSuccessResponseFacebookLoginCallback.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
    }

    onSuccessResponseGoogleLoginCallback(response)
    {
        let email = response.profileObj.email;
        let url = Entorno.getBackendUrl() + 'google-login';
        let self = this;
        axios.post(url,{ token: response.tokenId }
                            ).then(function(response){
                                if(response.data.success){
                                    self.props.login(email,response.data.rol);
                                }else{
                                    alert('Error al loguearse en el backend con Google');
                                }
                            }).catch(function(error){
                                alert('Error al loguearse con Google. Ver log de consola.');
                                console.log(error);
                            });
    }

    onSuccessResponseFacebookLoginCallback(response)
    {
        let email = response.email;
        let url = Entorno.getBackendUrl() + 'facebook-login';
        let self = this;
        axios.post(url,{ token: response.accessToken, email: response.email}
                            ).then(function(response){
                                if(response.data.success){
                                    self.props.login(email,response.data.rol);
                                }else{
                                    alert('Error al loguearse en el backend con Facebook');
                                }
                            }).catch(function(error){
                                alert('Error al loguearse con Facebook. Ver log de consola.');
                                console.log(error);
                            });
    }

    handleLoginSubmit(event)
    {
        event.preventDefault();
        if(!this.state.email){
            this.setState({emailValidationState: 'error'});
            return;
        }
        if(!this.state.password){
            this.setState({passwordValidationState: 'error'});
            return;
        }
        let url = Entorno.getBackendUrl() + 'login';
        let self = this;
        axios.post(url,{ email: this.state.email, password: this.state.password}
                            ).then(function(response){
                                if(response.data.success){
                                    self.props.login(self.state.email,response.data.rol);
                                }else{
                                    self.setState({ mostrarMensajeError: true });
                                }
                            });
    }

    handleUserInput(e)
    {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

  render()
  {
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
                { this.state.mostrarMensajeError ?
                    <Alert bsStyle="danger">
                        La contraseña es incorrecta
                    </Alert> : null }
            </Col>
            <Col xs={6} xsOffset={3}>
            <Panel header="Ingresar">
                <Form horizontal onSubmit={this.handleLoginSubmit}>
                    <FormGroup controlId="formHorizontalEmail" validationState={this.state.emailValidationState}>
                      <Col sm={10}>
                        <FormControl type="email" placeholder="Email" value={this.state.email}
                        onChange={this.handleUserInput} name="email"/>
                      </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword" validationState={this.state.passwordValidationState}>
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
                            clientId={Entorno.getGoogleClientId()}
                            buttonText="Google"
                            onSuccess={this.onSuccessResponseGoogleLoginCallback}
                            onFailure={responseGoogleLoginOnFailure}/>
                    </Col>
                    <Col md={3}>
                        <FacebookLogin
                            appId={Entorno.getFacebookLoginAppId()}
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
}

export default Login;
