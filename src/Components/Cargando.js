import React, { Component } from 'react';
import Header from './Header';

class PantallaCargando extends Component {

  render() {
      return (
          <div className="outer">
              <div className="container">
                    <div className="row">
                        <Header />
                    </div>
                    <div className="row">
                        <div className="col-md-2 col-md-offset-5">
                            <div className="loader"></div>
                        </div>
                    </div>
                 </div>
            </div>
      );

  }
}

export default PantallaCargando;
