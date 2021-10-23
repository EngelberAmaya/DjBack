"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const imagenes_1 = require("../modelos/imagenes");
const autentificacion_1 = require("../middelwares/autentificacion");
const fileSystem_1 = __importDefault(require("../clases/fileSystem"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const imagenesRutas = express_1.Router();
const fileSystem = new fileSystem_1.default();
// Subir Imagenes
imagenesRutas.post('/', autentificacion_1.verificarToken, (req, res) => {
    const body = req.body;
    const file = req.files.img;
    body.img = file.name;
    console.log(file);
    imagenes_1.Imagenes.create(body).then(imgDB => {
        res.json({
            ok: true,
            imgDB
        });
        fileSystem.guardarImagen(file, req.usuario.nombre);
    }).catch(err => {
        res.json(err);
    });
});
// Mostrar imagen por Url
imagenesRutas.get('/Federica2/:img', (req, res) => {
    const img = req.params.img;
    const pathImagen = fileSystem.getImgUrl(img);
    res.sendFile(pathImagen);
});
// Actualizar imagen
imagenesRutas.post('/update', autentificacion_1.verificarToken, (req, res) => {
    const file = req.files.img;
    fileSystem.guardarImagen(file, req.usuario.nombre);
    res.json({
        ok: true,
        mensaje: 'Imagen actualizada'
    });
});
// Borrar Imagen
imagenesRutas.delete('/:id/:name', autentificacion_1.verificarToken, (req, res) => {
    const id = req.params.id;
    const name = req.params.name;
    imagenes_1.Imagenes.findOneAndRemove(id, (err, imgBorrar) => {
        if (err)
            throw err;
        res.json({
            ok: true,
            mensaje: 'Imagen eliminada',
            body: imgBorrar
        });
        fs_1.default.unlinkSync(path_1.default.resolve(__dirname, '../uploads', 'Federica2', name));
    });
});
exports.default = imagenesRutas;
