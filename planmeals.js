

$.getJSON("https://gist.githubusercontent.com/isakmd/f09c90e170f342745e94c6bccdef0895/raw/c52b2481931ac279da5ed7beb6f008882e4763d2/mealplans.json", function (result) {
    console.log(result)
    titlemeal = document.getElementById("title")
    titlemeal.innerHTML = result.Vegan.Breakfast[0]
})

window.onload = function () {

}
