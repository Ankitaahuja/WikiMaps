exports.seed = function(knex, Promise) {
  return knex('maps').del()
    .then(function () {
      return Promise.all([
        knex('maps').insert({id: 1, map_name: 'Sushi Places', latitude: 4000, longitude: 9000, zoomlevel:3,user_id: 1 }),
        knex('maps').insert({id: 2, map_name: 'Pizza Places', latitude: 60000, longitude: 18000, zoomlevel:5,user_id: 2 }),
        knex('maps').insert({id: 3, map_name: 'Burger Places', latitude: 70000, longitude: 6000, zoomlevel:7,user_id: 3 })
      ]);
    });
};
