const bcrypt = require('bcrypt')
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries

  const plainPassword = 'password'

  const data = {
    first_name: 'Super',
    last_name: 'Admin',
    role: 'Super Admin',
    username: 'super_admin',
    password: bcrypt.hashSync(plainPassword, 10),
    email: 'admin@moments.io',
  }

  await knex('user').del()
  await knex('user').insert(data)
}
