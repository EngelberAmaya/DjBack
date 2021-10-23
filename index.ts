import Server  from './clases/server';
import usuarioRutas  from './rutas/usuario';
import contactoRutas from './rutas/contacto';
import imagenesRutas from './rutas/imagenes';
import sobreMiRutas from './rutas/sobreMi'
import tecnologiasRutas from './rutas/tecnologia';
import noticiasRutas from './rutas/noticias';
import mongoose from 'mongoose';
import fileuplod from 'express-fileupload';
import bodyParser from 'body-parser';
import cors from 'cors';

const server = new Server();

//Body Parser
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

//CORS
server.app.use(cors({origin: true, credentials: true}));

// Fileupload
server.app.use(fileuplod());

// Rutas
server.app.use('/usuario', usuarioRutas);
server.app.use('/contacto', contactoRutas);
server.app.use('/upload', imagenesRutas);
server.app.use('/sobreMi', sobreMiRutas);
server.app.use('/tecnologia', tecnologiasRutas);
server.app.use('/noticias', noticiasRutas);

// Conectar a la base de datos
mongoose.connect(
	'mongodb://localhost:27017/FedeDJBase',
	{useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false},
	(err) => {
		if(err) throw "err";
		console.log('Base de datos ONLINE');
	}
)

// Levantar el servidor

server.start( () => {
	console.log(`Servidor Fede corriendo en el puerto ${server.port}`);
})