import { Router, Response } from 'express';
import { verificarToken } from '../middelwares/autentificacion';
import { Noticias } from '../modelos/noticia';
import FileSystemNoticias from '../clases/fileSystemNoticias';

const noticiasRutas = Router();
const fileSystemNoticias = new FileSystemNoticias();

// Subir Imagenes
noticiasRutas.post('/:img/:imgAutor', verificarToken, (req: any, res: Response) => {

	const body = req.body;
	const img = req.params.img;
	const imgAutor = req.params.imgAutor;

	body.img = img;
	body.imgAutor = imgAutor;

	Noticias.create(body).then(noticiaDB => {
		res.json({
			ok: true,
			noticia: noticiaDB
		});

	}).catch(err => {
		res.json(err)
	});

});

//Obtener noticia paginada
noticiasRutas.get('/', async (req: any, res: Response) => {

	let pagina = Number(req.query.pagina) || 1;
	let saltar = pagina - 1;
	saltar = saltar * 8;

	const noticias = await Noticias.find()
		.sort({_id: -1})
		.skip(saltar)
		.limit(8)
		.exec();
	
	res.json({
		ok: true,
		pagina,
		noticias
	});

});


// Subir imagenes autor
noticiasRutas.post('/upload', verificarToken, async(req: any, res: Response) => {
	const file1 = req.files.img;
	await fileSystemNoticias.guardarImagenAutor(file1);

	res.json({
		ok: true,
		file1: file1.name
	});
});

// Subir imagenes noticia
noticiasRutas.post('/upload2', verificarToken, async(req: any, res: Response) => {
	const file2 = req.files.img;
	await fileSystemNoticias.guardarImagen(file2);

	res.json({
		ok: true,
		file1: file2.name
	});
});

// Mostrar imagen noticia por Url
noticiasRutas.get('/imgNoticia/:img', (req: any, res: Response) => {

    const img = req.params.img;
    const pathImagen = fileSystemNoticias.getImgUrl(img);
    res.sendFile(pathImagen);

});

// Mostrar imagen autor por Url
noticiasRutas.get('/imgAutor/:img', (req: any, res: Response) => {

    const img = req.params.img;
    const pathImagen = fileSystemNoticias.getImgAutor(img);
    res.sendFile(pathImagen);

});

export default noticiasRutas;