/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries

  const plainPassword = 'password'

  const data = {
    name: 'Yas Waterworld',
    name_ar: 'Yas Waterworld Ar',
    status: 'draft',
    location: 'Yas Island',
    location_ar: 'Yas Island Ar',
    lat: '12.4885',
    long: '12.2942',
    type: 'meet,play',
    role: 'develop',
    business: 'miral experience',
    website: 'www.google.com',
    desciption: 'Opened in 2013',
    desciption_ar: 'Opened in 2013 Ar',
    year: '2013',
    size: '15',
    value: '1000000',
    annual_visitor: '10000',
  }

  const dataImage = {
    image_url: '',
    project_id: 1,
  }

  await knex('project').del()
  await knex('project').insert(data)
  await knex('project_image').insert(dataImage)
}
