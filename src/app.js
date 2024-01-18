import express from 'express';
import mongoose from 'mongoose';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';

const app = express();
const PORT = 8080;

app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/coderhouse', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conectado a MongoDB');
});

app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
