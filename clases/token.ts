import jwt from 'jsonwebtoken';

export default class Token {

    private static semilla: string = 'semilla-seed,privacidadYPropia-FedeDJ';
    private static caducidad: string = '2h';
    // 1h = 1 hora; 1d = 1 día

    constructor() { }

    static getToken(payload: any): string {

        return jwt.sign({

            usuario: payload

        }, this.semilla, { expiresIn: this.caducidad });
    }


    static comprobarToken(userToken: string) {

        return new Promise((resolve, reject) => {

            jwt.verify(userToken, this.semilla, (err, decoded) => {

                if (err) {
                    reject();
                } else {
                    resolve(decoded);
                }
            });
        });
    }

}