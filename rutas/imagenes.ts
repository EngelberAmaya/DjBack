import { Router, Response } from 'express';
import { Imagenes } from '../modelos/imagenes';
import { verificarToken } from '../middelwares/autentificacion';
import FileSystem from "../clases/fileSystem";
import fs from 'fs';
import path from 'path';

const imagenesRutas = Router();
const fileSystem = new FileSystem();

// Subir Imagenes
imagenesRutas.post('/', verificarToken, (req: any, res: Response) => {

	const body = req.body;
	const file = req.files.img;
	body.img = file.name;
	console.log(file);

	Imagenes.create(body).then(imgDB => {
		res.json({
			ok: true,
			imgDB
		});

		fileSystem.guardarImagen(file, req.usuario.nombre);

	}).catch(err => {
		res.json(err)
	});

});

// Mostrar imagen por Url
imagenesRutas.get('/Federica2/:img', (req: any, res: Response) => {

    const img = req.params.img;
    const pathImagen = fileSystem.getImgUrl(img);
    res.sendFile(pathImagen);

});

// Actualizar imagen
imagenesRutas.post('/update', verificarToken, (req: any, res: Response) => {

    const file = req.files.img;
    fileSystem.guardarImagen(file, req.usuario.nombre);
    res.json({
        ok: true,
        mensaje: 'Imagen actualizada'
    });
});

// Borrar Imagen
imagenesRutas.delete('/:id/:name', verificarToken, (req: any, res: Response) => {
	
	const id = req.params.id;
	const name = req.params.name;

	Imagenes.findOneAndRemove(id, (err: any, imgBorrar: any) => {

		if(err) throw err;
		res.json({
			ok: true,
			mensaje: 'Imagen eliminada',
			body: imgBorrar
		});

		fs.unlinkSync(path.resolve(__dirname, '../uploads', 'Federica2', name));

	});
});

export default imagenesRutas;
