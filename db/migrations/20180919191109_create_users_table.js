exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id');
    table.string('email');
    table.string('password');
    table.string('user_name');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};