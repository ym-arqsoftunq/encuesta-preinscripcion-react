import React from "react";

export function traerResultadosEncuestas() {
    /*
        1 - Me traigo los resultados del backend
        2 - Genero los datos que espera la tabla
        3 - Cada item de la lista de resultados es una fila de la tabla
        4 - Cada fila de la tabla es una comision con sus datos
        5 - La columna 'estado' tiene que estar calculado a la hora de mandarselo a la tabla
    */

    // EJEMPLO
  return [{'materia': 'Matematica 1', 'comision': 'De 18hs a 22hs', 'cupo': 40, 'anotados': 30, 'estado': 80,
'cursarian': 40, 'aprobados': 230}];
}
