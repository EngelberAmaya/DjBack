"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class FileSystemNoticias {
    constructor() { }
    guardarImagen(file) {
        return new Promise((resolve, reject) => {
            // Crear carpeta
            const path = this.crearCarpetaImagenNoticia();
            // Nombre del archivo
            const nombreArchivo = file.name;
            // Mover el archivo
            file.mv(`${path}/${nombreArchivo}`, (err) => {
                if (err) {
                    reject();
                }
                else {
                    resolve();
                }
            });
        });
    }
    crearCarpetaImagenNoticia() {
        const pathImagenNoticia = path_1.default.resolve(__dirname, '../uploads/imgNoticia');
        const existe = fs_1.default.existsSync(pathImagenNoticia);
        if (!existe) {
            fs_1.default.mkdirSync(pathImagenNoticia);
        }
        return pathImagenNoticia;
    }
    getImgUrl(img) {
        const pathImagenNoticia = path_1.default.resolve(__dirname, '../uploads', 'imgNoticia', img);
        return pathImagenNoticia;
    }
    // Autor
    guardarImagenAutor(file) {
        return new Promise((resolve, reject) => {
            // Crear carpeta
            const path = this.crearCarpetaImagenAutor();
            // Nombre del archivo
            const nombreArchivo = file.name;
            // Mover el archivo
            file.mv(`${path}/${nombreArchivo}`, (err) => {
                if (err) {
                    reject();
                }
                else {
                    resolve();
                }
            });
        });
    }
    crearCarpetaImagenAutor() {
        const pathImagenAutor = path_1.default.resolve(__dirname, '../uploads/imgAutor');
        const existe = fs_1.default.existsSync(pathImagenAutor);
        if (!existe) {
            fs_1.default.mkdirSync(pathImagenAutor);
        }
        return pathImagenAutor;
    }
    getImgAutor(img) {
        const pathImagenAutor = path_1.default.resolve(__dirname, '../uploads', 'imgAutor', img);
        return pathImagenAutor;
    }
}
exports.default = FileSystemNoticias;
