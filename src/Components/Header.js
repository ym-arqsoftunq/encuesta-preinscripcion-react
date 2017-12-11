import React, { Component } from 'react';

class Header extends Component {

    constructor(props) {
      super(props);
      this.state = {url: 'http://www.unq.edu.ar/images/logo_unqui.png',}
    }

  render() {
    return (
        <div id="header" className="col-md-8">
            <div className="row">
            <div className="col-lg-4">
                <img src={this.state.url} alt="Universidad Nacional de Quilmes" className="img-responsive" />
            </div>
            <div className="col-lg-8">
            <h1 className="display-4">Encuesta de preinscripción</h1>
            </div>
            </div>
        </div>
       );

  }
}

export default Header;
