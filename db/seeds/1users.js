exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({id: 1, email: 'kkwon39@gmail.com', password: '123', user_name:'Kelvin'}),
        knex('users').insert({id: 2, email: 'charlie@gmail.com', password: '234', user_name:'Charlie'}),
        knex('users').insert({id: 3, email: 'coco@gmail.com', password: '345', user_name:'Coco'})
      ]);
    });
};
