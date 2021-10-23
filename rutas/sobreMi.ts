import { Router, Response } from 'express';
import { SobreMi } from '../modelos/sobreMi';
import { verificarToken } from '../middelwares/autentificacion';

const sobreMiRutas = Router();

// Crear sobre mi
sobreMiRutas.post('/', verificarToken, (req: any, res: Response) => {

	const body = req.body;
	body.titulo = 'Federica Daniela Jiménez'

	SobreMi.create(body).then(sobreMiDB => {
		res.json({
			ok: true,
			sobreMi: sobreMiDB
		});

	}).catch(err => {
		res.json(err)
	});

});

// Actualizar sobre mi
sobreMiRutas.put('/update/:id', verificarToken, (req: any, res: Response) => {

	const id = req.params.id;
	const sobreMi = {
		texto1: req.body.texto1,
		texto2: req.body.texto2,
		texto3: req.body.texto3,
		texto4: req.body.texto4,
		texto5: req.body.texto5
	}

	SobreMi.findByIdAndUpdate(id, sobreMi, {new: true}, (err, sobreMiDB) => {
		if(err) throw err;

		if(!sobreMiDB){
			return res.json({
				ok: false,
				mensaje: 'Invalid data'
			})
		}

		res.json({
			ok: true,
			sobreMi
		})
	});

});

// Obtener sobre mi
sobreMiRutas.get('/', async (req: any, res: Response) => {

	const sobreMi = await SobreMi.find()
		.sort({_id: -1})
		.exec();
	
	res.json({
		ok: true,
		sobreMi
	});

});


export default sobreMiRutas;