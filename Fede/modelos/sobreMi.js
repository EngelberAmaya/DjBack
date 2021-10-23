"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SobreMi = void 0;
const mongoose_1 = require("mongoose");
const sobreMiSchema = new mongoose_1.Schema({
    titulo: {
        type: String
    },
    texto1: {
        type: String,
        required: [true, 'El texto1 es obligatorio']
    },
    texto2: {
        type: String,
        required: [true, 'El texto2 es obligatorio']
    },
    texto3: {
        type: String,
        required: [true, 'El texto3 es obligatorio']
    },
    texto4: {
        type: String,
        required: [true, 'El texto4 es obligatorio']
    },
    texto5: {
        type: String,
        required: [true, 'El texto5 es obligatorio']
    },
});
exports.SobreMi = mongoose_1.model('SobreMi', sobreMiSchema);
