"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarToken = void 0;
const token_1 = __importDefault(require("../clases/token"));
const verificarToken = (req, res, next) => {
    const usuarioToken = req.get('miToken') || '';
    token_1.default.comprobarToken(usuarioToken).then((decode) => {
        req.usuario = decode.usuario;
        next();
    })
        .catch(err => {
        res.json({
            ok: false,
            mensaje: 'Token invalido',
            err
        });
    });
};
exports.verificarToken = verificarToken;
