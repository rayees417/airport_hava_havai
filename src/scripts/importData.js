require('dotenv').config();
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');
const { createConnection, getRepository } = require('typeorm');
const Airport = require('../entity/Airport');
const City = require('../entity/City');
const Country = require('../entity/Country');

async function importData() {
  await createConnection();

  const airportRepository = getRepository(Airport);
  const cityRepository = getRepository(City);
  const countryRepository = getRepository(Country);

  const csvFilePath = path.join(__dirname, '../../data/airport.csv'); // Adjust the path as per your structure

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', async (row) => {
      const city = await cityRepository.findOne({ id: parseInt(row.city_id) });
      const country = await countryRepository.findOne({ id: parseInt(row.country_id) });

      const airport = new Airport();
      airport.id = parseInt(row.id);
      airport.icao_code = row.icao_code;
      airport.iata_code = row.iata_code;
      airport.name = row.name;
      airport.type = row.type;
      airport.city = city;
      airport.country = country;
      airport.continent_id = parseInt(row.continent_id);
      airport.website_url = row.website_url;
      airport.created_at = new Date(row.created_at);
      airport.updated_at = new Date(row.updated_at);
      airport.latitude_deg = parseFloat(row.latitude_deg);
      airport.longitude_deg = parseFloat(row.longitude_deg);
      airport.elevation_ft = parseInt(row.elevation_ft);
      airport.wikipedia_link = row.wikipedia_link;

      await airportRepository.save(airport);
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
      process.exit(); // Exit the script after processing
    })
    .on('error', (err) => {
      console.error('Error occurred while processing CSV:', err);
      process.exit(1); // Exit with error
    });
}

importData().catch((error) => console.error('Error during import:', error));
