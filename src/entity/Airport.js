const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Airport',
  tableName: 'airport',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    icao_code: {
      type: 'varchar',
    },
    iata_code: {
      type: 'varchar',
    },
    name: {
      type: 'varchar',
    },
    type: {
      type: 'varchar',
    },
    city_id: {
      type: 'int',
    },
    country_id: {
      type: 'int',
    },
    continent_id: {
      type: 'int',
    },
    website_url: {
      type: 'varchar',
    },
    created_at: {
      type: 'timestamp',
    },
    updated_at: {
      type: 'timestamp',
    },
    latitude_deg: {
      type: 'float',
    },
    longitude_deg: {
      type: 'float',
    },
    elevation_ft: {
      type: 'int',
    },
    wikipedia_link: {
      type: 'varchar',
    },
  },
  relations: {
    city: {
      target: 'City',
      type: 'many-to-one',
      joinColumn: {
        name: 'city_id',
      },
      inverseSide: 'airports',
    },
    country: {
      target: 'Country',
      type: 'many-to-one',
      joinColumn: {
        name: 'country_id',
      },
      inverseSide: 'airports',
    },
  },
});
