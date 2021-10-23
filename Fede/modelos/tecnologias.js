"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tecnologias = void 0;
const mongoose_1 = require("mongoose");
const tecnologiaSchema = new mongoose_1.Schema({
    icono: {
        type: String,
        required: [true, 'El icono es obligatorio']
    },
    tecnologia: {
        type: String,
        required: [true, 'La tecnología es obligatorio']
    },
    experiencia: {
        type: String,
        required: [true, 'La experiencia es obligatorio']
    }
});
exports.Tecnologias = mongoose_1.model('Tecnologias', tecnologiaSchema);
