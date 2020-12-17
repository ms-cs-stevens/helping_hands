$('.toggle-group').click((e) => {
  let userId = $('#status-toggle').data('user-id');

  let requestParams = {
    method: 'PATCH',
    url: `/users/${userId}/toggle_active`,
  };
  $.ajax({
    ...requestParams,
    success: function (result) {
      $('table').append(`
        <div id="flash-message">
          <div class="row">
            <div class="col-10 offset-md-1">
              <div class="alert alert-info alert-dismissible fade show" role="alert">
                ${result.message}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
          </div>
        </div>`);
      window.setTimeout(function () {
        $('.alert').fadeTo(550, 0, function () {
          $(this).remove();
        });
      }, 3000);
    },
    error: function () {},
  });
});
