import React, { Component } from 'react';
import { render } from "react-dom";
import { traerResultadosEncuestas } from "./Utils";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class TablaResultados extends Component {
  constructor() {
    super();
    this.state = {
      data: traerResultadosEncuestas()
    };
  }
  render() {
    const { data } = this.state;
    return (
      <div>
        <ReactTable
          data={data}
          columns={[
            {
              Header: "Materias",
              columns: [
                {
                  Header: "Nombre",
                  accessor: "materia"
                },
                {
                  Header: "Comision",
                  accessor: "comision",
                }
              ]
            },
            {
              Header: "Información",
              columns: [
                {
                  Header: "Cupo",
                  accessor: "cupo"
                },
                {
                  Header: "Anotados",
                  accessor: "anotados"
                }
              ]
            },
            {
              Header: "Estadísticas",
              columns: [
                {
                  Header: "Estado",
                  accessor: "estado",
                  Cell: row => (
                              <div
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  backgroundColor: '#dadada',
                                  borderRadius: '2px'
                                }}
                              >
                                <div
                                  style={{
                                    width: `${row.value}%`,
                                    height: '100%',
                                    backgroundColor: row.value > 90 ? '#85cc00'
                                      : row.value > 75 ? '#ffbf00'
                                      : '#ff2e00',
                                    borderRadius: '2px',
                                    transition: 'all .2s ease-out'
                                  }}
                                />
                              </div>
                        )
                },
                {
                  Header: "Quisieran cursar pero no pueden",
                  accessor: "cursarian"
                },
                {
                  Header: "Ya aprobaron",
                  accessor: "aprobados"
                }
              ]
            },
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
      </div>
    );
  }
}

export default TablaResultados;
