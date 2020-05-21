$(document).ready(function(){
    var cuisine
    var cuisines = ["mexican", "chinese", "italian", "spanish", "american",
        "british", "japanese", "thai", "indian", "russian", "swedish", "latvian",
        "scottish", "jewish", "polish", "german", "french", "hawaiian", "brazillian",
        "peruvian", "salvadorian", "cuban", "tibetan", "egyptian", "greek", "belgian",
        "irish", "welsh", "mormon", "cajun", "portuguese", "turkish", "haitian", "tahitian",
        "kenyan", "korean", "algerian", "nigerian", "lyberian"]

    var recipe_id, recipe_name, recipe_sourceUrl
    var user_id

    
    
    $("#cuisine-btn").click(function(){
        
        console.log(user_id);
        $("#food-section-text-id").hide();
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
                recipe_id = results[i].id
                recipe_name = results[i].title
                recipe_sourceUrl = results[i].sourceUrl
                result += '<div class = "recipes-container animated fadeInUp delay-' + i + '">'
                result += '<li class = "recipe-content">'
                result += '<div class = "recipe-info">'
                result += '<div class = "recipe-name"> Name: <p class = "recipe-text">' + results[i].title + '</p></div>'
                result += '<div class = "recipe-time"> Ready In: <p class = "recipe-text">' + results[i].readyInMinutes +' min</p></div>'
                result += '<div class = "recipe-details"> URL: <p class = "recipe-text"><a href = "' +  results[i].sourceUrl + '" target="_blank" rel="noopener noreferrer">' + results[i].sourceUrl + '</a></p></div>'
                result += '</div>'
                result += '<div class = "recipe-img">'
                result += '<img src = "' + results[i].image + '" width = ' + ' "100" ' + 'height = ' + ' "100" ' + '>'
                result += '</div>'
                result += '</li>'
                result += '</div>'
            }
            console.log(recipe_id);
            console.log(recipe_name);
            console.log(recipe_sourceUrl);

            $('#details-of-recipies').append(result);
            // $('.list-of-recipies').css("box-shadow", "0 2px 4px -2px #000000");
        });

        
    })

    $('#recipe-btn').click(function(){
        user_id = $("#user_id").text();
        console.log("Hui" + user_id);
        $("#food-section-text-id").hide();
        var input = $('#search-recipe-input').val().toLowerCase();
        var req = {
            "async" : true,
            "crossDomain" : true,
            "method" : "GET",
            "url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=12&ingredients=" + input ,

            "headers": {
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                "x-rapidapi-key": "50177b6ce3msh1e4769e970d0466p16aa25jsnf49c35310b25"
            }
        }

        console.log(req.url);

        $.ajax(req).done(function (response) {
            console.log(response);
            var results = response
            var result = '';

            $('#details-of-searched-recipes').empty();

            for (var i = 0; i < results.length; i+=6){

                result += "<div class = 'recipes-container'>"
                result += "<div class = 'recipe-container-vertical animated fadeInUp delay-"+ (1 + i) +"' onclick = 'getDetailedRecipe("+results[i].id+","+ user_id+")'>"
                result += '<li class = "recipe-content vertical">'
                result += '<div class = "recipe-info recipe-info-vertical">'
                result += '<div class = "recipe-name"> Name: <p class = "recipe-text">' + results[i].title + '</p></div>'
                result += '<div class = "recipe-name"> Missing Ingredients: <p class = "recipe-text">' + results[i].missedIngredientCount + '</p></div>'
                result += '<div class = "recipe-name"> Own Ingredients: <p class = "recipe-text">' + results[i].usedIngredientCount + '</p></div>'
                result += '</div>'
                result += '<div class = "recipe-img-vertical">'
                result += '<img src = "' + results[i].image + '" width = ' + ' "150" ' + 'height = ' + ' "150" ' + '>'
                result += '</div>'
                result += '</li>'
                result += "</div>"

                result += "<div class = 'recipe-container-horizontal'>"
                result += "<div class = 'recipe-container-horizontal-top animated fadeInUp delay-"+ (2 + i) +"'onclick = 'getDetailedRecipe("+results[1+i].id+","+ user_id+")'>"
                result += '<li class = "recipe-content horizontal">'
                result += '<div class = "recipe-info">'
                result += '<div class = "recipe-name"> Name: <p class = "recipe-text">' + results[1+i].title + '</p></div>'
                result += '<div class = "recipe-name"> Missing Ingredients: <p class = "recipe-text">' + results[1+i].missedIngredientCount + '</p></div>'
                result += '<div class = "recipe-name"> Own Ingredients: <p class = "recipe-text">' + results[1+i].usedIngredientCount + '</p></div>'
                result += '</div>'
                result += '<div class = "recipe-img">'
                result += '<img src = "' + results[1+i].image + '" width = ' + ' "100" ' + 'height = ' + ' "100" ' + '>'
                result += '</div>'
                result += '</li>'
                result += "</div>"
                result += "<div class = 'recipe-container-horizontal-bottom animated fadeInUp delay-"+ (3 + i) +"' onclick = 'getDetailedRecipe("+results[2+i].id+","+ user_id+")'>"
                result += '<li class = "recipe-content horizontal">'
                result += '<div class = "recipe-info">'
                result += '<div class = "recipe-name"> Name: <p class = "recipe-text">' + results[2+i].title + '</p></div>'
                result += '<div class = "recipe-name"> Missing Ingredients: <p class = "recipe-text">' + results[2+i].missedIngredientCount + '</p></div>'
                result += '<div class = "recipe-name"> Used Ingredients: <p class = "recipe-text">' + results[2+i].usedIngredientCount + '</p></div>'
                result += '</div>'
                result += '<div class = "recipe-img">'
                result += '<img src = "' + results[2+i].image + '" width = ' + ' "100" ' + 'height = ' + ' "100" ' + '>'
                result += '</div>'
                result += '</li>'
                result += "</div>"
                result += "</div>"
                result += "</div>"
                result += "<div class = 'recipes-container'>"
                result += "<div class = 'recipe-container-horizontal'>"
                result += "<div class = 'recipe-container-horizontal-top animated fadeInUp delay-"+ (4 + i) +"' onclick = 'getDetailedRecipe("+results[3+i].id+","+ user_id+")'>"
                result += '<li class = "recipe-content horizontal">'
                result += '<div class = "recipe-info">'
                result += '<div class = "recipe-name"> Name: <p class = "recipe-text">' + results[3+i].title + '</p></div>'
                result += '<div class = "recipe-name"> Missing Ingredients: <p class = "recipe-text">' + results[3+i].missedIngredientCount + '</p></div>'
                result += '<div class = "recipe-name"> Own Ingredients: <p class = "recipe-text">' + results[3+i].usedIngredientCount + '</p></div>'
                result += '</div>'
                result += '<div class = "recipe-img">'
                result += '<img src = "' + results[3+i].image + '" width = ' + ' "100" ' + 'height = ' + ' "100" ' + '>'
                result += '</div>'
                result += '</li>'
                result += "</div>"
                result += "<div class = 'recipe-container-horizontal-bottom animated fadeInUp delay-"+ (5 + i) +"' onclick = 'getDetailedRecipe("+results[4+i].id+","+ user_id+")'>"
                result += '<li class = "recipe-content horizontal">'
                result += '<div class = "recipe-info">'
                result += '<div class = "recipe-name"> Name: <p class = "recipe-text">' + results[4+i].title + '</p></div>'
                result += '<div class = "recipe-name"> Missing Ingredients: <p class = "recipe-text">' + results[4+i].missedIngredientCount + '</p></div>'
                result += '<div class = "recipe-name"> Own Ingredients: <p class = "recipe-text">' + results[4+i].usedIngredientCount + '</p></div>'
                result += '</div>'
                result += '<div class = "recipe-img">'
                result += '<img src = "' + results[4+i].image + '" width = ' + ' "100" ' + 'height = ' + ' "100" ' + '>'
                result += '</div>'
                result += '</li>'
                result += "</div>"
                result += "</div>"
                result += "<div class = 'recipe-container-vertical animated fadeInUp delay-"+ (6 + i) +"' onclick = 'getDetailedRecipe("+results[5+i].id+","+ user_id+")'>"
                result += '<li class = "recipe-content vertical">'
                result += '<div class = "recipe-info recipe-info-vertical">'
                result += '<div class = "recipe-name"> Name: <p class = "recipe-text">' + results[5+i].title + '</p></div>'
                result += '<div class = "recipe-name"> Missing Ingredients: <p class = "recipe-text">' + results[5+i].missedIngredientCount + '</p></div>'
                result += '<div class = "recipe-name"> Own Ingredients: <p class = "recipe-text">' + results[5+i].usedIngredientCount + '</p></div>'
                result += '</div>'
                result += '<div class = "recipe-img-vertical">'
                result += '<img src = "' + results[5+i].image + '" width = ' + ' "150" ' + 'height = ' + ' "150" ' + '>'
                result += '</div>'
                result += '</li>'
                result += "</div>"
                result += "</div>"

            }

            console.log(result)
            $('#details-of-searched-recipes').append(result);
            // $('.list-of-recipies').css("box-shadow", "0 2px 4px -2px #000000");
        });

    })    
})

function getDetailedRecipe(id, user_id){
    var req = {
        "async": true,
        "crossDomain": true,
        "url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/"+ id +"/information",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "x-rapidapi-key": "50177b6ce3msh1e4769e970d0466p16aa25jsnf49c35310b25"
        }
    }

    $.ajax(req,user_id).done(function (response) {
        console.log(response);

        $("#recipe_user_id").val(user_id);

        $("#recipe_name").val(response.title);

        $("#recipe_sourceUrl").val(response.sourceUrl);

        console.log(user_id,response.title, response.sourceUrl)
    });

}