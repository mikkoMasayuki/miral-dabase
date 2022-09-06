const BaseModel = require('./BaseModel')
const Bookshelf = require('bookshelf')
const ModelAgg = require('./bookshelf/project.js')

class User extends BaseModel {
  tableName = 'project'

  constructor(client) {
    super()
    this.client = client
    try {
        this.bookshelfModel = ModelAgg(Bookshelf(client)).Project
      } catch (_) {
        // do nothing...
        // will continue for purposes of mocking functionalities
      }
  }

  available(options = {}) {
    const withRelated = ['image']

    const pageSize = options?.limit || options?.pageSize || 10
    const pageNumber = options?.page || options?.pageNumber || 1
    const page = (pageNumber - 1) * pageSize;

    return this.bookshelfModel
      .fetchPage({ withRelated, pageSize, page })
      .then(data => data.toJSON())
  }

  search(filter, options = {}) {
    const withRelated = ['image']

    const pageSize = options?.limit || options?.pageSize || 10
    const pageNumber = options?.page || options?.pageNumber || 1
    const page = (pageNumber - 1) * pageSize;

    const { type, role, location, business, ...filterRest } = filter

    return this.bookshelfModel
      .query(function (qb){ 
        
        qb.where({...filterRest})

        if(type){

          type.forEach(function(value){
            
            qb.orWhere('type', 'LIKE', `%${value}%`)
          })
        }

        if(role){

          role.forEach(function(value){
            
            qb.orWhere('role', 'LIKE', `%${value}%`)
          })
        }
        
        if(location){

          location.forEach(function(value){
            
            qb.orWhere('location', 'LIKE', `%${value}%`)
          })

        }

        if(business){

          business.forEach(function(value){
            
            qb.orWhere('business', 'LIKE', `%${value}%`)
          })

        }


      })
      .fetchPage({ withRelated, pageSize, page })
      .then(data => data.toJSON())
  }

  findById(id) {
    const withRelated = ['image']

    return this.bookshelfModel
      .where({id:id})
      .fetchPage({ withRelated })
      .then(data => data.toJSON())
  }

  insertOne(data) {
    return this.createOne({ ...data })
  }

  insertImages(data) {
    return this.client("project_image").insert(data)
  }

  update({ id, ...data }) {
    return this.client(this.tableName)
      .where({ id })
      .update({ ...data })
  }

  updateImage(id, data){
    return this.client("project_image")
    .where({ project_id: id })
    .del()
    .then(proj => {
      return this.client("project_image").insert(data)
    })
    
  }

 
}

module.exports = User
