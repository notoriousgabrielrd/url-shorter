/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.alterTable('Urls', (table) => {
      table.integer('clicks').defaultTo(0).alter();
    });
  }
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export function down(knex) {
    return knex.schema.alterTable('Urls', (table) => {
      table.string('clicks').defaultTo('0').alter();
    });
  }
  