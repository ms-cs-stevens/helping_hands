fetchCitiesByStateElement = () => {
  fetchCitiesByState($('#inputState').val());
};

jQuery(function () {
  var stateElement = $('#inputState');

  if (stateElement.length) {
    var states = fetchStatesByCountry();

    var ele = ['<option value="">Choose State</option>'];
    states.map((state) => {
      ele.push(
        `<option value='${state.toLowerCase()}' ${
          stateElement.attr('value') === state.toLowerCase() ? 'selected' : ''
        }>${state}</option>`
      );
    });
    stateElement.html(ele);

    stateElement.on('change', function () {
      fetchCitiesByStateElement();
    });
  }
});
