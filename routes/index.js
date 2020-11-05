const initRoutes = (app) => {
  app.get('/', (req, res) => {
    res.render('home', {
      titleName: "Donation"
    });
  });

  app.use('*', (req, res) => {
    res.status(404).render("custom_errors/error", {
      errorReason: "404 Not Found!!!",
      message: "Page you're looking for is not found. Please check your URL"
    });
  });
};

module.exports = initRoutes;
