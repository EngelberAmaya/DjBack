"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autentificacion_1 = require("../middelwares/autentificacion");
const noticia_1 = require("../modelos/noticia");
const fileSystemNoticias_1 = __importDefault(require("../clases/fileSystemNoticias"));
const noticiasRutas = express_1.Router();
const fileSystemNoticias = new fileSystemNoticias_1.default();
// Subir Imagenes
noticiasRutas.post('/:img/:imgAutor', autentificacion_1.verificarToken, (req, res) => {
    const body = req.body;
    const img = req.params.img;
    const imgAutor = req.params.imgAutor;
    body.img = img;
    body.imgAutor = imgAutor;
    noticia_1.Noticias.create(body).then(noticiaDB => {
        res.json({
            ok: true,
            noticia: noticiaDB
        });
    }).catch(err => {
        res.json(err);
    });
});
//Obtener noticia paginada
noticiasRutas.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let pagina = Number(req.query.pagina) || 1;
    let saltar = pagina - 1;
    saltar = saltar * 8;
    const noticias = yield noticia_1.Noticias.find()
        .sort({ _id: -1 })
        .skip(saltar)
        .limit(8)
        .exec();
    res.json({
        ok: true,
        pagina,
        noticias
    });
}));
// Subir imagenes autor
noticiasRutas.post('/upload', autentificacion_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file1 = req.files.img;
    yield fileSystemNoticias.guardarImagenAutor(file1);
    res.json({
        ok: true,
        file1: file1.name
    });
}));
// Subir imagenes noticia
noticiasRutas.post('/upload2', autentificacion_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file2 = req.files.img;
    yield fileSystemNoticias.guardarImagen(file2);
    res.json({
        ok: true,
        file1: file2.name
    });
}));
// Mostrar imagen noticia por Url
noticiasRutas.get('/imgNoticia/:img', (req, res) => {
    const img = req.params.img;
    const pathImagen = fileSystemNoticias.getImgUrl(img);
    res.sendFile(pathImagen);
});
// Mostrar imagen autor por Url
noticiasRutas.get('/imgAutor/:img', (req, res) => {
    const img = req.params.img;
    const pathImagen = fileSystemNoticias.getImgAutor(img);
    res.sendFile(pathImagen);
});
exports.default = noticiasRutas;
