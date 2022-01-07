const { json } = require('express/lib/response');
const {Schema, model} = require('mongoose');
const Corral = require('./Corral');

const animalSchema = new Schema({
    //validar campos requeridos

    nombre: {
        type: String,
        required: true
    },
    tipo: {
        type: Schema.Types.ObjectId,
        ref: 'Tipo',
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
    peso: Number,
    idCorral: {
        type: Schema.Types.ObjectId,
        ref: 'Corral',
        required: true
    }


    
}, {
    timestamps: true,
    versionKey: false
}
);

module.exports = model ('Animal', animalSchema);
