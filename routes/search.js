const express = require('express');
const donationData = require('../data/donations');
const router = express.Router();
const authMiddleWare = require('../middlewares/auth');

router.get('', authMiddleWare.loginRequired, async (req, res) => {
  try {
    let searchResults = await donationData.search(searchTerm);
    if (!searchResults) throw 'No donations match the provided search term!';

    let searchTerm = req.body.search;
    res.render('donations/index', {
      title: 'Search Results',
      pageName: `Search Results: "${searchTerm}`,
      layout: 'main2'
    });
  }
  catch (e) {
    res.status(404).render('customError',
      {
        title: 'Not found',
        errorReason: e,
        pageName: 'Error',
      });
  }
});

module.exports = router;