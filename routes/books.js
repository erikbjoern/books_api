var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.json({books: [{title: 'Nice book', author: 'Erik'}]});
});

module.exports = router;
