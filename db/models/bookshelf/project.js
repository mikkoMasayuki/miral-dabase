module.exports = bookshelf => {

    const Project = bookshelf.model('Project', {
      tableName: 'project',
  
      image() {
        return this.hasMany('Image')
      },
      
    })
  
    
  
    const Image = bookshelf.model('Image', {
      tableName: 'project_image',
    })
  
    return { Project, Image }
  }
  