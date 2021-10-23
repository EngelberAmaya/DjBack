import { Schema, model, Document } from 'mongoose';

const tecnologiaSchema = new Schema({

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


interface ITecnologia extends Document {
	icono: string;
	tecnologia: string;
	experiencia: string;	
}



export const Tecnologias = model<ITecnologia>('Tecnologias', tecnologiaSchema)