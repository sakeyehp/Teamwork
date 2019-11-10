import express from 'express';
import dotenv from 'dotenv';
// const bodyParser = require('body-parser');
import 'babel-polyfill';
import Gifs from './src/controllers/gifs';

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));

dotenv.config();

const app = express()

app.use(express.json())

app.get('/', (req,res) => {
    return res.status(200).send({'message': 'Welcome to the TeamWork App'});
})

app.post('/api/v1/gifs', Gifs.create);
app.get('/api/v1/gifs', Gifs.getAll);
app.get('/api/v1/gifs/:id', Gifs.getOne);
app.put('/api/v1/gifs/:id', Gifs.update);
app.delete('/api/v1/gifs/:id', Gifs.delete);

app.listen(3000)

console.log('app running on port ', 3000);


export default app;