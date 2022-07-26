class BaseModel {

    findBy(filters, options = {}) {
  
      const query = this.client(this.tableName)
  
      query.where({ ...filters })
  
      if (options?.limit) {
        query.limit(options.limit)
      }
  
      if (options?.page) {
        const offset = --options.page * (options.limit || 10)
  
        query.offset(offset)
      }
  
      return query
    }
  
    findOneBy(filters, options = {}) {
      return this.findBy(filters, options).first()
    }
  
    // todo probably refactor to this.queryBuilder = this.client(this.tableName)
    createOne(data) {
      return this.client(this.tableName).insert({ ...data })
    }
  
    update(id, data) {
      return this.client(this.tableName).where({ id }).update({ ...data })
    }
  }
  
  module.exports = BaseModel
  