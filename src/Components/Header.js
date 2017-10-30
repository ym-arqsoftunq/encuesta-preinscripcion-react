import React, { Component } from 'react';

class Header extends Component {

    constructor(props) {
      super(props);
      this.state = {url: 'http://www.unq.edu.ar/images/logo_unqui.png',}
    }

  render() {
    return (
        <div id="header" className="col-md-8">
            <img src={this.state.url} alt="Universidad Nacional de Quilmes" className="img-responsive" />
        </div>
       );

  }
}

export default Header;
