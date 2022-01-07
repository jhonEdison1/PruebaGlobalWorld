const { json } = require('express/lib/response');
const {Schema, model} = require('mongoose');


const corralSchema = new Schema({
    nombre: String,
    capacidad: Number,
    restricciones: {
        type: Schema.Types.ObjectId,
        ref: 'Restriccion',
        required: true
    },    
    animales: Array
    

    
}, {
    timestamps: true,
    versionKey: false
}
);

module.exports = model ('Corral', corralSchema);
