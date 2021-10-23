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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tecnologias_1 = require("../modelos/tecnologias");
const autentificacion_1 = require("../middelwares/autentificacion");
const tecnologiasRutas = express_1.Router();
// Crear tecnologias
tecnologiasRutas.post('/', autentificacion_1.verificarToken, (req, res) => {
    const body = req.body;
    tecnologias_1.Tecnologias.create(body).then(tecnologiaDB => {
        res.json({
            ok: true,
            tecnologia: tecnologiaDB
        });
    }).catch(err => {
        res.json(err);
    });
});
// Actualizar tecnología
tecnologiasRutas.put('/update/:id', autentificacion_1.verificarToken, (req, res) => {
    const id = req.params.id;
    const tecnologia = {
        icono: req.body.icono,
        tecnologia: req.body.tecnologia,
        experiencia: req.body.experiencia
    };
    tecnologias_1.Tecnologias.findByIdAndUpdate(id, tecnologia, { new: true }, (err, tecnologiaDB) => {
        if (err)
            throw err;
        if (!tecnologiaDB) {
            return res.json({
                ok: false,
                mensaje: 'Invalid data'
            });
        }
        res.json({
            ok: true,
            tecnologia
        });
    });
});
//Obtener tecnología
tecnologiasRutas.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tecnologias = yield tecnologias_1.Tecnologias.find()
        .exec();
    res.json({
        ok: true,
        tecnologias
    });
}));
exports.default = tecnologiasRutas;
