const moongose = require('mongoose');

moongose.connect('mongodb://localhost/granja',{

}).then(db => console.log('DB is connected')).catch(err => console.log(err));
