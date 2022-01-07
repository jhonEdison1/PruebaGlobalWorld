const {Router} = require('express');

const router = Router();

const userController = require('../controllers/User.js');
const corralController = require('../controllers/Corral.js');
const authmiddleware = require('../middlewares/auth.js');
const restriccionControler = require('../controllers/Restricciones.js');

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);

//posiblemente este metodo se puede hacer con un middleware


router.post('/addTipo', authmiddleware.verifyToken, restriccionControler.addTipo);
router.post('/addRestriccion', authmiddleware.verifyToken, restriccionControler.addRestriccion);
router.post('/restriccions', authmiddleware.verifyToken, restriccionControler.getTiposByRestriccion);
router.get('/restriccions', authmiddleware.verifyToken, restriccionControler.getRestricciones);
router.get('/tipos', authmiddleware.verifyToken, restriccionControler.getTipos);

router.get('/corral', authmiddleware.verifyToken ,  corralController.getCorrales);
router.post('/corral', authmiddleware.verifyToken , corralController.saveCorral);
router.post('/corral/animal', authmiddleware.verifyToken , corralController.addAnimal);
router.post('/corral/animals', authmiddleware.verifyToken , corralController.getAnimalsByCorral);
router.post('/corral/promedio', authmiddleware.verifyToken , corralController.getPromedioEdad);
router.get('/corral/getAnimals', authmiddleware.verifyToken , corralController.getAllanimals);



module.exports = router;