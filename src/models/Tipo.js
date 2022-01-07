const { json } = require('express/lib/response');
const {Schema, model} = require('mongoose');


const tipoSchema = new Schema({
    nombre: String,
   
    

    
}, {
    timestamps: true,
    versionKey: false
}
);

module.exports = model ('Tipo', tipoSchema);
