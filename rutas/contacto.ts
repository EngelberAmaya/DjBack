import { Router, Response } from 'express';
import { Contacto } from '../modelos/contacto';

const contactoRutas = Router();

// Crear mensajes

contactoRutas.post('/', (req: any, res: Response) => {

	const body = req.body;

	Contacto.create(body).then(contactoDB => {
		res.json({
			ok: true,
			contacto: contactoDB
		});
	}).catch(err => {
		res.json(err)
	});
})


// Borrar mensajes

contactoRutas.delete('/:id', (req: any, res: Response) => {

	const id = req.params.id;

	Contacto.findOneAndRemove(id, (err: any, contactoBorrar: any) => {
		if(err) throw err;

		res.json({
			ok: true,
			mensaje: 'Mensaje eliminado',
			body: contactoBorrar
		})
	});
});

// Obtener mensajes
contactoRutas.get('/', async (req: any, res: Response) => {

	const mensajes = await Contacto.find()
		.sort({_id: -1})
		.limit(50)
		.exec();
	
	res.json({
		ok: true,
		mensajes
	});

});

export default contactoRutas;