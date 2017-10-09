import React, { Component } from 'react';

class Materia extends Component {

  constructor(props) {
    super(props);
    this.state = {value: '', nombre: 'Arquitectura de Software', horarios: [{value: 'a', name: '16hs a 19hs'}, {value: 'b', name: '19hs a 22hs'}], options: []};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  componentDidMount(){
    this.generateOptions(this.state.horarios);
  }

  generateOptions(data) {
    for (var i = 0; i < data.length; i++) {
        var option = data[i];
        this.state.options.push(
            <option key={i} value={option.value}>{option.name}</option>
        );
    }
    this.forceUpdate();
    }

    handleSubmit(event) {
      alert('Gracias por completar la encuesta!');
      event.preventDefault();
    }

  render() {
    return (
        <div id="materia">
            <form onSubmit={this.handleSubmit}>
                <label>{this.state.nombre}</label>
                <select>{this.state.options}</select>
                <br></br>
                <input type="submit" value="Submit" />
            </form>
        </div>
       );

  }
}

export default Materia;
