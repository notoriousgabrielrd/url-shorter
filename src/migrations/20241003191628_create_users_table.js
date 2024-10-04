/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('Users', (table) => {
        table.increments('user_id').primary()
        table.string('name').notNullable()
        table.string('email').unique().notNullable()
        table.string('password').notNullable()
        table.timestamp('deleted_at').nullable()
        table.timestamps(true, true)
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('Users');
};
