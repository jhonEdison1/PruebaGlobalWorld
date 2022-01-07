

const corralController = {}

const Corral = require('../models/Corral')
const Animal = require('../models/Animal')
const Tipo = require('../models/Tipo')
const Restriccion = require('../models/Restriccion')


corralController.getCorrales = async (req, res) => {
    const corrales = await Corral.find();
    res.json(corrales);
}

corralController.saveCorral = async (req, res) => {
    const {nombre, capacidad, restricciones, animales} = req.body;
    //validar que todos los campos esten llenos
    if(!nombre || !capacidad || !restricciones  ){   
        res.status(400).json({message: 'Todos los campos son requeridos'});
    }else{
        try{
            const corral = new Corral({
                nombre,
                capacidad,
                restricciones,
                animales
            });
            await corral.save();
            res.status(200).json({message: 'Corral guardado'});

        }catch(error){
            res.status(400).json({message: 'Error al guardar el corral'});
        }
       

    }

    
     
    
}

corralController.addAnimal = async (req, res) => {
    
    const {nombre, tipo, edad, peso, idCorral} = req.body;
    //validar que todos los campos esten llenos
    console.log(req.body);
    if(!nombre || !tipo || !edad || !peso || !idCorral){
        res.status(400).json({message: 'Todos los campos son obligatorios'});
    }else{
        const animal = new Animal({
            nombre,
            tipo,
            edad,
            peso,
            idCorral
        });
        if(!animal){
            res.status(404).json({message: 'Falta informacion, por favor diligencie todos los campos'}); 
        }
        const corral = await Corral.findById(idCorral);        
        const tipoAnimal = animal.tipo;
        const tipoCorralRestriccion = corral.restricciones;
        const tiposPorRestriccion = await Restriccion.find({_id: {$in: tipoCorralRestriccion}});
        const tiposenrestriccion = tiposPorRestriccion.map(tipo => tipo.tipos);
        //res.json( tiposenrestriccion);
        if(findInArray(tiposenrestriccion, tipoAnimal))
        {   
            //ver si el corral tiene capacidad para agregar el animal
            if(corral.animales.length < corral.capacidad){               
                corral.animales.push(animal._id);
                await animal.save();
                await corral.save();
                res.status(200).json({message: 'Animal agregado'});            
            }else{
                res.status(400).json({message: 'El corral no tiene capacidad para agregar mas animales'});
            }
            
        }else{
            res.status(400).json({message: 'El animal no cumple con las restricciones del corral'});
        }
       
        
    }       
    
}
//metodo para buscar un dato de un array en otro array
function findInArray(array, value) {
  
    for (var i = 0; i < array.length; i++) {
        for(var j = 0; j < array[i].length; j++){
            if (array[i][j] == value) {           
                return true;
            }

        }
        
        
    }
    return false;
}

corralController.getAllanimals = async (req, res) => {
    
    const animales = await Animal.find().sort({idCorral: -1});
    //res.json(animales);
    //luego de obtenerlos agruparlos agregarle el nombre del tipo
    const tipos = await Tipo.find();
    const tiposAnimal = animales.map(animal => {
        const tipoAnimal = tipos.find(tipo => tipo._id.toString() === animal.tipo.toString());
        return {
            ...animal._doc,
            tipo: tipoAnimal.nombre
        }
    });
    //luego de agregarle el nombre del tipo, agregarle el nombre del corral
    const corrales = await Corral.find();
    const corralesAnimal = tiposAnimal.map(animal => {
        const corralAnimal = corrales.find(corral => corral._id.toString() === animal.idCorral.toString());
        return {
            ...animal,
            corral: corralAnimal.nombre
        }
    });
    //luego agrupar los animales por corral
    /*const animalesPorCorral = corralesAnimal.reduce((acc, animal) => {
        if(!acc[animal.corral]){
            acc[animal.corral] = [];
        }
        acc[animal.corral].push(animal);
        return acc;
    }, {});*/
    res.status(200).json(corralesAnimal);
    //res.status(200).json(animalesPorCorral);
    





}


corralController.getAnimalsByCorral = async (req, res) => {
    const {idCorral} = req.body;
    const corral = await Corral.findById(idCorral);
    try {
        const animals = await Animal.find({_id: {$in: corral.animales}});
        //si el corral esta vacio retornar vacio
        /*if(animals.length == 0){
            res.status(200).json({message: 'El corral esta vacio'});
        }*/
        
        const tipos = await Tipo.find();
        
        const tiposAnimal = animals.map(animal => {
            const tipoAnimal = tipos.find(tipo => tipo._id.toString() === animal.tipo.toString());
            return {
                ...animal._doc,
                tipo: tipoAnimal.nombre
            }
        });
        res.status(200).json(tiposAnimal);            
    } catch (error) {
        res.status(404).json({message: 'El corral no tiene animales'});        
    }
}

//obtener el promedio de edad de los animales en un corral
corralController.getPromedioEdad = async (req, res) => {
    const {idCorral} = req.body;
    const corral = await Corral.findById(idCorral);
    try {
        const animals = await Animal.find({_id: {$in: corral.animales}});
        //si el corral esta vacio retornar 0
        if(animals.length === 0){
            res.status(200).json({message: 'El corral esta vacio'});
        }
        const promedio = animals.reduce((acumulador, animal) => acumulador + animal.edad, 0) / animals.length;
        res.status(200).json({promedio});
    } catch (error) {
        res.status(404).json({message: 'El corral no tiene animales'});
    }
}




module.exports = corralController;