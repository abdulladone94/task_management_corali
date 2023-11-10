const router = require('express').Router();
const todoItemsModel = require('../models/todoItems');

//create second route -- get data from database
router.get('/api/items', async (req, res) => {
  try {
    const allTodoItems = await todoItemsModel.find({});
    res.status(200).json(allTodoItems);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
