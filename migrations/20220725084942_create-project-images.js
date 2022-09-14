
exports.up = function (knex) {
    return knex.schema.createTable('project_image', function (table) {
      table.increments()
      table.string('image_url')
      table.integer('project_id').unsigned().references('project.id').onDelete('CASCADE')
      table.timestamps(true, true)
    })
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('project_image')
  };
  