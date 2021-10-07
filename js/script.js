var dropdown = $(".cities");
var button = $(".button");
var allowSubmit = false;

function showDetails(code) {
  $.get("https://api.covid19api.com/summary", function (data, status) {
    let countries = data.Countries;
    $(".countryDetails").css("display", "grid");
    $(".countryDetails").append(
      '<div class="countryName"><p class="clr-acnt"></p></div><div class="newConfirmed_div"><span>Active Cases: </span><span class="newConfirmed fs-big">12</span></div><div class="totalConfirmed_div"><span>Total Confirmed: </span><span class="totalConfirmed fs-big">12</span></div><div class="totalDeaths_div"><span>Total Deaths: </span><span class="totalDeaths fs-big">12</span></div><div class="totalRecovered_div"><span>Total Recovered: </span><span class="totalRecovered fs-big">12</span></div>'
    );

    let countryObject = countries.find((o) => o.CountryCode === code);
    console.log(countryObject);

    $(".countryName p").html(countryObject.Country);
    $(".newConfirmed").html(countryObject.NewConfirmed);
    $(".totalConfirmed").html(countryObject.TotalConfirmed);
    $(".totalDeaths").html(countryObject.TotalDeaths);
    $(".totalRecovered").html(countryObject.TotalRecovered);
  });
}

function getData() {
  $.get("https://api.covid19api.com/summary", function (data, status) {
    let countries = data.Countries;
    // console.log(countries);
    console.log("Tracking Data");

    //TOTAL CASES
    let totalCases = data.Global.TotalConfirmed;
    $(".totalCases_number").html(totalCases);
    // console.log(totalCases);

    //ACTIVE CASES
    let activeCases = data.Global.NewConfirmed;
    $(".activeCases_number").html(activeCases);
    // console.log(activeCases);

    //TOTAL DEATHS
    let totalDeaths = data.Global.TotalDeaths;
    $(".totalDeaths_number").html(totalDeaths);
    // console.log(totalDeaths);

    for (let i = 0; i < countries.length; i++) {
      // console.log(countries[i].Country);
      dropdown.append(
        '<option value= "' +
          countries[i].CountryCode +
          '">' +
          countries[i].Country +
          "</option"
      );
    }
  });
}

$(document).ready(getData());

var interval = setInterval(function () {
  getData();
}, 5000);

dropdown.change(function (e) {
  e.preventDefault();
  allowSubmit = true;
});

button.click(function (e) {
  if (allowSubmit === true) {
    let country = dropdown.val();
    $(".countryDetails>*").remove();
    showDetails(country);
  } else {
    alert("Please Select a Country First!");
  }
});
