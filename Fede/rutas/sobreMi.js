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
const sobreMi_1 = require("../modelos/sobreMi");
const autentificacion_1 = require("../middelwares/autentificacion");
const sobreMiRutas = express_1.Router();
// Crear sobre mi
sobreMiRutas.post('/', autentificacion_1.verificarToken, (req, res) => {
    const body = req.body;
    body.titulo = 'Federica Daniela Jiménez';
    sobreMi_1.SobreMi.create(body).then(sobreMiDB => {
        res.json({
            ok: true,
            sobreMi: sobreMiDB
        });
    }).catch(err => {
        res.json(err);
    });
});
// Actualizar sobre mi
sobreMiRutas.put('/update/:id', autentificacion_1.verificarToken, (req, res) => {
    const id = req.params.id;
    const sobreMi = {
        texto1: req.body.texto1,
        texto2: req.body.texto2,
        texto3: req.body.texto3,
        texto4: req.body.texto4,
        texto5: req.body.texto5
    };
    sobreMi_1.SobreMi.findByIdAndUpdate(id, sobreMi, { new: true }, (err, sobreMiDB) => {
        if (err)
            throw err;
        if (!sobreMiDB) {
            return res.json({
                ok: false,
                mensaje: 'Invalid data'
            });
        }
        res.json({
            ok: true,
            sobreMi
        });
    });
});
// Obtener sobre mi
sobreMiRutas.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sobreMi = yield sobreMi_1.SobreMi.find()
        .sort({ _id: -1 })
        .exec();
    res.json({
        ok: true,
        sobreMi
    });
}));
exports.default = sobreMiRutas;
