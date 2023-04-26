

$.getJSON("https://gist.githubusercontent.com/isakmd/f09c90e170f342745e94c6bccdef0895/raw/c52b2481931ac279da5ed7beb6f008882e4763d2/mealplans.json", function (result) {
    console.log(result)
    titlemeal = document.getElementsByClassName("card-title")
    calories = document.getElementsByClassName("card-calories")
    for (i = 0; i < 2; i++) {
        titlemeal[i].innerHTML = result.Vegan.Lunch[i].Meal
        calories[i].innerHTML = result.Vegan.Lunch[i].Nutrition.Calories + " Calories";

    }
})


