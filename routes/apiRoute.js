const express = require('express');
const router = express.Router();
const { chatCompletion } = require('../helper/openaiApi');
router.post('/message', async (req, res) => {
  try {
    console.log(req.body.message);
    const query = req.body.message;
    const senderId = req.body.senderId; // Add the sender ID here or use any other identifier
    const result = await chatCompletion(query);
    // Modify the response format to include the sender ID or any other identifier
    const response = {
      senderId: "",
      message: result.response
    };
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;