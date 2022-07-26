
exports.up = function (knex) {
    return knex.schema.createTable('project', function (table) {
      table.increments()
      table.string('name')
      table.string('name_ar')
      table.string('status')
      table.string('location')
      table.string('location_ar')
      table.string('lat')
      table.string('long')
      table.string('type')
      table.string('role')
      table.string('business')
      table.string('website')
      table.string('desciption')
      table.string('desciption_ar')
      table.string('year')
      table.string('size')
      table.string('value')
      table.string('annual_visitor')
      table.timestamps(true, true)
    })
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('project')
  };
  