import { Router, Response } from 'express';
import { Tecnologias } from '../modelos/tecnologias';
import { verificarToken } from '../middelwares/autentificacion';

const tecnologiasRutas = Router();

// Crear tecnologias
tecnologiasRutas.post('/', verificarToken, (req: any, res: Response) => {

	const body = req.body;
	

	Tecnologias.create(body).then(tecnologiaDB => {
		res.json({
			ok: true,
			tecnologia: tecnologiaDB
		});

	}).catch(err => {
		res.json(err)
	});

});

// Actualizar tecnología
tecnologiasRutas.put('/update/:id', verificarToken, (req: any, res: Response) => {

	const id = req.params.id;

	const tecnologia = {
		icono: req.body.icono,
		tecnologia: req.body.tecnologia,
		experiencia: req.body.experiencia
	}

	Tecnologias.findByIdAndUpdate(id, tecnologia, {new: true}, (err, tecnologiaDB) => {
		if(err) throw err;

		if(!tecnologiaDB){
			return res.json({
				ok: false,
				mensaje: 'Invalid data'
			})
		}

		res.json({
			ok: true,
			tecnologia
		})
	});

});

 //Obtener tecnología
tecnologiasRutas.get('/', async (req: any, res: Response) => {

	const tecnologias = await Tecnologias.find()
		.exec();
	
	res.json({
		ok: true,
		tecnologias
	});

});


export default tecnologiasRutas;