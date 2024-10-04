/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('Urls', (table) => {
        table.increments('url_id').primary()
        table.string('original_url').notNullable()
        table.string('shorter_url').unique().notNullable()
        table.string('clicks').defaultTo(0)
        table.timestamp('deleted_at').nullable()
        table.timestamps(true, true)

        table.integer('user_id').unsigned().references('user_id').inTable('Users').onDelete('CASCADE')
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable('Urls')
  
};
