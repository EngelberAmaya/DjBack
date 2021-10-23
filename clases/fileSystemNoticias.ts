import path from 'path';
import fs from 'fs';

export default class FileSystemNoticias {

	constructor(){}

	guardarImagen(file: any) {

        return new Promise((resolve, reject) => {

            // Crear carpeta
            const path = this.crearCarpetaImagenNoticia();

            // Nombre del archivo
            const nombreArchivo = file.name;

            // Mover el archivo
            file.mv(`${path}/${nombreArchivo}`, (err: any) => {

                if (err) {
                    reject();
                } else {
                    resolve();
                }
            });
        });
    }

    private crearCarpetaImagenNoticia() {

        const pathImagenNoticia = path.resolve(__dirname, '../uploads/imgNoticia');

        const existe = fs.existsSync(pathImagenNoticia);

        if (!existe) {
            fs.mkdirSync(pathImagenNoticia);
        }

        return pathImagenNoticia;
    }

    getImgUrl(img: string){
        const pathImagenNoticia = path.resolve(__dirname, '../uploads', 'imgNoticia', img);
        return pathImagenNoticia;
    }


    // Autor

    guardarImagenAutor(file: any) {

        return new Promise((resolve, reject) => {

            // Crear carpeta
            const path = this.crearCarpetaImagenAutor();

            // Nombre del archivo
            const nombreArchivo = file.name;

            // Mover el archivo
            file.mv(`${path}/${nombreArchivo}`, (err: any) => {

                if (err) {
                    reject();
                } else {
                    resolve();
                }
            });
        });
    }

    private crearCarpetaImagenAutor() {

        const pathImagenAutor = path.resolve(__dirname, '../uploads/imgAutor');

        const existe = fs.existsSync(pathImagenAutor);

        if (!existe) {
            fs.mkdirSync(pathImagenAutor);
        }

        return pathImagenAutor;
    }

    getImgAutor(img: string){
        const pathImagenAutor = path.resolve(__dirname, '../uploads', 'imgAutor', img);
        return pathImagenAutor;
    }
}