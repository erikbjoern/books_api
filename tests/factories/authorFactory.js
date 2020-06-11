module.exports = (factory, Models) => {
  factory.define("Author", Models.Author, {
    name: "Foo",
  })
}