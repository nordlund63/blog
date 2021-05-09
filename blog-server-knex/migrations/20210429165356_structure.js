
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table){
        table.increments();
        table.string('email', 100).unique().notNullable();
        table.string('password').notNullable();
      })
      .createTable('posts', function(table){
        table.increments();
        table.string('title').notNullable();
        table.string('content').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());

        table.integer('userId').notNullable().references('id').inTable('users');
      })
      .createTable('comments', function(table){
        table.increments();
        table.string('content').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        
        table.integer('userId').notNullable().references('id').inTable('users');
        table.integer('postId').notNullable().references('id').inTable('posts');
      })
};

exports.down = function(knex) {
  return knex.schema.dropTable('comments')
  .dropTable('posts')
  .dropTable('users');
};