let signup_form = $('#signup_form');
let login_form = $('#login_form');

if (login_form) {
  signup_form.hide();
  $('#sign_up_link').on('click', function (e) {
    e.preventDefault();
    login_form.hide();
    signup_form.show();
  });
}

if (signup_form) {
  $('#login_link').on('click', function (e) {
    e.preventDefault();
    signup_form.hide();
    login_form.show();
  });
}
