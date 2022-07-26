const bcryt = require('bcrypt')

function encrypt(plainText, saltRounds = 10) {
  return bcryt.hashSync(plainText, saltRounds)
}

function compare(plainText, encrypted) {
  return bcryt.compareSync(plainText, encrypted)
}

const passwordHelper = {
  encrypt,
  compare
}

module.exports = passwordHelper
