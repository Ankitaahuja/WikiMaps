exports.seed = function(knex, Promise) {
  return knex('favorites').del()
    .then(function () {
      return Promise.all([
        knex('favorites').insert({user_id: 1, map_id: 1}),
        knex('favorites').insert({user_id: 2, map_id: 2}),
        knex('favorites').insert({user_id: 3, map_id: 3})
      ]);
    });
};
