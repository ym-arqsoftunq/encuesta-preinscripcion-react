import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


//TODO: es_produccion SE DEBERIA OBTENER DE UN ARCHIVO DE CONFIGURACION O UNA VARIABLE DE ENTORNO
const es_produccion = true;
ReactDOM.render(<App es_produccion={es_produccion}/>, document.getElementById('root'));
registerServiceWorker();
