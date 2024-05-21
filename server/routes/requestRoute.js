const router = require('express').Router();
const Request = require('../models/requestModel');
const authMiddleware = require('../middlwares/authMiddleware');

//new customer register
router.post('/request-register', async (req, res) => {
  try {
    const newRequest = new Request(req.body);
    await newRequest.save();
    res.send({
      success: true,
      message: 'Request create successfully',
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//cget current request
router.get('/get-current-request', authMiddleware, async (req, res) => {
  try {
    const request = await Request.findById(req.body.requestId);
    res.send({
      success: true,
      message: 'Request fetched successfully ',
      data: request,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get all request
router.get('/get-request', authMiddleware, async (req, res) => {
  try {
    const requests = await Request.find();
    res.send({
      success: true,
      message: 'Request fetched successfully',
      data: requests,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
