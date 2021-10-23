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
const contacto_1 = require("../modelos/contacto");
const contactoRutas = express_1.Router();
// Crear mensajes
contactoRutas.post('/', (req, res) => {
    const body = req.body;
    contacto_1.Contacto.create(body).then(contactoDB => {
        res.json({
            ok: true,
            contacto: contactoDB
        });
    }).catch(err => {
        res.json(err);
    });
});
// Borrar mensajes
contactoRutas.delete('/:id', (req, res) => {
    const id = req.params.id;
    contacto_1.Contacto.findOneAndRemove(id, (err, contactoBorrar) => {
        if (err)
            throw err;
        res.json({
            ok: true,
            mensaje: 'Mensaje eliminado',
            body: contactoBorrar
        });
    });
});
// Obtener mensajes
contactoRutas.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mensajes = yield contacto_1.Contacto.find()
        .sort({ _id: -1 })
        .limit(50)
        .exec();
    res.json({
        ok: true,
        mensajes
    });
}));
exports.default = contactoRutas;
