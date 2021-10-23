import { Schema, model, Document } from 'mongoose';

const sobreMiSchema = new Schema({

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

interface ISobreMi extends Document {
	titulo: string;
	texto1: string;
	texto2: string;
	texto3: string;
	texto4: string;	
	texto5: string;
}



export const SobreMi = model<ISobreMi>('SobreMi', sobreMiSchema)