const Knex = require('knex')

const {
  Models
} = require('./db')

function Connect(config) {
  const client = Knex({ ...config })
  return client
}

module.exports = {
  dbConnect: Connect,
  Models
}

