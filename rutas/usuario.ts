import { Router, Request, Response } from 'express';
import { Usuario } from '../modelos/usuario';
import Token from "../clases/token";
import { verificarToken } from "../middelwares/autentificacion";

import bcrypt from 'bcryptjs';

const usuarioRutas = Router();

// Crear Usuario

usuarioRutas.post('/crear', (req: Request, res: Response) => {

	const usuario = {
		nombre: req.body.nombre,
		password: bcrypt.hashSync(req.body.password, 10)
	};

	Usuario.create(usuario).then( usuarioDB => {
		res.json({
			ok: true,
			usuario: usuarioDB
		});
	})
	.catch(err => {
		res.json({
			ok: false,
			err
		})
	})

})

// Login

usuarioRutas.post('/login', (req: Request, res: Response) => {

	const body = req.body;

	Usuario.findOne({ nombre: body.nombre }, (err: any, usuarioDB: any) => {

		if(err) throw err;

		if(!usuarioDB){
			return res.json({
				ok: false,
				mensaje: 'No existe el usuario'
			});
		}

		if(usuarioDB.compararContrasena(body.password)){

			const miToken = Token.getToken({
				_id: usuarioDB._id,
				nombre: usuarioDB.nombre,
				password: usuarioDB.password
			})

			res.json({
				ok: true,
				token: miToken
			});
		} else {
			return res.json({
				ok: false,
				token: 'El usuario o la contraseña no son correctos'
			});
		}
	})

});

// Actualizar mi usuario
 usuarioRutas.put('/update', verificarToken, (req: any, res: Response) => {

     const usuario = {
         nombre: req.body.nombre || req.usuario.nombre,
         password: req.body.password || req.usuario.password
     }

     Usuario.findByIdAndUpdate(req.usuario._id, usuario, { new: true }, (err, userDB) => {

         if (err) throw err;
         if (!userDB) {
             return res.json({
                 ok: false,
                 mensaje: 'No existe el usuario'
             });
         }
         const miToken = Token.getToken({
             _id: userDB._id,
             nombre: userDB.nombre,
             password: userDB.password

         });
         res.json({
             ok: true,
             token: miToken
         });
     });
 });


// Get usuario
 usuarioRutas.get('/', async (req: any, res: Response) => {

     const user = await Usuario.find()
         .limit(1) // Limit es para el número de usuarios que queremos obtener
         .exec();

     res.json({
         ok: true,
         user
     });
 });

export default usuarioRutas;