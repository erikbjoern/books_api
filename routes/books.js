var express = require("express");
var router = express.Router();

/* GET books listing. */
router.get("/", (req, res) => {
  const bookCollection = [
    { title: "Nice book", author: "Erik" },
    { title: "Fine book", author: "Someone" },
  ];
  res.json({ books: bookCollection });
});

module.exports = router;
