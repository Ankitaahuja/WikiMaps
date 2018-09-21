exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('points', function(table) {
      table.increments('id');
      table.string("title");
      table.string('description');
      table.string('image_url');
      table.float('latitude');
      table.float('longitude');
      table.integer('user_id').unsigned();
      table.foreign('user_id').references("id").inTable("users");
      table.integer('map_id').unsigned();
      table.foreign('map_id').references("id").inTable("maps");
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('points')
  ])
};
