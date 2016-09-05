/**
Main javascript functions for Restaurant Reviews
Written by: Mary Sheahen
9/3/2016

**/

Handlebars.registerHelper("everyOther", function (index, amount, scope) {
    if ( ++index % amount )
        return scope.inverse(this);
    else
        return scope.fn(this);
});

Handlebars.registerHelper("printStars", function(number){
  var starDom = "";
  for(var i = 0; i < number; i++){
    starDom += "<span class='star-icon'>★</span>";
  }
  for(i = number; i < 5; i++){
    starDom += "<span class='star-icon'>☆</span>";
  }
  return new Handlebars.SafeString(starDom);
});

Handlebars.registerHelper("printDollarSigns", function(number){
  var starDom = "";
  for(var i = 0; i < number; i++){
    starDom += "$";
  }
  return new Handlebars.SafeString(starDom);
});

function getJSON(url){
  fetch(url)
    .then(function(response){
      return response.json();
    }).catch(function(error){
      return error;
    });
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
