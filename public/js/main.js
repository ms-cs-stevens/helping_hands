let basePath = location.origin;
$.getScript(`${basePath}/public/js/location.js`);
$.getScript(`${basePath}/public/js/auth.js`);
$.getScript(`${basePath}/public/js/home.js`);

// autoclose the alert message
window.setTimeout(function () {
  $('.alert')
    .fadeTo(500, 0)
    .slideUp(500, function () {
      $(this).remove();
    });
}, 2000);
