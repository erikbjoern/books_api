module.exports = (factory, Models) => {
  factory.define("Author", Models.Author, {
    id: Math.floor(1000 * Math.random()),
    name: "bar",
  })
}