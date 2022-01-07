

const restriccionController = {}

const Restriccion = require('../models/Restriccion');
const Tipo = require('../models/Tipo');

restriccionController.getTipos = async (req, res) => {
    const tipos = await Tipo.find();
    res.json(tipos);
}

restriccionController.addTipo = async (req, res) => {
    const {nombre} = req.body;
    const tipo = new Tipo({
        nombre
    });
    await tipo.save();
    res.status(200).json({message: 'Tipo guardado'});
}

restriccionController.getTiposByRestriccion = async (req, res) => {
    const {idRestriccion} = req.body;
    const restriccion = await Restriccion.findById(idRestriccion);
    const tipos = await Tipo.find({_id: {$in: restriccion.tipos}});
    res.json([restriccion.nombre, tipos]);
}


restriccionController.getRestricciones = async (req, res) => {
    const restricciones = await Restriccion.find();
    res.json(restricciones);
}

restriccionController.addRestriccion = async (req, res) => {
    const {nombre, tipos} = req.body;
    //validar que el id de los tipos exista en la base de datos
    //for in para validar
    types = [];
    for(tipo in tipos){
        const tipoExists = await Tipo.findById(tipos[tipo]);
        if(!tipoExists){
            res.status(404).json({message: 'El tipo no existe'});
        }else{
            //agregar el tipo al array de types
            types.push(tipos[tipo]);
        }
    }
    const restriccion = new Restriccion({
        nombre,
        tipos: types
    });
    await restriccion.save();
    res.status(200).json({message: 'Restriccion guardada'});
    
       
    
   
     
    
}







module.exports = restriccionController;