import React, { Component } from 'react';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class TablaResultados extends Component {

  constructor(props) {
    super();
    this.state = {
      data: this.procesar_datos_para_tabla(props.datos)
    };
  }

  procesar_datos_para_tabla(datos)
  {
    // LOS DATOS DEL BACKEND ME LLEGAN CON ESTE FORMATO
    //   {
    //   "encuestas": {
    //     "total": 4,
    //     "respondidas": 3
    //   },
    //   "materias": [{
    //     "resultados": [{
    //       "descripcion": "De 18hs a 20hs",
    //       "inscriptos": 0,
    //       "id": 322,
    //       "cupo": 20
    //     }, {
    //       "descripcion": "De 20hs a 22hs",
    //       "inscriptos": 0,
    //       "id": 323,
    //       "cupo": 40
    //     }],
    //     "cuatrimestre": 1,
    //     "id": 163,
    //     "nombre": "Introduccion a la programacion",
    //     "aprobados": 3,
    //     "cursarian": 0
    //   }, {
    //     "resultados": [{
    //       "descripcion": "De 18hs a 20hs",
    //       "inscriptos": 0,
    //       "id": 324,
    //       "cupo": 20
    //     }, {
    //       "descripcion": "De 20hs a 22hs",
    //       "inscriptos": 0,
    //       "id": 325,
    //       "cupo": 40
    //     }],
    //     "cuatrimestre": 1,
    //     "id": 164,
    //     "nombre": "Matematica 1",
    //     "aprobados": 3,
    //     "cursarian": 0
    //   }],
    //   "oferta": {
    //     "nombre": "2017s2",
    //     "id": 13
    //   }
    // }

    // FORMATO DE DATOS PARA UNA FILA DE LA TABLA
    // [{
    //   'materia': 'Matematica 1',
    //   'cursarian': 40,
    //   'aprobados': 230
    //   'comisiones': [
    //     {
    //       'horario': 'De 18hs a 22hs',
    //       'cupo': 40,
    //       'preinscriptos': 30,
    //       'estado': 10
    //     },
    //     {
    //       'horario': "De 20hs a 22hs",
    //       'preinscriptos': 0,
    //       'cupo': 40,
    //       'estado': 20
    //     }
    //   ]
    // }]

    let salida = [];
    datos.materias.forEach(function(materia) {
      let fila = {
        materia: materia.nombre,
        cursarian: materia.cursarian,
        aprobados: materia.aprobados,
        problema_de_cupo: materia.problema_de_cupo
      };
      let comisiones = [];
      materia.resultados.forEach(function(comision){
        let c = {
          comision: comision.descripcion,
          cupo: comision.cupo,
          preinscriptos: comision.inscriptos,
          estado: (comision.inscriptos * 100) / comision.cupo
        };
        comisiones.push(c);
      });
      fila.comisiones = comisiones;
      salida.push(fila);
    });


    // ORDENO PARA QUE ME MUESTRE ARRIBA LAS MATERIAS CON COMISIONES CON MAYOR PORCENTAJE DE PREINSCRIPTOS
    salida.sort(function(m1,m2){
      let comparar_cupo_comision = function(c1,c2){
        return c2.estado-c1.estado;
      }

      m1.comisiones.sort(comparar_cupo_comision);
      m2.comisiones.sort(comparar_cupo_comision);

      return m2.comisiones[0].estado - m1.comisiones[0].estado;
    });

    return salida;
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <ReactTable
          data={data}
          filterable={true}
          previousText={'Anterior'}
          nextText={'Siguiente'}
          loadingText={'Cargando...'}
          noDataText={'No se encontraron datos'}
          pageText={'Página'}
          ofText={'de'}
          rowsText={'filas'}
          columns={[
                {
                  Header: "Materia",
                  accessor: "materia",
                  filterMethod: (filter, row) =>
                    row[filter.id].includes(filter.value)
                },
                {
                  Header: "¿Problema de cupo?",
                  accessor: "problema_de_cupo",
                  filterable: false,
                  Cell: row => (
                      <span>
                        <span style={{
                          color: row.value === true ? '#ff2e00'
                            : '#57d500',
                          transition: 'all .3s ease'
                        }}>
                          &#x25cf;
                        </span> {
                          row.value === true ? 'Si'
                          : `No`
                        }
                      </span>
                    )
                },
                {
                  Header: "Quieren cursar pero no pueden",
                  accessor: "cursarian",
                  filterable: false
                },
                {
                  Header: "Ya aprobaron",
                  accessor: "aprobados",
                  filterable: false
                }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
          SubComponent={row => {
            return (
              <div style={{ padding: "20px" }}>
                <ReactTable
                  data={row.original.comisiones}
                  columns={[
                            {
                              Header: "Comision",
                              accessor: "comision",
                            },
                            {
                              Header: "Cupo",
                              accessor: "cupo"
                            },
                            {
                              Header: "Preinscriptos",
                              accessor: "preinscriptos"
                            },
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
                                                backgroundColor: row.value > 90 ? 'red'
                                                  : row.value > 75 ? 'yellow'
                                                  : 'green',
                                                borderRadius: '2px',
                                                transition: 'all .2s ease-out'
                                              }}
                                            />
                                          </div>
                                    )
                            }
                    ]}
                  defaultPageSize={3}
                  showPagination={false}
                />
              </div>
            );
          }}
        />
        <br />
      </div>
    );
  }
}

export default TablaResultados;
