require('dotenv').config();
const express = require('express'),
    massive = require('massive'),
    {SERVER_PORT, CONNECTION_STRING} = process.env,
    app = express();
    ctrl = require('./products_controller')
    const port = SERVER_PORT;


app.use(express.json())

massive ({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
})
    .then(db => {
        app.set('db', db)
        console.log('db connected')
    })
    .catch(err => console.log(err));

    app.get('/api/products', ctrl.getAll);
    app.get('/api/products/:id', ctrl.getOne);
    app.post('/api/products', ctrl.create);
    app.put('/api/products/:id', ctrl.update);
    app.delete('/api/products/:id', ctrl.delete);
 


app.listen(port, () => console.log(`server is running on ${port}`))