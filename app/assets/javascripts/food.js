$(document).ready(function(){
    var cuisine
    var cuisines = ["mexican", "chinese", "italian", "spanish", "american",
        "british", "japanese", "thai", "indian", "russian", "swedish", "latvian",
        "scottish", "jewish", "polish", "german", "french", "hawaiian", "brazillian",
        "peruvian", "salvadorian", "cuban", "tibetan", "egyptian", "greek", "belgian",
        "irish", "welsh", "mormon", "cajun", "portuguese", "turkish", "haitian", "tahitian",
        "kenyan", "korean", "algerian", "nigerian", "lyberian"]

    
    $("#cuisine-btn").click(function(){
        
        if ($("#cuisine-input").val().toLowerCase() === ''){
            cuisine = '';
        }
        else{
            cuisine = $("#cuisine-input").val().toLowerCase() + ','; 
        }
        

        var dessert_checkbox = (($('#recipe-dessert-checkbox:checked').val() == "on") ? "dessert," : "");
        var vegetarian_checkbox = (($('#recipe-vegaterian-checkbox:checked').val() == "on") ? "vegetarian," : "");
        // var healthy_checkbox = (($('#recipe-healthy-checkbox:checked').val() == "on") ? "veryHealthy" : "");

        var req = {
            "async" : true,
            "crossDomain" : true,
            "method" : "GET",
            "url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=10&tags=" +
            vegetarian_checkbox + dessert_checkbox + cuisine,

            "headers": {
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                "x-rapidapi-key": "50177b6ce3msh1e4769e970d0466p16aa25jsnf49c35310b25"
            }
        }
        console.log(req.url);
        
        $.ajax(req).done(function (response) {
            console.log(response);
            var results = response.recipes
            var result = '';

            $('#details-of-recipies').empty();

            for (var i = 0; i < results.length; i++){
                console.log(i);
                result += '<li class = "recipe-content animated fadeInUp delay-' + i + '">'
                result += '<div class = "recipe-info">'
                result += '<div class = "recipe-name"> Name: <p class = "recipe-text">' + results[i].title + '</p></div>'
                result += '<div class = "recipe-time"> Ready In: <p class = "recipe-text">' + results[i].readyInMinutes +' min</p></div>'
                result += '<div class = "recipe-details"> URL: <p class = "recipe-text"><a href = "' +  results[i].sourceUrl + '" target="_blank" rel="noopener noreferrer">' + results[i].sourceUrl + '</a></p></div>'
                // result += '<div class = "recipe-name"> Name: <p class = "recipe-text">' + recipies[i].title + '</p></div>'
                result += '</div>'
                result += '<div class = "recipe-img">'
                result += '<img src = "' + results[i].image + '" width = ' + ' "100" ' + 'height = ' + ' "100" ' + '>'
                result += '</div>'
                result += '</li>'
            }

            $('#details-of-recipies').append(result);
            $('.list-of-recipies').css("box-shadow", "0 2px 4px -2px #000000");
        });

        
    })
    
})