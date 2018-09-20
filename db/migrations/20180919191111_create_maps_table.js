exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('maps', function(table) {
      table.increments('id');
      table.string('map_name');
      table.float('latitude');
      table.float('longitude');
      table.integer('zoomlevel');
      table.integer('user_id').unsigned();
      table.foreign('user_id').references("id").inTable("users");
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('maps')
  ])
};
