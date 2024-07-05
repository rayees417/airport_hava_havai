const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'City',
  tableName: 'city',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
    country_id: {
      type: 'int',
    },
    is_active: {
      type: 'boolean',
    },
    lat: {
      type: 'float',
    },
    long: {
      type: 'float',
    },
  },
  relations: {
    country: {
      target: 'Country',
      type: 'many-to-one',
      joinColumn: {
        name: 'country_id',
      },
      inverseSide: 'cities',
    },
    airports: {
      target: 'Airport',
      type: 'one-to-many',
      inverseSide: 'city',
    },
  },
});
