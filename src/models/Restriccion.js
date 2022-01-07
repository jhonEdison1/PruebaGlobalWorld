const { json } = require('express/lib/response');
const {Schema, model} = require('mongoose');


const restriccionSchema = new Schema({
    nombre: String,
    tipos: Array
   
    

    
}, {
    timestamps: true,
    versionKey: false
}
);

module.exports = model ('Restriccion', restriccionSchema);
