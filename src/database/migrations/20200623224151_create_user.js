exports.up = function(knex) {
    return knex.schema.createTable('user', function (table){
        table.increments('id').primary();
        table.string('chat_id', 150).notNullable();
        table.string('name', 50).notNullable();
        table.string('address', 15).notNullable();
        table.string('step', 16).notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('user');
};
