const router = require('express').Router();
const Contact = require('../models/contactModel');
const authMiddleware = require('../middlwares/authMiddleware');

// register new message
router.post('/message-register', async (req, res) => {
  try {
    const newMessage = new Contact(req.body);
    await newMessage.save();
    res.send({
      success: true,
      message: 'Message sent successfully',
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//get current message
router.get('/get-current-message', authMiddleware, async (req, res) => {
  try {
    const contact = await Contact.findById(req.body.contactId);
    res.send({
      success: true,
      message: 'Message fetched successfully ',
      data: contact,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get all messages
router.get('/get-all-messages', authMiddleware, async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.send({
      success: true,
      message: 'Messages fetched successfully',
      data: contacts,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
