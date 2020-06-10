const Models = require('../models')
const booksSerializer = require('../serializers/booksSerializer')

const booksController = {
  async index(req, res) {
    const eachSerializer = booksSerializer.index()
    const booksIndex = await Models.Book.findAll(eachSerializer)
    
    res.json({books: booksIndex})
  }
}

module.exports = booksController