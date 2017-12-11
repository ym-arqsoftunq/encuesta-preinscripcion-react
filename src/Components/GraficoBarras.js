import React, { Component } from 'react';
import {BarChart, Bar, XAxis, Tooltip} from 'recharts';

class GraficoBarras extends Component {

  constructor(props) {
    super(props);
    this.state = {
      total: props.datos.total,
      respondidas: props.datos.respondidas
    };
  }

  render () {
    const data = [
        {
          name: 'Encuestas respondidas',
          respondidas: this.state.respondidas,
          faltantes: this.state.total - this.state.respondidas
        }
    ];
    return (
      <BarChart width={200} height={200} data={data}
            margin={{top: 20, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="name"/>
       <Tooltip/>
       <Bar dataKey="respondidas" stackId="a" fill="green" />
       <Bar dataKey="faltantes" stackId="a" fill="red" />
      </BarChart>
    );
  }
}

export default GraficoBarras;




