$(function () {
  $('.quantity-right-plus').on('click', function (e) {
    e.preventDefault();
    var inputElement = $(this).closest('.input-group').find('#quantity');
    var quantity = parseInt(inputElement.val());
    var donationId = $(this).closest('.input-group').data('donationId');
    var max = parseInt(inputElement.attr('max'));
    var errorElement = $(this).closest('.add-remove').find('.error');
    errorElement.addClass('hide');

    if (quantity < max) {
      // Increment
      $.ajax({
        url: `/donations/${donationId}/donate`,
        method: 'POST',
        success: function (response) {
          console.log(response);
          inputElement.val(quantity + 1);
          $('#cart').text(response.cart);
        },
        error: function (response) {
          console.log(response);
        },
      });
    } else {
      errorElement.text(`You can't add more than ${max} items`);
      errorElement.removeClass('hide');
    }
  });

  $('.quantity-left-minus').on('click', function (e) {
    e.preventDefault();
    var inputElement = $(this).closest('.input-group').find('#quantity');
    var quantity = parseInt(inputElement.val());
    var donationId = $(this).closest('.input-group').data('donationId');
    var errorElement = $(this).closest('.add-remove').find('.error');
    errorElement.addClass('hide');

    // Decrement
    if (quantity > 0) {
      $.ajax({
        url: `/donations/${donationId}/withdraw`,
        method: 'POST',
        success: function (response) {
          console.log(response);
          inputElement.val(quantity - 1);
          $('#cart').text(response.cart);
        },
      });
    } else {
      errorElement.text('Quantity can not be -ve.');
      errorElement.removeClass('hide');
    }
  });
});
