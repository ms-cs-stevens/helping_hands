(function () {
  // REST API for countries, states and cities
  // Generate API token on https://www.universal-tutorial.com/rest-apis/free-rest-api-for-country-state-city
  // Used credentials for generating api-token
  // name: Sonali Chavan
  // email: Sonali's Stevens email address
  // pwd: HelpingHand@123
  // generated api-token: XltBDYitGOCGnivWy87J40f4vPwzQx9WyNVdRcemrKDq0B3Ov7EUQDHsirmYOGv4VEQ

  const apiToken =
    'XltBDYitGOCGnivWy87J40f4vPwzQx9WyNVdRcemrKDq0B3Ov7EUQDHsirmYOGv4VEQ';
  // const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJzY2hhdmExQHN0ZXZlbnMuZWR1IiwiYXBpX3Rva2VuIjoiWGx0QkRZaXRHT0NHbml2V3k4N0o0MGY0dlB3elF4OVd5TlZkUmNlbXJLRHEwQjNPdjdFVVFESHNpcm1ZT0d2NFZFUSJ9LCJleHAiOjE2MDY1ODUzMTN9.9maM5YXLKXJPiY4KJXYYwvNrTRxhz-0zyHE1h-51fzg';
  let authToken;

  const apiUrls = {
    authToken: 'https://www.universal-tutorial.com/api/getaccesstoken',
    countries: 'https://www.universal-tutorial.com/api/countries',
    states: 'https://www.universal-tutorial.com/api/states/United States', // add country name at the end
    cities: 'https://www.universal-tutorial.com/api/cities/', // add state name at the end, e.g. https://www.universal-tutorial.com/api/cities/Alaska
  };

  // Step 1: Generate auth token
  $.ajax({
    url: apiUrls.authToken,
    headers: {
      Accept: 'application/json',
      'api-token': apiToken,
      'user-email': 'schava1@stevens.edu',
    },
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      authToken = data.auth_token;
      var stateElement = $('#inputState');
      if (stateElement.attr('value')) {
        fetchCitiesByStateElement();
      }
    },
  });

  // Fetch states of United Sates
  fetchStatesByCountry = () => {
    let states = [];
    // $.ajax({
    //   url: apiUrls.states,
    //   headers: {
    //     "Authorization": "Bearer " + authToken,
    //     "Accept": "application/json"
    //   },
    //   method: 'GET',
    //   dataType: 'json',
    //   success: function (data) {
    //     states = [];
    //     data.map(state => states.push(state.state_name));
    //   }
    // });

    states = [
      'Alabama',
      'Alaska',
      'Arizona',
      'Arkansas',
      'California',
      'Colorado',
      'Connecticut',
      'Delaware',
      'District of Columbia',
      'Florida',
      'Georgia',
      'Hawaii',
      'Idaho',
      'Illinois',
      'Indiana',
      'Iowa',
      'Kansas',
      'Kentucky',
      'Louisiana',
      'Maine',
      'Maryland',
      'Massachusetts',
      'Michigan',
      'Minnesota',
      'Mississippi',
      'Missouri',
      'Montana',
      'Nebraska',
      'Nevada',
      'New Hampshire',
      'New Jersey',
      'New Mexico',
      'New York',
      'North Carolina',
      'North Dakota',
      'Ohio',
      'Oklahoma',
      'Ontario',
      'Oregon',
      'Pennsylvania',
      'Ramey',
      'Rhode Island',
      'South Carolina',
      'South Dakota',
      'Sublimity',
      'Tennessee',
      'Texas',
      'Trimble',
      'Utah',
      'Vermont',
      'Virginia',
      'Washington',
      'West Virginia',
      'Wisconsin',
      'Wyoming',
    ];

    return states;
  };

  // Fetch cities based on state for US
  fetchCitiesByState = (state) => {
    let cities;
    $.ajax({
      url: `${apiUrls.cities}${state}`,
      headers: {
        Authorization: 'Bearer ' + authToken,
        Accept: 'application/json',
      },
      method: 'GET',
      dataType: 'json',
      success: function (data) {
        cities = [];

        data.map((city) => cities.push(city.city_name));

        var cityElement = $('#inputCity');
        var ele = ['<option value="">Choose City</option>'];
        cities.map((city) => {
          ele.push(
            `<option value='${city.toLowerCase()}' ${
              cityElement.attr('value') === city.toLowerCase() ? 'selected' : ''
            }>${city}</option>`
          );
        });
        cityElement.html(ele);
      },
      error: function (resp) {
        alert(resp);
      },
    });
  };
})();
