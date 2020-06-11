const booksSerializer = {
  index() {
    return {
      attributes: ['id', 'title'],
      include: [
        {
          model: models.Author,
          as: 'author', 
          attributes: { exclude: ['id', 'createdAt', 'publishedAt']}
        }
      ]
    }
  }
}

module.exports = booksSerializer