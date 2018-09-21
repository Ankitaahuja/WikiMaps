exports.seed = function(knex, Promise) {
  return knex('points').del()
    .then(function() {
      return Promise.all([
        knex('points').insert({ id: 1, title: 'Store', description: 'storefront', image_url: '', latitude: 8000, longitude:9000, user_id: 1, map_id: 1 }),
        knex('points').insert({id: 2, title: 'Store', description: 'storefront', image_url: '', latitude: 4000, longitude: 18000, user_id: 2, map_id: 2}),
        knex('points').insert({id: 3, title: 'Store', description: 'storefront', image_url: '', latitude: 2000, longitude: 36000, user_id: 3, map_id: 3})
      ]);
    });
};
