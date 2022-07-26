const { encrypt, compare } = require('./password')
const BaseModel = require('./BaseModel')
const Bookshelf = require('bookshelf')

class User extends BaseModel {
  tableName = 'user'

  constructor(client) {
    super()
    this.client = client
  }

  async login(username, password){


    const user = await this.findBy({ username: username}).first()

    const checkPass = await compare(password, user.password)

    if (checkPass) {
      return user
    }else{
      throw new Error('Incorrect Password')
    }
  }

  async create(newUser) {
    const { password, ...data } = newUser
    const encrypted = encrypt(password)

    try {
      const [newUserId] = await this.createOne({
        password: encrypted,
        ...data,
      })
      data.id = newUserId
      return data
    } catch (err) {
      throw new Error('Something went wrong: Unable to create user')
    }
  }

  findOneByNumber(number) {
    if (number === undefined) {
      throw new Error('Number is not defined')
    }

    return this.findBy({ number }).first()
  }

  async isEmailRegistered(email) {
    if (email === undefined) {
      throw new Error('Email is not defined')
    }

    try {
      const [user] = await this.findBy({ email })

      if (user) {
        return true
      } else {
        return false
      }
    } catch (err) {
      throw new Error(
        'Something went wrong: Unable to check if user is registered'
      )
    }
  }

  findOneByPk(id) {
    if (!id) {
      throw new Error('id should not be undefined')
    }

    // return this.bookshelfModel
    //   .where({ id })
    //   .fetchPage({ withRelated: ['addresses', 'addresses.address'] })
    //   .then((data) => data.toJSON())
    //   .then(([data]) => data)

    return this.findBy({ id }).first()
  }

  findByUsername(username) {
    return this.client(this.tableName)
      .where('email', username)
      .first()
  }
}

module.exports = User
