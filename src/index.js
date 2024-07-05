require('dotenv').config();
const express = require('express');
const { createConnection } = require('typeorm');
const airportController = require('./controllers/airportController');

const app = express();
const port = process.env.PORT || 3000;

createConnection().then(() => {
  app.get('/api/airport/:iata_code', airportController.getAirportByIataCode);

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(error => console.log(error));
