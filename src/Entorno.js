// para deploy poner en true
const ES_PRODUCCION = false;

class Entorno
{
	static getBackendUrl()
	{
		if(ES_PRODUCCION){
			return 'https://encuesta-preinscripcion-bknd.herokuapp.com/';
		}else{
			// Levantando el servidor con $ gunicorn --pythonpath core app:app
			// el puerto es 8000
			// con $ FLASK_APP=core/app.py flask run
			// el puerto es 5000
			return 'http://localhost:5000/';
		}
	}

	// Se utiliza para el login de Facebook
	static getFacebookLoginAppId()
	{
		if(ES_PRODUCCION){
			// este ID esta habilitado para la URL de Heroku
			return "677725579018243";
		}else{
			// este ID esta habilitado para la URL localhost
			return "900337603475842";
		}
	}

	// Se utiliza para el login de Google
	static getGoogleClientId()
	{
		// Client ID de Nestor
		return '24020407875-f97tlhpiqr92q6c5jc4o19jdelrc2bhg.apps.googleusercontent.com';
	}
}

export default Entorno;
