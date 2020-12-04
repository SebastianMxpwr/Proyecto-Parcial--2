require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose =  require('mongoose');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
 
app.use(bodyParser.json())

app.get('/', function(req, res){
    res.send('<h1>Bienvenido a mi servidor rest (localhost)</h1>');
})

app.use(require('./routes/usuario'));
app.use(require('./routes/categoria'));
app.use(require('./routes/login'));
app.use(require('./routes/productos'));

mongoose.connect('mongodb://localhost:27017/cafeteria',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err,res) => {
  
  if(err) throw err;
  console.log('Base de datos Online');
});

app.listen(process.env.PORT, () => {
    console.log('El servidor esta en linea por el puerto ', process.env.PORT)
});