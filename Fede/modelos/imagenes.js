"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Imagenes = void 0;
const mongoose_1 = require("mongoose");
const imagenesSchema = new mongoose_1.Schema({
    img: {
        type: String,
        unique: true
    },
});
exports.Imagenes = mongoose_1.model('Imagenes', imagenesSchema);
