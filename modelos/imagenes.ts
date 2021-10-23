import { Schema, model, Document } from 'mongoose';

const imagenesSchema = new Schema({

	img: {
		type: String,
		unique: true
	},
	
});

interface IImagenes extends Document {
	img: string;
}


export const Imagenes = model<IImagenes>('Imagenes', imagenesSchema)