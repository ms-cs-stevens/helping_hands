const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    res
      .status(200)
      .render('auth/login', { title: 'Become a Donor or Receiver' });
  } catch (e) {
    res.status(404).render('customError', {
      title: 'Not found',
      errorReason: "Sorry, We can't find the link",
    });
  }
});

module.exports = router;
