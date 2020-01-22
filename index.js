require('dotenv').config();
const express = require('express'),
      massive = require('massive'),
      pctrl = require('./products_controller'),
      app = express(),
      {SERVER_PORT, CONNECTION_STRING} = process.env;

app.use(express.json());

massive(CONNECTION_STRING).then(db => {
  app.set('db', db);
})
.catch(err => console.log(err));

app.get('/api/products', pctrl.getAll);
app.get('/api/products/:id', pctrl.getOne);
app.put('/api/products/:id', pctrl.update);
app.post('/api/products', pctrl.create);
app.delete('/api/products/:id', pctrl.delete);



const port = SERVER_PORT;
app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${port}.`)
})
      