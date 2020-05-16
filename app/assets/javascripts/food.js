// $(document).ready(function(){

//     var cuisines = ["mexican", "chinese", "italian", "spanish", "american",
//         "british", "japanese", "thai", "indian", "russian", "swedish", "latvian",
//         "scottish", "jewish", "polish", "german", "french", "hawaiian", "brazillian",
//         "peruvian", "salvadorian", "cuban", "tibetan", "egyptian", "greek", "belgian",
//         "irish", "welsh", "mormon", "cajun", "portuguese", "turkish", "haitian", "tahitian",
//         "kenyan", "korean", "algerian", "nigerian", "lyberian"]

//     // var images = ['apple-alt', 'carrot', ]

//     $("#cuisine-btn").click(function(){
        
//         var cuisine = $("#cuisine-input").val().toLowerCase();

//         if(jQuery.inArray(cuisine, cuisines) !== -1){
//             console.log(cuisine);
//             var req = {
//                 "async" : true,
//                 "crossDomain" : true,
//                 "method" : "GET",
//                 "url": "https://webknox-recipes.p.rapidapi.com/recipes/search?type=main%20course&offset=0&number=10&cuisine="+ cuisine,
    
//                 "headers": {
//                     "x-rapidapi-host": "webknox-recipes.p.rapidapi.com",
//                     "x-rapidapi-key": "50177b6ce3msh1e4769e970d0466p16aa25jsnf49c35310b25"
//                 }
//             }
    
//             $.ajax(req).done(function (response) {
//                 console.log(response);
//                 recipies = response.results
//                 var result = '';

//                 $('#details-of-recipies').empty();
//                 for (var i = 0; i < recipies.length; i++){
//                     result += '<li class = "recipe-content">'
//                     result += '<div class = "recipe-info">'
//                     result += '<div class = "recipe-name"> Name: <p class = "recipe-text">' + recipies[i].title + '</p></div>'
//                     result += '<div class = "recipe-time"> Cooking-Time: <p class = "recipe-text">' + recipies[i].readyInMinutes +' min</p></div>'
//                     result += '<div class = "recipe-details"> URL: <p class = "recipe-text"><a href = "' +  recipies[i].sourceUrl + '">' + recipies[i].sourceUrl + '</a></p></div>'
//                     result += '</div>'
//                     result += '<div class = "recipe-img">'
//                     result += '<img src = "assets/' + i + '" width = ' + ' "100" ' + 'height = ' + ' "100" ' + '>'
//                     result += '</div>'
//                     result += '</li>'
//                 }

//                 $('#details-of-recipies').append(result);
//                 $('.list-of-recipies').css("box-shadow", "0 2px 4px -2px #000000");
//             });
//         }
//         else{
//             console.log("Cant find error");
//         }
        
//     })
    
// })