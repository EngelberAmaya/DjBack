import { Response, NextFunction } from 'express';
import Token from "../clases/token";

export const verificarToken = ( req: any, res: Response, next: NextFunction ) => {
	const usuarioToken = req.get('miToken') || '';
	Token.comprobarToken(usuarioToken).then((decode: any) => {
		req.usuario = decode.usuario;
		next();
	})
	.catch( err => {
		res.json({
			ok: false,
			mensaje: 'Token invalido',
			err
		});
	});
}