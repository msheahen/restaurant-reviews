/**
Main javascript functions for Restaurant Reviews Project
Written by: Mary Sheahen
9/5/2016

**/


/* helper to print something every nth time*/
Handlebars.registerHelper("everyOther", function (index, amount, scope) {
    if ( ++index % amount )
        return scope.inverse(this);
    else
        return scope.fn(this);
});


/* printing the star ratings.
// TODO further improvement: Show partial stars
Current I am only rounding down to the nearest whole */
Handlebars.registerHelper("printStars", function(number){


  var rating = Math.floor(number);

  var starDom = "";
  for(var i = 0; i < rating; i++){
    starDom += "<span class='star-icon'>★</span>";
  }
  for(i = rating; i < 5; i++){
    starDom += "<span class='star-icon'>☆</span>";
  }
  return new Handlebars.SafeString(starDom);
});

/* Help me print my dollar signs*/
Handlebars.registerHelper("printDollarSigns", function(number){
  var dollarDom =" ";
  for(var i = 0; i < number; i++){
    dollarDom += "$";
  }
  return new Handlebars.SafeString(dollarDom);
});


/* Helper for formatting military time in am/pm*/
Handlebars.registerHelper("formatTime", function(str){
  var time = str.slice(0, -3);
  var suffix;

  if(time >= 13){
    time -= 12;
    suffix = "PM";
  }else{
    suffix = "AM";
  }

  return time + ":00 " + suffix;

});

/* get parameter by name to help fetch the right data */
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
